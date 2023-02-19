# Backend
A Flask app that manages a MongoDB database with 3 collections (threads, posts, and users.)

## Installation/Setup

Basic steps:
1. Install MongoDB on your computer
2. Install the following Python libraries with pip: flask, pymongo, flask_pymongo, pydantic
3. Get MongoDB running on your computer
4. Run the Flask app

Quick MacOS script (assumes pip and homebrew are already installed)
```
brew tap mongodb/brew
brew install mongodb-community@6.0
pip3 install flask pymongo flask_pymongo pydantic

brew services start mongodb-community@6.0
flask run -h localhost -p 8080
```

## Routes
All 4 of the basic database operations are included in the API.

### Create
`POST /createAccount`

`POST /createThread`

`POST /reply/<thread>`

### Read
`POST /logIn`

`GET /userInfo/<id>`

`GET /getAllThreads/<category>`

`GET /listCategories`

`GET /getAllPosts/<thread>`

### Update
`POST /changeUsername`

`POST /editThread/<thread>`

`POST /editPost/<post>`


### Delete
`POST /deleteThread/<thread>`

`POST /deletePost/<post>`


## Object formats

Some difference exists in how the data is formatted in the database vs. how it is sent to the frontend. 

### Threads 
Returned by the `/createThread` and `/getAllThreads/<category>` routes

<table>
  <thead>
    <tr>
      <th colspan=2>In database</th>
      <th colspan=2>Sent to frontend</th>
    </tr>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Key</th>
      <th>Type</th>
  </thead>
  <tbody>
    <tr>
      <td>_id</td>
      <td>ObjectId</td>
      <td>_id</td>
      <td>string</td>
    </tr>
    <tr>
      <td>category</td>
      <td>string</td>
      <td>category</td>
      <td>string</td>
    </tr>
    <tr>
      <td>creationTimestamp</td>
      <td>ISODate</td>
      <td>creationTimestamp</td>
      <td>string</td>
    </tr>
    <tr>
      <td>creatorID</td>
      <td>ObjectId</td>
      <td>creator</td>
      <td>{_id: string, joined: string, username: string}</td>
    </tr>
    <tr>
      <td>lastPost</td>
      <td>ISODate</td>
      <td>creationTimestamp</td>
      <td>string</td>
    </tr>
    <tr>
      <td>posts</td>
      <td>int</td>
      <td>posts</td>
      <td>int</td>
    </tr>
    <tr>
      <td>title</td>
      <td>string</td>
      <td>title</td>
      <td>string</td>
    </tr>
  </tbody>
</table>

### Posts
Returned by the `/getAllPosts/<thread>` and `/reply/<thread>` routes

<table>
  <thead>
    <tr>
      <th colspan=2>In database</th>
      <th colspan=2>Sent to frontend</th>
    </tr>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Key</th>
      <th>Type</th>
  </thead>
  <tbody>
    <tr>
      <td>_id</td>
      <td>ObjectId</td>
      <td>_id</td>
      <td>string</td>
    </tr>
    <tr>
      <td>content</td>
      <td>string</td>
      <td>content</td>
      <td>string</td>
    </tr>
    <tr>
      <td>creationTimestamp</td>
      <td>ISODate</td>
      <td>creationTimestamp</td>
      <td>string</td>
    </tr>
    <tr>
      <td>creatorID</td>
      <td>ObjectId</td>
      <td>creator</td>
      <td>{_id: string, joined: string, username: string}</td>
    </tr>
    <tr>
      <td>threadID</td>
      <td>ObjectID</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

### Users
Returned by the `/createAccount` route

<table>
  <thead>
    <tr>
      <th colspan=2>In database</th>
      <th colspan=2>Sent to frontend</th>
    </tr>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Key</th>
      <th>Type</th>
  </thead>
  <tbody>
    <tr>
      <td>_id</td>
      <td>ObjectId</td>
      <td>_id</td>
      <td>string</td>
    </tr>
    <tr>
      <td>joined</td>
      <td>ISODate</td>
      <td>joined</td>
      <td>string</td>
    </tr>
    <tr>
      <td>username</td>
      <td>string</td>
      <td>username</td>
      <td>string</td>
    </tr>
  </tbody>
</table>