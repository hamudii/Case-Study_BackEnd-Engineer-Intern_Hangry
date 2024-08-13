import { IncomingMessage, ServerResponse } from "http";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 100; // max requests
const TIME_WINDOW = 60 * 1000; // 1 minute

export function rateLimiter(req: IncomingMessage, res: ServerResponse): boolean {
    const ip = req.socket.remoteAddress || "";
    const currentTime = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, timestamp: currentTime });
        return false;
    }

    const rateData = rateLimitMap.get(ip)!;
    if (currentTime - rateData.timestamp > TIME_WINDOW) {
        rateLimitMap.set(ip, { count: 1, timestamp: currentTime });
        return false;
    }

    rateData.count++;
    if (rateData.count > RATE_LIMIT) {
        res.writeHead(429, { "Content-Type": "text/plain" });
        res.end("Too Many Requests");
        return true;
    }

    return false;
}
