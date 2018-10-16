const db = require("./db");

module.exports = async (req, res) => {
    try {
        const long_url = await db.get(req.params.short_url);
        res.status(302).redirect(long_url);
    } catch (e) {
        res.sendStatus(404);
    }
};
