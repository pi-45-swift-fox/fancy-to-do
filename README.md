# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

Todos App is an application to manage your best work will be do. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /todos
### GET /todos
### GET /todos/:id
### PUT /todos/:id
### DELETE /todos/:id

### POST /todos

> Create new todos

_Request Header_
``` json
{
  "msg" : "Berhasil Menambahkan Data",
  "Token" : "jwttoken"
}

_Request Body_
``` json
{
  "title": "Learn REST API",
  "description": "Learn how to create REStful API with Express and Sequelize",
  "status": "false"
},{
  "title": "Learn Authentication",
  "description": "Learn how to authentification on app",
  "status": "false"
}
```

Response :

Success: 

status : 201
``` json
[
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "Learn how to create REStful API with Express and Sequelize",
    "status": "false",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  },
  {
    "id": 2,
    "title": "Learn Authentication",
    "description": "Learn how to authentification on app",
    "status": "false",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  }
]

Failed :

status : 500 
{
  "message": "Invalid Server"
}
```
### GET /todos
> Get all todos

_Request Header_
``` json
{
  "msg" : "Berhasil Menampilkan Data",
  "Token" : "jwttoken"
}
```

_Request Body_
```
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
[
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "Learn how to create REStful API with Express and Sequelize",
    "status": "false",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  },
  {
    "id": 2,
    "title": "Learn Authentication",
    "description": "Learn how to authentification on app",
    "status": "false",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  }
]

Failed :

status : 500 
``` json
{
  "message": "Invalid Server"
}
```
---
### GET /todos/:id

> Get a todo by id
_Request Header_
``` json
{
  "msg" : "Berhasil Mendapatkan Data",
  "Token" : "jwttoken"
}

_Request Body_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 201
``` json

  {
    "id": 2,
    "title": "Learn Authentication",
    "description": "Learn how to authentification on app",
    "status": "false",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  }


Failed :

status : 404
{
  "message": "Error Not Found"
}
```

### PUT /todos/:id

> Update or replace a todo by id


_Request Header_
``` json
{
  "msg" : "Berhasil Mengupdate Data",
  "Token" : "jwttoken"
}

_Request Body_
``` json
{
  "id" : "+req.params.id",
  "title": "Learn Authentication",
  "description": "Learn how to authentification on app",
  "status": "false"
}
```

Response :

Success: 

status : 201
``` json
[
  {
    "id": 2,
    "title": "Learn Authentication",
    "description": "Learn how to authentification on app",
    "status": "false",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  }
]

Failed :

status : 500 
{
  "message": "Invalid Server"
}
```
### DELETE /todos/:id

> Delete a todo by id
_Request Header_
``` json
{
  "msg" : "Berhasil Menghapus Data",
  "Token" : "jwttoken"
}

_Request Body_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 201
``` json
{
  "message": "Sukses Delete"
}

Failed :

status : 404
{
  "message": "Error Not Found"
}
```



