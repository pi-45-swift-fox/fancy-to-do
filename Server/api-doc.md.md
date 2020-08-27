# baby-factory-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`

And routes below need authentication
- `POST /todos`
- `GET /todos`
- `DELETE /todos/:id`
- `PUT /todos/:id`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "1",
  "email": "abu@hot.id"
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "id": "1",
  "email" : "abu@hot.id",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhYnVAaG90LmlkIiwiaWF0IjoxNTk4NTE5MDU4fQ.HSJSGdxDfmcLLrkL814L1AqtyK0cxV2ydRIcYSw0EKY"
}
```

### POST /todos
Request:

- headers: access_token

- data:

```json
{
  "title" : "string",
  "description" : "string",
  "status" : "boolean",
  "due_date" : "string",
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "title" : "Makan",
  "description" : "Ayam",
  "status" : "false",
  "due_date" : "12 jan 2021",
  "userId" : "1",
  "message" : "Todo list has been created"
}
```

### GET /todos

Description: Get all current logged in user todos

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
[
  {
      "title" : "string",
      "description" : "string",
      "status" : "boolean",
      "due_date" : "string",
      "userId" : "integer",
      "createdAt": "2020-04-17T05:45:10.669Z",
      "updatedAt": "2020-04-17T05:45:10.669Z"
  },
]
```

### GET /todos/:id

Description: Get Todos by params

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
[
  {
      "id" : "4",
      "title" : "Makan",
      "description" : "Ayam",
      "status" : "false",
      "due_date" : "20 jan 2021",
      "userId" : "1",
      "createdAt": "2020-04-17T05:45:10.669Z",
      "updatedAt": "2020-04-17T05:45:10.669Z"
  },
]
```

### DELETE /todos/:id

description: 
  Delete one of the current logged in user todos. (cannot delete another user todos use authorization)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "Data": {
        "id": 4,
        "title": "MAKAN",
        "description": "ayam",
        "status": false,
        "due_date": "20 jan 2012",
        "userId": 1,
        "createdAt": "2020-08-27T09:10:08.573Z",
        "updatedAt": "2020-08-27T09:10:08.573Z"
    },
    "Message": "Todo list with 4 is deleted"
}
```
