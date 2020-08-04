# fancy todo server

List of available endpoints :
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `DELETE /todos:id`

## POST / todos

Request :
- data :
```json
{
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01",
}
```

Response :
- status : 201
- body :
```json
{
    "id": 1,
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01T17:00:00.000Z",
    "updatedAt": "2020-08-04T17:11:53.911Z",
    "createdAt": "2020-08-04T17:11:53.911Z"
}
```
- status : 400
- body :
```json
    {err.massage}
```

## GET / todos

Request :
- data : no need

Response :
- status : 200
- body :
```json
[
    {
    "id": 1,
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01T17:00:00.000Z",
    "updatedAt": "2020-08-04T17:11:53.911Z",
    "createdAt": "2020-08-04T17:11:53.911Z"
    },
    {
    "id": 2,
    "title": "Menanam Tanaman",
    "description": "Berangkat Pagi",
    "status": "belum",
    "due_date": "2020-01-01T17:00:00.000Z",
    "updatedAt": "2020-08-04T17:11:53.911Z",
    "createdAt": "2020-08-04T17:11:53.911Z"
}
]

```
- status : 500
- body :
```json
    {err.massage}
```

## GET / todos/:id

Request :
- data : id

Response :
- status : 200
- body :
```json

{
    "id": 1,
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01T17:00:00.000Z",
    "updatedAt": "2020-08-04T17:11:53.911Z",
    "createdAt": "2020-08-04T17:11:53.911Z"
}

```
- status : 404
- body :
```json
    {err.massage}
```

## PUT / todos/:id

Request :
- data : 
```json
{
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01"

}


Response :
- status : 200
- body :
```json
{
    "id": 1,
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01T17:00:00.000Z",
    "updatedAt": "2020-08-04T17:11:53.911Z",
    "createdAt": "2020-08-04T17:11:53.911Z"
}

```
- status : 404
- body :
```json
    {err.massage}
```

## DELETE / todos/:id

Request :
- data : id

Response :
- status : 200
- body :
```json

{
    "id": 1,
    "title": "Siram Tanaman",
    "description": "wajib disiram sebelum pukul 10 pagi dan 5 sore",
    "status": "belum",
    "due_date": "2020-01-01T17:00:00.000Z",
    "updatedAt": "2020-08-04T17:11:53.911Z",
    "createdAt": "2020-08-04T17:11:53.911Z"
}

```
- status : 404
- body :
```json
    {err.massage}