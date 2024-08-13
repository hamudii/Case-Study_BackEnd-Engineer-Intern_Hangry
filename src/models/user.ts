// src/models/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
    dateOfBirth: string; // Format: YYYY-MM-DD
}

export let users: User[] = []; // Data disimpan di memori lokal