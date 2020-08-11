# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

## Endpoints
### GET `/`
##### Mendapatkan detail user yang logged in

#### Request Headers
> { <br />
    "access_token": "your access token" <br />
> } <br />

#### Response (200)
> {<br />
    "id": 1,<br />
    "title": "<todo title>",<br />
    "description": "<todo description>",<br />
    "status": "<todo status>",<br />
    "dueDate": "<todo dueDate>",<br />
    "createdAt": "2020-03-20T07:15:12.149Z",<br />
    "updatedAt": "2020-03-20T07:15:12.149Z"<br />
 > }


/*
Method      | URL                   | Description
:---:       | :---:                 | ---
**GET**     | `/`                   | Mendapatkan detail user yang logged in
**GET**     | `/user/todo`          | Mendapatakan todo user tersimpan dalam database
**POST**    | `/register`           | Register, key: <br /> - email <br /> - username (3) <br /> - password
**POST**    | `/login`              | Login, key: <br /> - email <br /> - username (3) <br /> - password
**POST**    | `/google-login`       | Fitur khusus untuk OAuth Google
**POST**    | `/send`               | Gunakan body form-encoded. Required key adalah sebagai berikut: <br /> - Kasih_ID dengan key User ID yang datanya ingin di ambil <br /> - from dengan key pengirim email <br /> - to dengan key penerima email
**GET**     | `/todos`              | Mendapatakan seluruh data todos di dalam database
**POST**    | `/todos`              | Jika sudah login, dapat menambahkan todo dengan key: <br /> - title (required) <br /> - description <br /> - status (boolean) <br /> - dueDate (yyyy/mm/dd, harus melewati tanggal server)
**GET**     | `/todos/:id`          | Detail dari todo tertuju
**PUT**     | `/todos/:id/`         | Edit, key: <br /> - title (required) <br /> - description <br /> - status (boolean) <br /> - dueDate (yyyy/mm/dd, harus melewati tanggal server)
**DELETE**  | `/todos/:id/`         | Delete todo tertuju
*/
