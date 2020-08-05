## Fancy Todo
    To Do Fancy API - a portofolio project for Hacktiv8 Phase 2.  This app has RESTful endpoint for User and Todo Operation Used Technology: 
        * Express Js
        * Sequelize
        * Postgres
        * Json Web Token
        * Bcrypt JSON Formated Response
    When you create a new Todo, you will be notice on your authorized email on this app. This feature using technology:
        * mailgun (limited recipients)

## RESTful endpoints
    * GET /todos
    * GET /todos/:id
    * POST /todos
    * PUT /todos/:id
    * DELETE /todos/:id
    * POST /login
    * POST /register
    * POST /googleSign

### Global Response

_Response (500)_
```
    {
        "message": "<internal server error>"
    }
```
---
### GET /todos

> Get all todos

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
  {
    "id": 1,
    "title": "<asset title>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<asset title>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }, ...
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /todos/:id

> Get all todos

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200- Ok)_
```
  {
    "id": 1,
    "title": "<asset title>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Todo not Found"
}
```
---
### POST /todos

> Create new todos

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  "titile": "<titile to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into">,
  "due_date": "<due_date to get insert into">,
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
---
### PUT /todos
> Edit Todo

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  "titile": "<titile to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into">,
  "due_date": "<due_date to get insert into">,
}
```
_Response (200 - Ok)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Bad Request)_
```
{
  "message": "title cannot be empty || description cannot be empty || status cannot be empty || Due_date cannot be empty"
}
```
_Response (404 - Not Found)_
```
  {
    "message": "<Todo Not Found>"
  }
```
---
### DELETE /todos/:id
> Delete Todo
_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
  {
    "<not needed>"
  }
```
_Response (200 - Ok)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - Not Found)_
```
  {
    "message": "<Todo Not Found>"
  }
```
---
### POST /login
> Login User
_Request Header_
```
  {
    "<not needed>"
  }
```
_Request Body_
```
  {
    "email": "<email to get insert into>"
    "password": "<password to get insert into>"
  }
```
_Response ( 200 - Ok )_
```
  {
    "access_token": "<access_token from JWT>"
  }
```
_Response ( 400 - Bad Request )_
```
  {
    "message": "<invalid email or password>"
  }
```
---
### POST /register
> Create new User
_Request Header_
```
  {
    "<not needed>"
  }
```
_Request Body_
```
  {
    "email": "<email to get insert into>"
    "password": "<password to get insert into>"
  }
```
_Response ( 201 - Created )_
```
  {
    "id": <given id by system>,
    "title": "<created title>",
    "description": "<created description>",
    "status": "<created status>",
    "due_date": "<created due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```
---

### POST /googleSign
> Sign in with Google, if not registered, then do register user aswell

_Request Header_
```
  <not needed>
```
_Request Body_
```
{
  "id_token" : "<id_token from google>" 
}
```
_Response (200)_
```
{
    "access_token": "<access_token JWT>"
}
```
_Response (404 - Not Found)_
```
{
    "message": "data not found"
}
```