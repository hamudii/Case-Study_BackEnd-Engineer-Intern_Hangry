// router.ts
import { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controller';
import { rateLimiter } from "./rateLimiter";

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
    if (rateLimiter(req, res)) return;
    
    const urlParts = req.url?.split('/');
    const id = urlParts && urlParts[2] ? parseInt(urlParts[2], 10) : null;

    if (req.method === 'GET' && req.url?.startsWith('/users')) {
        if (id) {
            getUserById(req, res, id);
        } else {
            getUsers(req, res);
        }
    } else if (req.method === 'POST' && req.url === '/users') {
        createUser(req, res);
    } else if (req.method === 'PUT' && id && req.url?.startsWith('/users')) {
        updateUser(req, res, id);
    } else if (req.method === 'DELETE' && id && req.url?.startsWith('/users')) {
        deleteUser(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
}
