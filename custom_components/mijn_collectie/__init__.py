"""Mijn Collectie — custom component voor HA."""
from __future__ import annotations

import json
import logging
import sqlite3
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any

from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

_LOGGER = logging.getLogger(__name__)

DOMAIN = "mijn_collectie"
DB_FILE = "mijn_collectie.db"


def get_db_path(hass: HomeAssistant) -> Path:
    return Path(hass.config.path(DB_FILE))


def init_db(db_path: Path) -> None:
    """Create tables if they don't exist yet."""
    con = sqlite3.connect(str(db_path))
    con.execute("""
        CREATE TABLE IF NOT EXISTS media (
            id           TEXT PRIMARY KEY,
            category     TEXT NOT NULL,
            title        TEXT NOT NULL,
            year         TEXT,
            barcode      TEXT,
            format       TEXT,
            box_location TEXT,
            genre        TEXT,
            creator      TEXT,
            publisher    TEXT,
            runtime      TEXT,
            cover_url    TEXT,
            description  TEXT,
            owned        INTEGER DEFAULT 1,
            added_date   TEXT,
            imdb_id      TEXT,
            watched      INTEGER DEFAULT 0,
            user_rating  REAL,
            lent_to      TEXT,
            lent_date    TEXT,
            owner        TEXT
        )
    """)
    # Migrate existing databases — add new columns if missing
    existing_cols = {row[1] for row in con.execute('PRAGMA table_info(media)').fetchall()}
    for col, typedef in [
        ('imdb_id', 'TEXT'), ('watched', 'INTEGER DEFAULT 0'),
        ('user_rating', 'REAL'), ('lent_to', 'TEXT'),
        ('lent_date', 'TEXT'), ('owner', 'TEXT'),
    ]:
        if col not in existing_cols:
            con.execute(f'ALTER TABLE media ADD COLUMN {col} {typedef}')
    con.commit()
    con.commit()
    con.close()


def row_to_dict(row: sqlite3.Row) -> dict:
    return dict(row)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Mijn Collectie component."""
    db_path = get_db_path(hass)

    # Initialise DB in executor (blocking I/O)
    await hass.async_add_executor_job(init_db, db_path)

    # Register HTTP views
    hass.http.register_view(MediaListView(db_path))
    hass.http.register_view(MediaDetailView(db_path))
    hass.http.register_view(MediaLocationsView(db_path))

    _LOGGER.info("Mijn Collectie gestart — database: %s", db_path)
    return True


# ---------------------------------------------------------------------------
# Helper — run a blocking DB call in the executor
# ---------------------------------------------------------------------------

def _db_query(db_path: Path, sql: str, params: tuple = ()) -> list[dict]:
    con = sqlite3.connect(str(db_path))
    con.row_factory = sqlite3.Row
    rows = con.execute(sql, params).fetchall()
    con.close()
    return [row_to_dict(r) for r in rows]


def _db_execute(db_path: Path, sql: str, params: tuple = ()) -> None:
    con = sqlite3.connect(str(db_path))
    con.execute(sql, params)
    con.commit()
    con.close()


def _db_fetchone(db_path: Path, sql: str, params: tuple = ()) -> dict | None:
    con = sqlite3.connect(str(db_path))
    con.row_factory = sqlite3.Row
    row = con.execute(sql, params).fetchone()
    con.close()
    return row_to_dict(row) if row else None


# ---------------------------------------------------------------------------
# Views
# ---------------------------------------------------------------------------

class MediaListView(HomeAssistantView):
    """GET /api/mijn_collectie/media — list / search
       POST /api/mijn_collectie/media — add item"""

    url = "/api/mijn_collectie/media"
    name = "api:mijn_collectie:media"
    requires_auth = True

    def __init__(self, db_path: Path) -> None:
        self._db = db_path

    async def get(self, request):
        """List media with optional filters."""
        params = request.rel_url.query
        q            = params.get("q")
        category     = params.get("category")
        box_location = params.get("box_location")
        genre        = params.get("genre")

        sql = "SELECT * FROM media WHERE 1=1"
        args: list[Any] = []

        if q:
            sql += " AND title LIKE ?"
            args.append(f"%{q}%")
        if category:
            sql += " AND LOWER(category) = LOWER(?)"
            args.append(category)
        if box_location:
            sql += " AND LOWER(box_location) LIKE LOWER(?)"
            args.append(f"%{box_location}%")
        if genre:
            sql += " AND LOWER(genre) LIKE LOWER(?)"
            args.append(f"%{genre}%")

        sql += " ORDER BY added_date DESC"

        items = await request.app["hass"].async_add_executor_job(
            _db_query, self._db, sql, tuple(args)
        )
        return self.json(items)

    async def post(self, request):
        """Add a new media item."""
        try:
            data = await request.json()
        except Exception:
            return self.json_message("Invalid JSON", status_code=400)

        if not data.get("title") or not data.get("category"):
            return self.json_message("title and category are required", status_code=400)

        item_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()

        item_id = data.get("id") or str(uuid.uuid4())
        await request.app["hass"].async_add_executor_job(
            _db_execute,
            self._db,
            """INSERT OR REPLACE INTO media
               (id, category, title, year, barcode, format, box_location,
                genre, creator, publisher, runtime, cover_url, description,
                owned, added_date, imdb_id, watched, user_rating,
                lent_to, lent_date, owner)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (
                item_id,
                data.get("category"),
                data.get("title"),
                data.get("year"),
                data.get("barcode"),
                data.get("format"),
                data.get("box_location"),
                data.get("genre"),
                data.get("creator"),
                data.get("publisher"),
                data.get("runtime"),
                data.get("cover_url"),
                data.get("description"),
                1 if data.get("owned", True) else 0,
                data.get("added_date") or now,
                data.get("imdb_id"),
                1 if data.get("watched") else 0,
                data.get("user_rating"),
                data.get("lent_to"),
                data.get("lent_date"),
                data.get("owner"),
            ),
        )

        item = await request.app["hass"].async_add_executor_job(
            _db_fetchone, self._db, "SELECT * FROM media WHERE id = ?", (item_id,)
        )
        return self.json(item, status_code=201)


class MediaDetailView(HomeAssistantView):
    """GET/PUT/DELETE /api/mijn_collectie/media/{item_id}"""

    url = "/api/mijn_collectie/media/{item_id}"
    name = "api:mijn_collectie:media_detail"
    requires_auth = True

    def __init__(self, db_path: Path) -> None:
        self._db = db_path

    async def get(self, request, item_id: str):
        item = await request.app["hass"].async_add_executor_job(
            _db_fetchone, self._db, "SELECT * FROM media WHERE id = ?", (item_id,)
        )
        if not item:
            return self.json_message("Not found", status_code=404)
        return self.json(item)

    async def put(self, request, item_id: str):
        """Update an existing item."""
        try:
            data = await request.json()
        except Exception:
            return self.json_message("Invalid JSON", status_code=400)

        item = await request.app["hass"].async_add_executor_job(
            _db_fetchone, self._db, "SELECT * FROM media WHERE id = ?", (item_id,)
        )
        if not item:
            return self.json_message("Not found", status_code=404)

        fields = ["category", "title", "year", "barcode", "format", "box_location",
                  "genre", "creator", "publisher", "runtime", "cover_url", "description",
                  "owned", "imdb_id", "watched", "user_rating", "lent_to", "lent_date", "owner"]
        updates = {f: data[f] for f in fields if f in data}

        if not updates:
            return self.json(item)

        set_clause = ", ".join(f"{k} = ?" for k in updates)
        values = list(updates.values()) + [item_id]

        await request.app["hass"].async_add_executor_job(
            _db_execute,
            self._db,
            f"UPDATE media SET {set_clause} WHERE id = ?",
            tuple(values),
        )

        updated = await request.app["hass"].async_add_executor_job(
            _db_fetchone, self._db, "SELECT * FROM media WHERE id = ?", (item_id,)
        )
        return self.json(updated)

    async def delete(self, request, item_id: str):
        """Delete an item."""
        item = await request.app["hass"].async_add_executor_job(
            _db_fetchone, self._db, "SELECT * FROM media WHERE id = ?", (item_id,)
        )
        if not item:
            return self.json_message("Not found", status_code=404)

        await request.app["hass"].async_add_executor_job(
            _db_execute, self._db, "DELETE FROM media WHERE id = ?", (item_id,)
        )
        return self.json_message("Deleted", status_code=200)


class MediaLocationsView(HomeAssistantView):
    """GET /api/mijn_collectie/locations — distinct box locations for autocomplete"""

    url = "/api/mijn_collectie/locations"
    name = "api:mijn_collectie:locations"
    requires_auth = True

    def __init__(self, db_path: Path) -> None:
        self._db = db_path

    async def get(self, request):
        rows = await request.app["hass"].async_add_executor_job(
            _db_query,
            self._db,
            "SELECT DISTINCT box_location FROM media WHERE box_location IS NOT NULL AND box_location != '' ORDER BY box_location",
            (),
        )
        return self.json([r["box_location"] for r in rows])