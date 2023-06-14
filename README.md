# BlogoSphere
Simple RESTful API's for blogging platform

## Database Setup
* Create database "blogosphere" or whaterver name you want, in Mysql
* Import "blogosphere.sql" file in the database that you created
* Start your Mysql server

## Run Locally

Clone the project

```bash
  git clone https://github.com/Pushkraj-Space/blogosphere.git
```

Go to the project directory

```
  cd blogosphere
```

Install dependencies

```
  npm install
```
***Important*** : Set up environment variables(.env) file as per your machine set up

Start the server

```
  npm start
```


## API Reference

To use all below mentioned API's in postman, 
import "BlogoSphere.postman_collection.json" file as a new collection

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
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;firstName:\
&emsp;&emsp;lastName:\
&emsp;&emsp;email:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | user name of logged in user |

### Blog API's

* #### Create new blog
```
  POST /api/blog/
```
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;blog_title:\
&emsp;&emsp;blog_content:

* #### Update blog
```
  PUT /api/blog/:blog_id
```
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;blog_title:\
&emsp;&emsp;blog_content:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blog_id`      | `string` | blog_id of a blog |

* #### Delete blog
```
  DELETE /api/blog/:blog_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blog_id`      | `string` | blog_id of a blog |


* #### Get all blogs
```
  GET /api/blog/
```

* #### Get all blogs of a user
```
  GET /api/blog/u/:blog_author
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blog_author`      | `string` | The user who posted that blog |

* #### Get a blog by id
```
  GET /api/blog/:blog_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blog_id`      | `string` | blog_id of a blog|

### Comment API's

* #### Create new comment
```
  POST /api/comment/:blog_id
```
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;cmt_text:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blog_id`      | `string` | blog_id of a blog where user wants to comment|

* #### Update comment
```
  PUT /api/comment/:cmt_id
```
&emsp;***Input Format*** (x-www-form-urlencoded)\
&emsp;&emsp;cmt_text:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cmt_id`      | `string` | id of a comment user wants to edit/update|

* #### Delete comment
```
  DELETE /api/comment/:cmt_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cmt_id`      | `string` | id of a comment user wants to delete|

* #### Get all comments of a particular blog
```
  GET /api/comment/:blog_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blog_id`      | `string` | blog id of a blog  |
