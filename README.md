# BlogoSphere
Simple RESTful API's for blogging platform

## Database Setup
* Create database "blogosphere" or whaterver name you choose in Mysql
* Import blogosphere.sql file in the database that you created
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
### User API's
* #### Register a new user
```
  POST /api/user
```
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;firstName:\
&emsp;&emsp;lastName:\
&emsp;&emsp;email:\
&emsp;&emsp;userName:\
&emsp;&emsp;passkey:

* #### Login user
```
  POST /api/user/login
```
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;userName:\
&emsp;&emsp;email:(*optional)\
&emsp;&emsp;passkey:

* #### Get all users
```
  GET /api/user/
```

* #### Get single user by user name
```
  GET /api/user/:userName
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | user name of any user |

* #### Delete user by user name
```
  DELETE /api/user/:userName
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | user name of logged in user |

* #### Update user by user name
```
  PUT /api/user/:userName
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | user name of logged in user |





  
  

