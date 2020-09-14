# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan


## RESTful endpoints
List of available endpoint:

  - `POST /todos`
  - `GET /todos`
  - `GET /todos/:id`
  - `PUT /todos/:id`
  - `DELETE /todos/:id`
  - `POST /register`
  - `POST /login`


### POST /todos

_Request Body_
```json
  {
    "title": "string",
    "description": "string",
    "status": "string",
    "due_date": "date",
    "UsersId": "integer"
  }

```

_Response (201 - Created)_
```json
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "string",
    "due_date": "date",
    "UsersId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "Title is empty"
  },
  {
    "message": "Description is empty"
  },
  {
    "message": "You dont choose the status"
  },
  {
    "message": "You don't pick a Due Date"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### GET /todos

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "title": "makan",
    "description": "makan ayam",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 1
  },
  {
    "id": 2,
    "title": "minum",
    "description": "minum air",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 2
  },
  {
    "id": 3,
    "title": "makan",
    "description": "makan sosis",
    "status": "belum",
    "Due_date": 2020-12,
    "UsersId": 1
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /todos/:id

_Response (200 - OK)_
```json
  {
    "id": 1,
    "title": "makan",
    "description": "makan ayam",
    "status": "belum",
    "Due_date": 2020-12-12,
    "UsersId": 1
  }
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /todos/:id

_Request Body_
```json
  {
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UsersId": 1
  }

```

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UsersId": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "Title is empty"
  },
  {
    "message": "Description is empty"
  },
  {
    "message": "You dont choose the status"
  },
  {
    "message": "You don't pick a Due Date"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### DELETE /todos/:id

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "belum",
    "Due_date": "date",
    "UsersId": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### POST /register

_Request Body_
```json
  {
    "email": "string",
    "password": "string"
  }

```

_Response (201 - Created)_
```json
  {
    "id": "integer",
    "email": "string",
    "password": "string"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "You don't put any password"
  },
  {
    "message": "You don't put any email"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
