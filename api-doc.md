
# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan

Todos App is an application to manage your best work will be do. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Technology Includes : 
    - 3rd Party API = FestDays
    - Authentication & Authorization
    - Express Js(Node Js Framework)
    - Object-relation-mapping : Sequelize
    - Database: Postgres
    - Token Signing/verification: Json Web Token
    - Password Encryption: Bcrypt

## RESTful endpoints
### POST /register
### POST /login
### POST /todos
### GET /todos
### GET /todos/:id
### PUT /todos/:id
### DELETE /todos/:id
### POST /holidays

Global endpoints

response(401 - Not Authenticated)
``` json 
{
    "message" : "Not Not Authenticated"
}
```
response(401 - Not Authorized)
``` json 
{
    "message" : "Not Not Authorized"
}
```

response(500 - Server Internal Error)
``` json 
{
    "message" : "Invalid Server"
}
```
### POST /register
> Register User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "role": "<role to get insert into>"
}
```

Response :

Success: 

status : 201
``` json
{
    "Account with ${email to get insert into} Created"
}

Failed :

status : 404
{
  "message": "Invalid Request"
}
```

### POST /login
> Login User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

Response :

Success: 

status : 200
``` json
{
    "acces_token" : "jwttoken"
}

Failed :

status : 404
{
  "message": "Invalid Request"
}
```

### POST /todos

> Create new todos

_Request Header_
``` json
{
  "access_token" : "jwttoken"
}

_Request Body_
``` json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>"
}
```

Response :

Success: 

status : 201
``` json

{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### GET /todos
> Get all todos

_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
``` json
{
  "message": "Invalid Request"
}
```
---
### GET /todos/:id

> Get a todo by id
_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```
_Request body_
```json
{
  "not needed" 
}

_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json

{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
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
  "Token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "id" : "<given id by selected>",
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>"
}
```

Response :

Success: 

status : 201
``` json
{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### DELETE /todos/:id

> Delete a todo by id
_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```
_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json
{
  "message": "Sukses Delete"
}

Failed :
status : 401
``` json 
{
    "message" : "Not Not Authorized"
}

status : 404
{
  "message": "Error Not Found"
}
```

### POST /holidays

> Delete a todo by id
_Request Header_
``` json
{
  "accept": "application/json"
}
```
_Request params_
```json
{
    "country": "ID",
    "size": "100",
    "format": "json",
    "pretty": ["true", "true"],
    "year": "2020",
    "key": "CALENDER_KEY_API"
}
```
_Request Body_
``` json
{
  "not_needed"
}


Response :

Success: 

status : 200
``` json
[
  {
    "name": "International Labor Day",
    "nameAlt": "Labor Day",
    "date": "2020-05-01",
    "day": 5,
    "month": 5,
    "year": 2020,
    "weekday": 5,
    "weekdayName": "Friday",
    "country": "ID",
    "countryName": "Indonesia",
    "types": [ ["Object"] ],
    "regions": [ ["Object"] ]
  },
  "..."

]

Failed :

status : 500
{
  "message": "Invalid Server"
}
```



