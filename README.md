# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

# Guide

Method      | URL                   | Description
:---:       | :---:                 | ---
**GET**     |`/`                    | Mendapatkan detail user yang logged in
**GET**     | `/users`              | Mendapatakan detail semua users dalam database
**POST**    | `/register`           | Register, key: <br /> - email <br /> - username (3) <br /> - password
**POST**    | `/login`              | Login, key: <br /> - email <br /> - username (3) <br /> - password
**POST**    | `/send`               | Gunakan body form-encoded. Required key adalah sebagai berikut: <br /> - Kasih_ID dengan key User ID yang datanya ingin di ambil <br /> - from dengan key pengirim email <br /> - to dengan key penerima email
**GET**     | `/todos`              | Mendapatakan seluruh data todos di dalam database 
**POST**    | `/todos`              | Jika sudah login, dapat menambahkan todo dengan key: <br /> - title (required) <br /> - description <br /> - status (boolean) <br /> - dueDate (yyyy/mm/dd, harus melewati tanggal server)
**GET**     | `/todos/:id`          | Detail dari todo tertuju
**PUT**     | `/todos/:id/edit`     | Edit, key: <br /> - title (required) <br /> - description <br /> - status (boolean) <br /> - dueDate (yyyy/mm/dd, harus melewati tanggal server)
**DELETE**  | `/todos/:id/delete`   | Delete todo tertuju