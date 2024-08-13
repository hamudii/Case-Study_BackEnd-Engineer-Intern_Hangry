"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
let users = [];
function logRequest(req) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
}
function logResponse(req, statusCode) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url} - ${statusCode}`);
}
function validateUserData(user) {
    if (!user.name || typeof user.name !== 'string') {
        return "Invalid name";
    }
    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        return "Invalid email format";
    }
    if (!user.dateOfBirth || !/^\d{4}-\d{2}-\d{2}$/.test(user.dateOfBirth)) {
        return "Invalid date of birth format, expected YYYY-MM-DD";
    }
    return null;
}
function getPaginatedData(data, page, limit) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
}
function filterUsers(users, query) {
    let filteredUsers = users;
    if (query.has('name')) {
        const name = query.get('name');
        filteredUsers = filteredUsers.filter(user => user.name.includes(name));
    }
    if (query.has('email')) {
        const email = query.get('email');
        filteredUsers = filteredUsers.filter(user => user.email.includes(email));
    }
    return filteredUsers;
}
function getUsers(req, res) {
    var _a;
    logRequest(req);
    const query = new URLSearchParams((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[1]);
    let filteredUsers = filterUsers(users, query);
    const page = parseInt(query.get('page') || '1', 10);
    const limit = parseInt(query.get('limit') || '10', 10);
    const paginatedUsers = getPaginatedData(filteredUsers, page, limit);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(paginatedUsers));
    logResponse(req, 200);
}
function getUserById(req, res, id) {
    logRequest(req);
    const user = users.find(u => u.id === id);
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        logResponse(req, 404);
    }
    else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
        logResponse(req, 200);
    }
}
function createUser(req, res) {
    logRequest(req);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        const error = validateUserData(data);
        if (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error }));
            logResponse(req, 400);
        }
        else {
            const newUser = Object.assign({ id: users.length + 1 }, data);
            users.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
            logResponse(req, 201);
        }
    });
}
function updateUser(req, res, id) {
    logRequest(req);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        const user = users.find(u => u.id === id);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            logResponse(req, 404);
        }
        else {
            const error = validateUserData(Object.assign(Object.assign({}, user), data));
            if (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error }));
                logResponse(req, 400);
            }
            else {
                Object.assign(user, data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
                logResponse(req, 200);
            }
        }
    });
}
function deleteUser(req, res, id) {
    logRequest(req);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        logResponse(req, 404);
    }
    else {
        users.splice(userIndex, 1);
        res.writeHead(204);
        res.end();
        logResponse(req, 204);
    }
}
