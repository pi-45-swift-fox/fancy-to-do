# fancy-to-do
Membuat App tentang hal - hal keren yang bisa dilakukan


## RESTful endpoints
List of available endpoint:

  - `POST /todos`
  - `GET /todos`
  - `GET /todos/:id`
  - `PUT /todos/:id`
  - `DELETE /todos/:id`


### POST /todos

_Request Body_
```json
  {
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date
  }

```

_Response (201 - Created)_
```json
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
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
```
[
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
  },
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
  },
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
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
```
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
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
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date
  }

```

_Response (200 - OK)_
```json
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
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

_Request Body_
```json
  {
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date
  }

```

_Response (200 - OK)_
```json
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": boolean,
    "Due_date": date,
    "createdAt": date,
    "updatedAt": date
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
