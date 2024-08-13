// server.ts
import http from 'http';
import { handleRequest } from './router';

const PORT = 3000;

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
