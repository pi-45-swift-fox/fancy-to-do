# POST /todos

## Request Header
```
    {
        "Content-Type" : "application/json"
    }
```

## Request Body
```
    {
        "title" : "Learn REST API",
        "description" : "Learn how to create RESTful with Express and Sequelize",
        "due_date" : "2020-01-29"
    }
```

## Response
```
    {
        "id" : 1,
        "title" : "Learn REST API"
        "description" : "Learn how to create RESTful with Express and Sequelize",
        "due_date" : "2020-01-29"
    }
```