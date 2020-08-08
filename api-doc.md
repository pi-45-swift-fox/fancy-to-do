Todo App
Todo App is an application that has purpose to create and manage User's schedule. This app has :

RESTful endpoint for Invitation CRUD operation
RESTful endpoint for User Login & Register Operation
JSON formatted response
Technology includes:
Authentication
Authorization
Express Js (Node JS Framework),
Object-relation Mapping: Sequelize,
Database: Postgres,
Token Signing/Verification: Json Web Token,
Password Encryption: Bcrypt
 

RESTful endpoints
POST /login
POST /register
POST /todos
GET /todos
GET /todos/:id
DELETE /todos/:id
PUT/todos/:id
Global Endpoints
Response (401 - User not authenticated)

{
  "message": "User not authenticated"
}
Response (500 - Server internal error)

{
  "message": "Server internal error"
}
GET /todos/
Get todo list of authorized User only

Request Header

{
  "access_token": "<access_token>"
}
Request Body

not needed
Response (200)

  {
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description":<title to get insert into>
    "due_date": "<date to get insert into>",
    "status": "<status to get insert into>",
    "UserId": "<get by UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    
  }
Response (400 - Bad Request)

{
  "message": "Invalid request"
}
GET /todos/:id
Get todo by Id of authorized User only

Request Header

{
  "access_token": "<access_token>"
  "id":"<todo.id>"
}
Request Body

not needed
Response (200)

  {
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description":<title to get insert into>
    "due_date": "<date to get insert into>",
    "status": "<status to get insert into>",
    "UserId": "<get by UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    
  }
Response (400 - Bad Request)

{
  "message": "Invalid request"
}
POST /todos
Create todos

Request Header

{
  "access_token": "<MyToken>"
}
Request Body

{
  "title": "<title to get insert into>",
  "description":<description to get insert into>
  "due_date": "<date to get insert into>",
  "status": "<status to get insert into>"
  "UserId": "<UserId to get insert into>"
}
Response (201 - Created)

{
  "id": "<given id by system>",
  "title": "<title to get insert into>",
  "due_date": "<due_date to get insert into>",
  "description": "<description to get insert into>",
  "UserId": "<get by UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  
}
Response (400 - Bad Request)

{
  "message": "value is required"
}
DELETE /invitations/:id
Delete invitation

Request Header

{
  "access_token": "<MyToken>"
}
Request Body

not needed
Request Params

{
   "headers": "<headers>" 
  "id": "<integer>"
}
Response (200)

{
  "id": "<given id by system>",
  "title": "<title to get insert into>",
  "due_date": "<due_date to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>"
  "UserId": "<get by UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (403 - Bad Request)

{
  "message": "Forbidden Access"
}
Response (404 - Not Found)

{
  "message": "data not found"
}
PUT /todos/:id
PUT todo by Id of authorized User only

Request Header

{
  "access_token": "<access_token>"
  "id":"<todo.id>"
}
Request Body
{
    "title": "<title to get insert into>",
  "description":<description to get insert into>
  "due_date": "<date to get insert into>",
  "status": "<status to get insert into>"
  "UserId": "<UserId to get insert into>"
}

not needed
Response (200)

  {
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "description":<title to get insert into>
    "due_date": "<date to get insert into>",
    "status": "<status to get insert into>",
    "UserId": "<get by UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    
  }
Response (400 - Bad Request)

{
  "message": "Invalid request"
}
POST /login
Login User

Request Header

not needed
Request Body

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
Response (200)

{
  "access_token": "<MyToken>"
}
Response (404 - Not Found)

{
  "message": "data not found"
}
POST /register
Register User

Request Header

not needed
Request Body

{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
Response (201)

{
  "id": "<given id by system>",
  "email": "<email to get insert into>",
  "password": "<password Encrypted>",
  "updatedAt": "2020-07-06T13:01:52.682Z",
  "createdAt": "2020-07-06T13:01:52.682Z"
}
Response (404 - Not Found)

{
  "message": "data not found"
}
POST /googleSignin
Login User with Aouth Google

Request Header

not needed
Request Body

{
  "id_token" : "<token from google>" 
}
Response (201)

{
  "access_token": "<MyToken>"
}
Response (404 - Not Found)

{
  "message": "data not found"
}
