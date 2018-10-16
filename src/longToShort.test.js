const { registerSuite } = intern.getPlugin("interface.object"),
    { assert } = require("chai"),
    sinon = require("sinon"),
    { mockReq, mockRes } = require("sinon-express-mock"),
    db = require("./db"),
    longToShort = require("./longToShort");

registerSuite("longToShort", {
    tests: {
        "should create a short URL": async () => {
            const req = mockReq({
                body: {
                    url: `http://example.com?q=${Math.random()}`
                }
            });
            const res = mockRes();
            await longToShort(req, res);
            assert.equal(res.json.called, true);
            assert.equal(res.sendStatus.called, false);
        },
        "should return the same short URL if it already exists": async () => {
            const req = mockReq({
                body: {
                    url: `http://example.com?q=${Math.random()}`
                }
            });
            const res = mockRes();
            const res2 = mockRes();
            await longToShort(req, res);
            await longToShort(req, res2);
            assert.equal(res.body, res2.body);
        },
        "should respond with a 400 on invalid input": async () => {
            const req = mockReq({
                body: {
                    url: "dsafsgfsda"
                }
            });
            const res = mockRes();
            await longToShort(req, res);
            assert.equal(res.json.called, false);
            assert.equal(res.sendStatus.calledWith(400), true);
        }
    }
});
