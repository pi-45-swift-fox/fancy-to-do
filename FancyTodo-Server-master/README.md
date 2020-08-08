# Fancy TodoApp Server

  to Run this App:
  - npm install
  - sequelize db:create
  - sequelize db:migrate
  - fill .env file
  - nodemon app.js

  Deploy Here:

[Fancy-TodoApp_Server](http://localhost:3000)

  using the 3rd API:
  - [weatherstack](https://weatherstack.com/documentation)
  - [mailgun](https://documentation.mailgun.com/en/latest/)

## API Documentation

----
  **Login User**
----
  login to TodoApp

* **URL**
  /user/login

* **Method:**
  `POST`

* **Request Headers**
  None

* **URL Params**
  None

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <user_email> | true |
  | password | <user_password> | true |

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```

* **Error Response:**
    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "invalid username/password" }
        ```
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

----
  **Register User**
----
  register new User and send message to email address

* **URL**
  /user/register

* **Method:**
  `POST`

* **Request Headers**
  None

* **URL Params**
  None

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <user_email> | true |
  | password | <user_password> | true |
  | firstname | <user_firstname> | true |
  | lastname | <user_lastname> | true |
  | birthOfDate | <user_birthOfDate> | true |

* **Success Response:**

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```

* **Error Response:**
    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "invalid username/password" }
        ```
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

----
  **Signin or Register User with Google**
----
  SignIn with google email or if user not exist automatically register and send message to email address

* **URL**
  /user/login/google

* **Method:**
  `POST`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <GOOGLE_TOKEN> | true |

* **URL Params**
  None

* **Data Params**
  None

* **Success Response:**
  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```
    OR

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```

* **Error Response:**
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

----
  **Read All Tasks**
----
  see all the user's tasks

* **URL**
  /task

* **Method:**
  `GET`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**
  None

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    [
      {
          "id": 1,
          "title": "task kesatu",
          "description": "contoh description",
          "due_date": "2020-12-12T00:00:00.000Z",
          "UserId": 1,
          "createdAt": "2020-07-10T18:11:14.054Z",
          "updatedAt": "2020-07-10T18:11:14.054Z"
      },
      {
          "id": 2,
          "title": "task kedua",
          "description": "contoh description",
          "due_date": "2020-12-12T00:00:00.000Z",
          "UserId": 1,
          "createdAt": "2020-07-10T18:11:14.054Z",
          "updatedAt": "2020-07-10T18:11:14.054Z"
      }
    ]
    ```

* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Read one task**
----
  see one the user's task

* **URL**
  /task/:id

* **Method:**
  `GET`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <TASK_ID> | true |

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    [
      {
          "id": 1,
          "title": "task kesatu",
          "description": "contoh description",
          "due_date": "2020-12-12T00:00:00.000Z",
          "UserId": 1,
          "createdAt": "2020-07-10T18:11:14.054Z",
          "updatedAt": "2020-07-10T18:11:14.054Z"
      }
    ]
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```
  
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "Not Authorized to Access this" }
        ```

    * **Code:** 404 NotFound <br />
        **Content:** 
        ```json
        { "error" : "Task not Found" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Add a Task**
----
  Create a new task

* **URL**
  /task/add

* **Method:**
  `POST`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**
  None

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | <TASK_TITLE> | true |
  | description | <TASK_DESCRIPTION> | true |
  | due_date | <TASK_DUEDATE> | true |

* **Success Response:**

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
      "title": "task kedua user1",
      "description": "contoh description",
      "due_date": "2020-12-12",
      "UserId": 1
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "title cannot be empty" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Edit a Task**
----
  Edit a user's task

* **URL**
  /task/edit/:id

* **Method:**
  `PUT`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <TASK_ID> | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | <TASK_TITLE> | true |
  | description | <TASK_DESCRIPTION> | true |
  | due_date | <TASK_DUEDATE> | true |

* **Success Response:**

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
      "title": "ganti task pertama",
      "description": "ganti yah",
      "due_date": "2020-12-12"
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "Not Authorized to Access this" }
        ```

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "title cannot be empty" }
        ``` 
    
    * **Code:** 404 NotFound <br />
        **Content:** 
        ```json
        { "error" : "Task not Found" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Delete a Task**
----
  Delete a user's Task

  * **URL**
  /task/delete/:id

* **Method:**
  `DELETE`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <TASK_ID> | true |

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
      "title": "task kesatu",
      "description": "contoh description"
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "Not Authorized to Access this" }
        ```

    * **Code:** 404 NotFound <br />
        **Content:** 
        ```json
        { "error" : "Task not Found" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **GET a weather data**
----
  Delete a user's Task

  * **URL**
  /weather

* **Method:**
  `GET`

* **Request Headers**
  None

* **URL Params**
  None

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
      "request": {
          "type": "IP",
          "query": "110.138.151.97",
          "language": "en",
          "unit": "m"
      },
      "location": {
          "name": "Bulanbulan",
          "country": "Indonesia",
          "region": "West Java",
          "lat": "-6.236",
          "lon": "106.993",
          "timezone_id": "Asia/Jakarta",
          "localtime": "2020-07-11 00:54",
          "localtime_epoch": 1594428840,
          "utc_offset": "7.0"
      },
      "current": {
          "observation_time": "05:54 PM",
          "temperature": 27,
          "weather_code": 143,
          "weather_icons": [
              "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png"
          ],
          "weather_descriptions": [
              "Haze"
          ],
          "wind_speed": 4,
          "wind_degree": 300,
          "wind_dir": "WNW",
          "pressure": 1011,
          "precip": 0,
          "humidity": 84,
          "cloudcover": 50,
          "feelslike": 29,
          "uv_index": 1,
          "visibility": 4,
          "is_day": "no"
      }
    }
    ```
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
