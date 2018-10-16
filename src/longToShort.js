module.exports = async (req, res) => {
    req.send(req.body.url);
};
