"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = handleRequest;
const controller_1 = require("./controller");
const rateLimiter_1 = require("./rateLimiter");
function handleRequest(req, res) {
    var _a, _b, _c, _d;
    if ((0, rateLimiter_1.rateLimiter)(req, res))
        return;
    const urlParts = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/');
    const id = urlParts && urlParts[2] ? parseInt(urlParts[2], 10) : null;
    if (req.method === 'GET' && ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith('/users'))) {
        if (id) {
            (0, controller_1.getUserById)(req, res, id);
        }
        else {
            (0, controller_1.getUsers)(req, res);
        }
    }
    else if (req.method === 'POST' && req.url === '/users') {
        (0, controller_1.createUser)(req, res);
    }
    else if (req.method === 'PUT' && id && ((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith('/users'))) {
        (0, controller_1.updateUser)(req, res, id);
    }
    else if (req.method === 'DELETE' && id && ((_d = req.url) === null || _d === void 0 ? void 0 : _d.startsWith('/users'))) {
        (0, controller_1.deleteUser)(req, res, id);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
}
