// Some sort of high-performance NoSQL database (Redis, couchDB) would be ideal;
// but SQLite is easy super easy to set up and doesn't need another server
// It is relatively simple to change the database by modifying the get() and set() methods

const sqlite = require("sqlite");
const dbPromise = sqlite.open("./database.sqlite", { Promise });
// Could make this into a class

dbPromise.then(async (db) => {
    await db.run("CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY, long_url TEXT NOT NULL);");
    await db.run("CREATE UNIQUE INDEX IF NOT EXISTS idx_long_url ON urls (long_url);");
});

module.exports = {
    get: async (id) => {
        const db = await dbPromise;
        const { long_url } = await db.get("SELECT long_url FROM urls WHERE id = ?", id);
        return long_url;
    },

    set: async (long_url) => {
        const db = await dbPromise;
        let result;
        try {
            const { lastID } = await db.run(`INSERT INTO urls(long_url) VALUES(?)`, [long_url]);
            result = lastID;
        } catch (e) {
            if (e.code === "SQLITE_CONSTRAINT") {
                // Already exists, query for it
                const { id } = await db.get("SELECT id FROM urls WHERE long_url = ?", long_url);
                result = id;
            }
        }
        return result;
    }
};
