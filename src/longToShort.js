const db = require("./db");

module.exports = async (req, res) => {
    const long_url = req.body.url;

    // TODO Don't hardcode the char limit here, DB constraint is better or put it in a config file
    if (!long_url || !long_url.startsWith("http") || long_url.length > 2000) {
        res.sendStatus(400);
        return;
    }

    const short_url = await db.set(long_url);

    const result = `${req.protocol}://${req.get("host")}/${short_url}`;
    if (req.is("application/json")) {
        res.json({ result });
    } else {
        res.send(`Short URL: <a href=${result} target="_blank">${result}</a>`);
    }
};
