const { registerSuite } = intern.getPlugin("interface.object"),
    { assert } = require("chai"),
    sinon = require("sinon"),
    { mockReq, mockRes } = require("sinon-express-mock"),
    db = require("./db"),
    shortToLong = require("./shortToLong");

registerSuite("shortToLong", {
    tests: {
        "should redirect to long url": async () => {
            const long_url = `http://example.com?q=${Math.random()}`;
            let short_url = await db.set(long_url);
            const req = mockReq({ params: { short_url } });
            const res = mockRes();
            await shortToLong(req, res);
            assert.equal(res.redirect.calledWith(long_url), true);
            assert.equal(res.status.calledWith(302), true);
        },

        "should respond with a 404 if short url doesn't exist": async () => {
            const req = mockReq({
                params: {
                    short_url: "thisdoesntexist"
                }
            });
            const res = mockRes();
            await shortToLong(req, res);
            assert.equal(res.redirect.called, false);
            assert.equal(res.sendStatus.calledWith(404), true);
        }
    }
});
