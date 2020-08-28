# Todos App Server
Listof available endpoints:

* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* PATCH /todos/:id/status
* DELETE /todos/:id
* POST /register
* POST /login
* POST /googleLogin
* POST /recipe

&nbsp;

## RESTful endpoints

### POST /todos

> create new todos

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

* data
```
{
  "title": "string",
  "description": "string",
  "due_date": "date"
}
```

_Response (201)_
```
{
    "title": "Cooking wafer",
    "description": "Search on google recipe how to cook wafer",
    "status": false,
    "due_date": "2020-08-10"
}
```

_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

_Response (400 - validation errors)_
```
{
    "message": [
        "Please input title for your todo list!",
        "Please input description for your todo list!",
        "Please input due date for your todo list!"
    ]
}
```
---
### GET /todos

> Get all todos

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

_Response (200 - ok)_
```
[
    {
        "id": 2,
        "title": "Cooking tahu",
        "description": "Recipe how to cook tahu",
        "status": false,
        "due_date": "2020-08-10T00:00:00.000Z",
        "createdAt": "2020-08-03T14:13:59.988Z",
        "updatedAt": "2020-08-03T14:13:59.988Z"
    },
    {
        "id": 3,
        "title": "Cooking taart",
        "description": "Search on google recipe how to cook taart",
        "status": false,
        "due_date": "2020-08-06T00:00:00.000Z",
        "createdAt": "2020-08-03T15:04:26.953Z",
        "updatedAt": "2020-08-03T15:04:26.953Z"
    },
    ...
]
```

_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

---
### GET /todos/:id

> Get todo by id

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

* data:
```
{
    "id":"<id>"
}
```

_Response (200 - ok)_
```
{
    "id": 2,
    "title": "Cooking tahu",
    "description": "Recipe how to cook tahu",
    "status": false,
    "due_date": "2020-08-10T00:00:00.000Z",
    "createdAt": "2020-08-03T14:13:59.988Z",
    "updatedAt": "2020-08-03T14:13:59.988Z"
}
```

_Response (404 - not found)_
```
{
    "message": "Data Not Found"
}
```
_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```
---
### PUT /todos/:id

> Update todo by id

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

* data
```
{
  "title": "string",
  "description": "string",
  "status": "boolean",
  "due_date": "date"
}
```

_Response (200 - ok)_
```
{
    "id": 4,
    "title": "Making tempe",
    "description": "making  sushi tempe ",
    "status": false,
    "due_date": "2020-08-06T00:00:00.000Z",
    "createdAt": "2020-08-03T15:04:51.233Z",
    "updatedAt": "2020-08-03T16:19:07.076Z"
}
```

_Response (404 - not found)_
```
{
    "message": "Data Not Found"
}
```
_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

---
### PATCH /todos/:id/status

> Update todo status by id

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

* data
```
{
  "status": "boolean"
}
```

_Response (200 - ok)_
```
{
    "id": 25,
    "title": "Watching boku no hero",
    "description": "watch in web",
    "status": true,
    "due_date": "2020-08-20T00:00:00.000Z",
    "UserId": 9,
    "createdAt": "2020-08-11T16:49:04.978Z",
    "updatedAt": "2020-08-11T16:50:00.251Z"
}
```

_Response (404 - not found)_
```
{
    "message": "Data Not Found"
}
```
_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```


---

### DELETE /todos/:id

> Delete todo by id

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

* data
```
{
    "id":"<id>"
}
```

_Response (200 - ok)_
```
{
    "id": 6,
    "title": "Cooking taart",
    "description": "Search on google recipe how to cook tahu",
    "status": false,
    "due_date": "2020-08-06T00:00:00.000Z",
    "createdAt": "2020-08-03T15:07:02.404Z",
    "updatedAt": "2020-08-03T15:07:02.404Z"
}
```

_Response (404 - not found)_
```
{
    "message": "Data Not Found"
}
```
_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

---
### POST /register

> register new user

_Request_

* data
```
{
  "email": "email",
  "password": "string"
}
```

_Response (201)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiZ3VhcmFzdUBnbWFpbC5jb20iLCJpYXQiOjE1OTcxNjM2MzJ9.HJGiBF8djr5X2k82GXibQ8B1VQrOQ3SHmtYE_dpEAUY"
}
```

_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

_Response (400 - validation errors)_
```
{
    "message": "Please input password for register!"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Your email is already used. Please login or sign up with a new email"
}
```

---
### POST /login

> login user

_Request_

* data
```
{
  "email": "email",
  "password": "string"
}
```

_Response (201)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiZ3VhcmFzdUBnbWFpbC5jb20iLCJpYXQiOjE1OTcxNjM2MzJ9.HJGiBF8djr5X2k82GXibQ8B1VQrOQ3SHmtYE_dpEAUY"
}
```

_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Incorrect email or password"
}
```

---
### POST /googleLogin

> login user using Google

_Request_

* data
```
{
  "google_token": "string"
}
```

_Response (201 / 200)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiZ3VhcmFzdUBnbWFpbC5jb20iLCJpYXQiOjE1OTcxNjM2MzJ9.HJGiBF8djr5X2k82GXibQ8B1VQrOQ3SHmtYE_dpEAUY"
}
```

_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```

### POST /recipe

> see recipe lists

_Request_

* headers
```
{
  accesstoken : <accesstoken from login>
}
```

* data
```
{
  "recipeRequested":"string"
}
```

_Response (201)_
```
[
    {
        "title": "Tim and Tracy's Chocolate Cake (Boiled)",
        "href": "http://www.recipezaar.com/Tim-and-Tracys-Chocolate-Cake-Boiled-259680",
        "ingredients": "baking soda, butter, cocoa powder, eggs, flour, sugar, water",
        "thumbnail": "http://img.recipepuppy.com/34464.jpg"
    },
    ...
}
```

_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```
