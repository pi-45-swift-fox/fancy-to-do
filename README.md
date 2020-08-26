# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

# Guide
## Endpoints
### GET `/`
##### Mendapatkan todo user yang logged in

#### Request Headers
>
    "access_token": "your access token"
> 

#### Request Body
>
    _Tidak diperlukan_
>

#### Response (200)
>
    "id": "Todo serialized ID",
    "title": "Todo title",
    "description": "Todo description",
    "status": "Task status",
    "UserId": "User (Owner) ID",
    "dueDate": "Todo's date of due",
    "createdAt": "Date Sequelize",
    "updatedAt": "Date Sequelize"
 >
 
 #### Response (409)
 >
  "error": "Tidak ada token terkirim/terdaftar"
 >

### POST `/login`
##### Mendapatkan akses (token) user dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "email": "Input email user",
    "password": "Input password user"
>

#### Response (200)
>
    "username": "Username yang teregister dalam database",
    "token": "Token User untuk access ke server"
 >
 
 #### Response (401)
 >
  "msg": "Email/password salah"
 >

### POST `/register`
##### Mendaftarkan data user ke dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "username": "Input username User",
    "email": "Input email User",
    "password": "Input password User"
>

#### Response (200)
>
    "msg": "OK"
 >
 
#### Response (400)
>
 "msg": "Terjadi kesalahan input"
>
 
#### Response (409)
>
 "msg": "Email sudah terdaftar"
>

### POST `/google-login`
##### Mendapatkan akses (token) user dalam database melalui google

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "username": "Input username User",
    "email": "Input email User",
    "password": "Input password User"
>

#### Response (200)
>
    "username": "Username yang teregister dalam database",
    "token": "Token User untuk access ke server"
>

### POST `/todos`
##### Menambahkan todos baru ke database sesuai user yang logged in

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "title": "Todo title",
    "description": "Todo description",
    "status": "Todo status",
    "dueDate": "Todo's date of due"
>

#### Response (201)
>
    "id": "Todo serialized ID",
    "title": "Todo title (new)",
    "description": "Todo description (new)",
    "status": "Todo status (new)",
    "UserId": "User (Owner) ID",
    "dueDate": "Todo's date of due",
    "createdAt": "Current Date",
    "updatedAt": "Current Date"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (409)
>
    "msg": "Tidak ada token terkirim/terdaftar"
>

### PUT `/todos/id`
##### Mengedit todo di database sesuai user yang logged in

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "title": "Todo title",
    "description": "Todo description",
    "status": "Todo status".
    "dueDate": "Todo's date of due"
>

#### Response (201)
>
    "msg": "OK"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (404)
>
    "msg": "Todo yang dicari tidak ditemukan"
>

#### Response (409)
>
    "msg": "Tidak ada token terkirim/terdaftar"
>

### DELETE `/todos/id`
##### Menghapus todo di database sesuai user yang logged in

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    _Tidak Perlu_
>

#### Response (200)
>
    "msg": "OK"
>

#### Response (404)
>
    "msg": "Todo yang dicari tidak ditemukan"
>

#### Response (409)
>
    "msg": "Tidak ada token terkirim/terdaftar"
>
