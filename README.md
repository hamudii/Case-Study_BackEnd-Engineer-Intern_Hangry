## RESTful API untuk Manajemen Data Pengguna
Proyek ini adalah implementasi RESTful API untuk mengelola data pengguna menggunakan Node.js. API ini mencakup fitur-fitur CRUD dasar serta beberapa fitur tambahan untuk meningkatkan fungsionalitas dan efisiensi.

# Objectives:

a. Create a RESTful API (CRUD) to manage user data using node.js (typescript for
bonus point)

b. User data includes: id, name, email and date of birth

# Rules

a. You are allowed to use local memory data instead of database ( sql / no-sql )

b. You are not allowed to use any API frameworks such as: express, hapi.js, etc

# Submission

a. Store the project into a Git repository (i.e: GitHub) and submit the link
*make sure the link can be accessed by public

b. Deadline: 2 days

## Fitur
# CRUD API

# 1. GET /users
Deskripsi: Mendapatkan daftar semua pengguna.
Request: GET http://localhost:3000/users
Response:
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-01"
  },
  ...
]

# 2. GET /users/

Deskripsi: Mendapatkan data pengguna berdasarkan ID.
Request: GET http://localhost:3000/users/1
Response:
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "dateOfBirth": "1990-01-01"
}

# 3. POST /users

Deskripsi: Menambahkan pengguna baru.
Request: POST http://localhost:3000/users
Content-Type: application/json
Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "dateOfBirth": "1992-02-02"
}
Response:
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "dateOfBirth": "1992-02-02"
}

# 4. PUT /users/

Deskripsi: Memperbarui data pengguna berdasarkan ID.
Request: PUT http://localhost:3000/users/1
Content-Type: application/json
Body:
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "dateOfBirth": "1990-01-01"
}
Response:
{
  "id": 1,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "dateOfBirth": "1990-01-01"
}

# 5. DELETE /users/

Deskripsi: Menghapus pengguna berdasarkan ID.
Request: DELETE http://localhost:3000/users/1
Response:
204 No Content jika berhasil menghapus pengguna.


## Fitur Tambahan

# 1. Logging
Deskripsi: Setiap permintaan (request) dan respon (response) akan dicatat (logged) dengan timestamp. Logging ini akan ditampilkan di terminal tempat Anda menjalankan server.

# 2. Pagination

Deskripsi: Anda dapat membatasi jumlah hasil yang dikembalikan dan menavigasi melalui data dengan query page dan limit.
Contoh Penggunaan: GET http://localhost:3000/users?page=1&limit=5 (Mengembalikan halaman pertama dengan 5 pengguna per halaman)


# 3. Filtering

Deskripsi: Anda dapat memfilter hasil berdasarkan name dan email.
Contoh Penggunaan: GET http://localhost:3000/users?name=Jane&email=jane@example.com (Mengembalikan semua pengguna yang nama dan emailnya sesuai dengan query yang diberikan.)

# 4. Rate Limiting

Deskripsi: Membatasi jumlah permintaan (request) yang dapat dilakukan oleh klien dalam periode waktu tertentu. Ini mencegah klien melakukan terlalu banyak permintaan dalam waktu singkat, yang bisa membantu mencegah serangan DDoS.
Implementasi:
Tetapkan batas jumlah permintaan per menit per IP.
Jika jumlah permintaan melebihi batas yang ditetapkan, kirimkan respons dengan status kode 429 Too Many Requests.


## Jalankan server: node src/index
