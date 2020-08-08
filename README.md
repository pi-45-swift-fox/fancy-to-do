# fancy-todo

**User Registration**
----

* **URL**

  /register

* **Method:**

  `POST`
  
*  **Request Params**

   No needed

* **Request Body**

    **Required:**
    `{ 
        email: eleven@gmail.com,
        password: kejubasah2
    }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    `{
        "id": 6,
        "email": "eigth@mail.com",
        "password": "$2a$10$4T9ecRhPygGT5ry1TruBRunMd/BGf1NWh6cHZBA7HU88JdX68sF9i"
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 

   `{ 
       "error": "Email can't be empty". 
    }`

    OR

    `{ 
       "error": "Password can't be empty". 
    }`

    OR

    `{
       "error": Invalid email format. 
    }`

    OR

    `{
       "error": "Email already registered." 
    }`
    
    OR
    
    `{ 
       "error": "Password must be 6 character or longer." 
    }`

  * **Code:** 500 <br />
    **Content:** 
    
    `{ "error" : "Internal Server Error" }`

**User Login**
----

* **URL**

  /login

* **Method:**

  `POST`
  
*  **Request Params**

   No needed

* **Request Body**

  **Required:**
    
    `{
       email: Ten@gmail.com
       password: kejubasah1
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    `{
       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUZW5AZ21haWwuY29tIiwiaWF0IjoxNTk2NjA2MzkxfQ.fisSZSEmkx8Y56NdT9lJNnwxkZ6p6Qtdqb9w5iN_CYQ"
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    
    `{
       "error": "Invalid email/password."
    }`

  * **Code:** 500 <br />
    **Content:** 
    
    `{ "error" : "Internal Server Error."}`

**Create Todo**
----

* **URL**

  /todos

* **Method:**
  
  `POST`
  
*  **Request Headers**

   **Required:**
 
   `access_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUZW5AZ21haWwuY29tIiwiaWF0IjoxNTk2NjA2MzkxfQ.fisSZSEmkx8Y56NdT9lJNnwxkZ6p6Qtdqb9w5iN_CYQ`

*  **Request Body**

   **Required:**

   `{
       title: Fingering or scaling
       description: daily exercise
       due_date: 2020-08-07
    }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    
    `{
      "id": 10,
      "title": "Fingering or scaling",
      "description": "daily exercise",
      "status": "undone",
      "due_date": "2020-07-07",
      "UserId": 2,
      "updatedAt": "2020-08-05T05:52:54.320Z",
      "createdAt": "2020-08-05T05:52:54.320Z"
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    
    `{
       "error": "Title must be filled out."
    }`

    OR

    `{
       "error": "Description Title must be filled out."
    }`

    OR

    `{
       "error": "Due date must be atleast now.
    }`

     OR

    `{
       "error": "Wrong date format."
    }`

  * **Code:** 500 <br />
    **Content:** 
    
    `{ "error" : "Internal Server Error" }`


**Show All Todo**
----

* **URL**

  /todos

* **Method:**
  
  `GET`
  
*  **Request Headers**

   **Required:**
 
   `access_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUZW5AZ21haWwuY29tIiwiaWF0IjoxNTk2NjA2MzkxfQ.fisSZSEmkx8Y56NdT9lJNnwxkZ6p6Qtdqb9w5iN_CYQ`

*  **Request Body**

   No needed

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    `[
        {
          "id": 13,
          "title": "Fingering",
          "description": "Guitar daily exercise",
          status": "undone",
          "due_date": "2020-08-06",
          "UserId": 2,
          "createdAt": "2020-08-05T07:36:41.253Z",
          "updatedAt": "2020-08-05T07:36:41.253Z"
        },
        {
          "id": 14,
          "title": "Bench press",
          "description": "Daily exercise ",
          "status": "undone",
          "due_date": "2020-08-06",
          "UserId": 2,
          "createdAt": "2020-08-05T07:52:45.218Z",
          "updatedAt": "2020-08-05T07:52:45.218Z"
        }
    ]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    
    `{ error : "Internal Server Error" }`


**Find One**
----

* **URL**

  /todos/:id

* **Method:**
  
  `GET`
  
*  **Request Headers**

   **Required:**
 
   `access_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUZW5AZ21haWwuY29tIiwiaWF0IjoxNTk2NjA2MzkxfQ.fisSZSEmkx8Y56NdT9lJNnwxkZ6p6Qtdqb9w5iN_CYQ`

*  **URL Params**

   **Required:**
 
   `id= 13`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    `{
        id": 13,
        "title": "Fingering",
        "description": "Guitar daily exercise",
        "status": "undone",
        "due_date": "2020-08-06",
        "UserId": 2,
        "createdAt": "2020-08-05T07:36:41.253Z",
        "updatedAt": "2020-08-05T07:36:41.253Z"
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
 
    `{
       "error": "Todo not found"
    }`


**Update Todo**
----

* **URL**

  /todos/:id

* **Method:**
  
  `PUT`
  
*  **Request Headers**

   **Required:**
 
   `access_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUZW5AZ21haWwuY29tIiwiaWF0IjoxNTk2NjE1NzY2fQ.Q-av0VUg3HBlB44ZFQc2AnA49WoCA_MvFX6yE2PcbVA`

*  **URL Params**

   **Required:**
 
   `id = 13`

*  **Request Body**

   **Required:**

   `{
       title: "Fingering"
       description: "Guitar daily exercise"
       status: "done"
       due_date: 2020-08-07
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    `{
        id": 13,
        "title": "Fingering",
        "description": "Guitar daily exercise",
        "status": "udone",
        "due_date": "2020-08-06",
        "UserId": 2,
        "createdAt": "2020-08-05T07:36:41.253Z",
        "updatedAt": "2020-08-05T07:36:41.253Z"
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    
    `{
      "error": "Todo not found"
    }`

  * **Code:** 500 <br />
    **Content:** 
    
    `{ "error" : "Internal Server Error" }`



**Delete Todo**
----

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`
  
*  **Request Headers**

   **Required:**
 
   `access_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUZW5AZ21haWwuY29tIiwiaWF0IjoxNTk2NjE1NzY2fQ.Q-av0VUg3HBlB44ZFQc2AnA49WoCA_MvFX6yE2PcbVA`

*  **URL Params**

   **Required:**
 
   `id = 13`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    `[
      {
        "id": 14,
        "title": "Bench press",
        "description": "Daily exercise ",
        "status": "undone",
        "due_date": "2020-08-06",
        "UserId": 2,
        "createdAt": "2020-08-05T07:52:45.218Z",
        "updatedAt": "2020-08-05T07:52:45.218Z"
      }
    ]`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    
    `{
      "error": "Todo not found"
    }`

    OR

  * **Code:** 500 <br />
    **Content:** 
    
    `{ error : "Internal Server Error" }`
