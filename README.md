# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

# Guide

Method | URL | Description
--- | --- | ---
**GET** |`/`| Mendapatkan detail user yang logged in
**GET** | `/users` | Mendapatakan detail semua users dalam database
**POST** | `/register` |  Register, Key: - email, - username (3), - password
**POST** | `/login` | Login, Key: - email, - username (3), - password
**POST** | `/send` | Gunakan body form-encoded. Required Key adalah sebagai berikut: <br /> - Kasih_ID dengan key User ID yang datanya ingin di ambil, <br /> - from dengan key pengirim email, <br /> - to dengan key penerima email
**GET** | `/todos` | Mendapatakan seluruh data todos di dalam database 
**POST** | `/todos` | Menambah todo sesuai 
**GET** | `/:id` |  