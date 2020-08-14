# API DOCUMENTATION

## **USER**

### POST /register

#### request
- body
```
{
  "email":"abdullah@mail.com,
  "password":"12345"
}
```
#### response 201


- json
```
{
  "msg":" anda berhasil register"
}
```
#### response 500
- json
```

{
  "msg":"internal server error"
}
```
### POST /login

#### request

- body  

```
{
  "email":"abdullah@mail.com,
  "password":"12345"
}
```
#### response 200
- json
```
{
  "msg":" anda berhasil login",
  access_token: token
}
```
#### response 400

```json
{
  "msg":"email or password incorrect"
}
```
#### response 500
- json
```json

{
  "msg":"internal server error"
}
```

## TODOS CRUD

### GET /todos (read todos)
#### request
> get all todos data
#### response 200
- json
```json
{
  "id":"1",
  "title":"Tugas Pagi",
  "description":"menyapu rumah",
  "UserId":"1",
  "status":"complete",
  "due_date":"
}

```

#### response 500
- json
```json

{
  "msg":"internal server error"
}
```

### POST /todos (create todos)
#### request
- body
```json
{
  "id":"2",
  "title":"Tugas Pagi",
  "description":"menyapu rumah",
  "UserId":"1",
  "status":"complete",
  "due_date":"
}
```
#### response 201
```json
{
    "msg":"berhasil create todo"
}
```

#### response 500
- json
```json

{
  "msg":"internal server error"
}
```
### GET /todos/:id (read one todos)
#### request
- params
```json
{
    "id":"1"
}
```
#### response 200
```json
{
  "id":"2",
  "title":"Tugas Pagi",
  "description":"menyapu rumah",
  "UserId":"1",
  "status":"complete",
  "due_date":"
}
```

#### response 500
- json
```json

{
  "msg":"internal server error"
}
```


### DELETE /todos/:id (delete todos)
#### request
- params
```json
{
    "id":"1"
}
```
#### response 200
- json
```json
{
    "msg":"berhasil delete todo"
}
```

#### response 500
- json
```json

{
  "msg":"internal server error"
}
```

### PUT /todos (update todos)
#### request
- params
```json
{
    "id":"1"
}
```

#### response 200
- json
```json
{
    "msg":"berhasil update todo"
}
```


#### response 500
- json
```json

{
  "msg":"internal server error"
}
```