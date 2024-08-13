// controller.ts
import { IncomingMessage, ServerResponse } from 'http';



interface User {
    id: number;
    name: string;
    email: string;
    dateOfBirth: string;
}

let users: User[] = [];

function logRequest(req: IncomingMessage) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
}

function logResponse(req: IncomingMessage, statusCode: number) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url} - ${statusCode}`);
}

function validateUserData(user: Partial<User>): string | null {
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

function getPaginatedData(data: User[], page: number, limit: number): User[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
}

function filterUsers(users: User[], query: URLSearchParams): User[] {
    let filteredUsers = users;

    if (query.has('name')) {
        const name = query.get('name');
        filteredUsers = filteredUsers.filter(user => user.name.includes(name!));
    }
    if (query.has('email')) {
        const email = query.get('email');
        filteredUsers = filteredUsers.filter(user => user.email.includes(email!));
    }

    return filteredUsers;
}

export function getUsers(req: IncomingMessage, res: ServerResponse) {
    logRequest(req);
    const query = new URLSearchParams(req.url?.split('?')[1]);
    let filteredUsers = filterUsers(users, query);
    const page = parseInt(query.get('page') || '1', 10);
    const limit = parseInt(query.get('limit') || '10', 10);

    const paginatedUsers = getPaginatedData(filteredUsers, page, limit);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(paginatedUsers));
    logResponse(req, 200);
}

export function getUserById(req: IncomingMessage, res: ServerResponse, id: number) {
    logRequest(req);
    const user = users.find(u => u.id === id);

    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        logResponse(req, 404);
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
        logResponse(req, 200);
    }
}

export function createUser(req: IncomingMessage, res: ServerResponse) {
    logRequest(req);
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data: Partial<User> = JSON.parse(body);
        const error = validateUserData(data);

        if (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error }));
            logResponse(req, 400);
        } else {
            const newUser: User = {
                id: users.length + 1,
                ...data,
            } as User;

            users.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
            logResponse(req, 201);
        }
    });
}

export function updateUser(req: IncomingMessage, res: ServerResponse, id: number) {
    logRequest(req);
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data: Partial<User> = JSON.parse(body);
        const user = users.find(u => u.id === id);

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            logResponse(req, 404);
        } else {
            const error = validateUserData({ ...user, ...data });

            if (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error }));
                logResponse(req, 400);
            } else {
                Object.assign(user, data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
                logResponse(req, 200);
            }
        }
    });
}

export function deleteUser(req: IncomingMessage, res: ServerResponse, id: number) {
    logRequest(req);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        logResponse(req, 404);
    } else {
        users.splice(userIndex, 1);
        res.writeHead(204);
        res.end();
        logResponse(req, 204);
    }
}
