# Todos App Server
Listof available endpoints:
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* DELETE /todos/:id

&nbsp;

## RESTful endpoints
### POST /todos

> create new todos

_Request_

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
  "message": "validation errors"
}
```
---
### GET /todos

> Get all todos

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

Request:
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
    "message": "error not found"
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

Request:
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
    "message": "error not found"
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

Request:
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
    "message": "error not found"
}
```
_Response (500 - internal errors)_
```
{
  "message": "internal errors"
}
```