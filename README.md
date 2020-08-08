# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

--ENDPOINTS--
## POST /register
## POST /login
## GET /todos
## POST /todos
## GET /todos/:id
## PUT /todos/:id
## DELETE /todos/:id
=====================
## POST /register
register new User

-Request Header
not needed

-Request Body
{
    "name": STRING,
    "email": STRING(unique),
    "password": STRING(minimum of 6 characters)
}

-Response(201)
{
    "id": 12,
    "name": "ivan jonathan",
    "email": "ivan@swift-fox.net",
    "password": "$2a$10$wtrB.5M7ICI0Nq1V/r3dCeKRZ62Eil/m7yZLHUEesCT2pKuppFV8u",
    "updatedAt": "2020-08-08T06:31:10.368Z",
    "createdAt": "2020-08-08T06:31:10.368Z"
}

-Response (409)
{
    message: "email already used"
}

-Response (400 - Bad Request)
{
    message: VALIDATION ERROR MESSAGE
}

## POST /login
login as User

-Request Header
not needed

-Request Body
{
    "email": STRING,
    "password": STRING
}

-Response(200)
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiaXZhbkBzd2lmdC1mb3gubmV0IiwiaWF0IjoxNTk2ODY4MzgxfQ.LfLz_vnFCep4d_QJcTVqvPCnhXiAxyhTPUvlT1Qe_K0"
}

-Response(403)
{
    message: "incorrect email or password"
}

-Response (400 - Bad Request)
{
    message: VALIDATION ERROR MESSAGE
}

## GET /todos
get all todos

-Request Header
not needed

-Request Body
not needed

-Response (200)
[
    {
        "id": 1,
        "title": "tugas kemarin",
        "description": "harus selesaikan tugas kemarin sebelum session 2",
        "status": false,
        "due_date": "2020-08-03T00:00:00.000Z",
        "createdAt": "2020-08-04T04:17:28.374Z",
        "updatedAt": "2020-08-04T13:56:44.698Z"
    },
    {
        "id": 5,
        "title": "tugas hari ini",
        "description": "harus selesaikan tugas hari ini sebelum pagi",
        "status": false,
        "due_date": "2020-08-04T17:00:00.000Z",
        "createdAt": "2020-08-04T15:04:07.779Z",
        "updatedAt": "2020-08-04T15:04:07.779Z"
    }
]

## POST /todos
create new todos

-Request Header
not needed

-Request Body
{
    "title": STRING,
    "description": STRING,
    "status": BOOLEAN,
    "due_date": DATE
}

-Response(201)
{
    "id": 1,
    "title": "tugas kemarin",
    "description": "harus selesaikan tugas kemarin sebelum session 2",
    "status": false,
    "due_date": "2020-08-03T00:00:00.000Z",
    "createdAt": "2020-08-04T04:17:28.374Z",
    "updatedAt": "2020-08-04T13:56:44.698Z"
}

-Response (400 - Bad Request)
{
    message: VALIDATION ERROR MESSAGE
}

## GET /todos/:id
get specific todos by id

-Request Header
not needed

-Request Body
not needed

-Response(200)
{
    "id": 1,
    "title": "tugas kemarin",
    "description": "harus selesaikan tugas kemarin sebelum session 2",
    "status": false,
    "due_date": "2020-08-03T00:00:00.000Z",
    "createdAt": "2020-08-04T04:17:28.374Z",
    "updatedAt": "2020-08-04T13:56:44.698Z"
}

-Response(404)
{
    message: "error not found"
}

## PUT /todos/:id
update specific todos by id

-Request Header
not needed

-Request Body
not needed

-Response(200)
{
    "id": 1,
    "title": "tugas kemarin",
    "description": "harus selesaikan tugas kemarin sebelum session 2",
    "status": false,
    "due_date": "2020-08-03T00:00:00.000Z",
    "createdAt": "2020-08-04T04:17:28.374Z",
    "updatedAt": "2020-08-04T13:56:44.698Z"
}

-Response (400 - Bad Request)
{
    message: VALIDATION ERROR MESSAGE
}

-Response(404)
{
    message: "error not found"
}

## DELETE /todos/:id
delete specific todos by id

-Request Header
not needed

-Request Body
not needed

-Response(200)
{
    "id": 1,
    "title": "tugas kemarin",
    "description": "harus selesaikan tugas kemarin sebelum session 2",
    "status": false,
    "due_date": "2020-08-03T00:00:00.000Z",
    "createdAt": "2020-08-04T04:17:28.374Z",
    "updatedAt": "2020-08-04T13:56:44.698Z"
}

-Response(404)
{
    message: "error not found"
}
