import React from 'react'

function PostsSection({ posts, threads, thread, setPosts, title, userID, deleteActiveThread, threadIndex, stringifyTimestamp}) {

  const createPost = (e) => {
    e.preventDefault()
    if (e.target[0].value == '') return        

    fetch(`http://localhost:8080/reply/${thread}`, {
      method: "post", body: JSON.stringify({creatorID: userID, content: e.target[0].value})
    }).then((res) => res.json()).then((res) => setPosts([...posts, res]))

    threads[threadIndex].posts += 1
    e.target[0].value = ''
  }

  function deletePost(post) {

  }

  return (
    <div className='col-span-3'>
      <div className='text-xl font-bold uppercase mb-4 lora'>{title ? title : "Posts"}</div>
      {threadIndex > -1 && <div className='mb-2'>
        <p>Category: {threads[threadIndex].category}</p>
        <p>Created by {threads[threadIndex].creator.username} at {stringifyTimestamp(threads[threadIndex].creationTimestamp)}`</p>
        {threads[threadIndex].creator._id === userID && <button onClick={deleteActiveThread}>Delete Thread</button>}
      </div>}
      {threadIndex > -1 && <form className="flex flex-row w-full rounded-lg px-4 h-auto mb-8 hind-madurai" onSubmit={(e) => createPost(e)}>
        <input type="text" className="w-full h-10 border-2 border-gray-300 rounded-lg px-4 mr-4" placeholder="Create a new post" />
        <button type="submit" className="bg-pink-800 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>}
      {posts && posts.map((post) => {
        const date = new Date(post.creationTimestamp)
        return (
          <div key={post._id} className="bg-gray-100 rounded-lg px-4 py-2 my-2 ">
            <div className="flex flex-row justify-between cursor-pointer hind-madurai">
              <div className="text-md">{post.content}</div>
            </div>
            <div className='flex flex-row'>
              <div className="text-sm text-gray-500 pr-2">Posted by {post.creator.username} at {stringifyTimestamp(post.creationTimestamp)}</div>
              {post.creator._id === userID && <button onClick={() => deletePost(post._id)}>Delete post</button>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostsSection