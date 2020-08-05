GET /todos
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

POST /todos
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

GET /todos/:id
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

PUT /todos/:id
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

DELETE /todos/:id
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
