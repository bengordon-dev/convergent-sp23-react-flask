# Object formats
Some difference exists in how the data is formatted in the database vs. how it is sent to the frontend. 

### Threads 

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