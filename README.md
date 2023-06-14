# BlogoSphere
Simple RESTful API's for blogging platform

## Database Setup
* Create database "blogosphere" or whaterver name you choose in Mysql
* Import blogosphere.sql file in database that you created
* Start your Mysql server or XAMPP

## Run Locally

Clone the project

```bash
  git clone https://github.com/Pushkraj-Space/blogosphere.git
```

Go to the project directory

```bash
  cd blogosphere
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## API Reference

To use all below mentioned API's in postman, 
import "BlogoSphere.postman_collection.json" file.

Base URL = http://localhost:8081 
#### Register new user

```http://localhost:8081
  POST /api/user
```

| Description                |
 | :------------------------- |
 | Create new user account |

#### Login user

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



  
  

