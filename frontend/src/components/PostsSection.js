import React, { useState } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

function PostsSection({ posts, threads, thread, setPosts, title, userID, deleteActiveThread, threadIndex, stringifyTimestamp}) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo()
  const deleteStyles = "p-0.5 text-red-500 italic hover:underline"

  const [editingID, setEditingID] = useState("")
  const editingIndex = posts.findIndex(p => p._id === editingID)
  const [editingContent, setEditingContent] = useState("")


  const createPost = (e) => {
    e.preventDefault()
    if (e.target[0].value === '') return        

    fetch(`http://localhost:8080/reply/${thread}`, {
      method: "post", body: JSON.stringify({creatorID: userID, content: e.target[0].value})
    }).then((res) => res.json()).then((res) => setPosts([...posts, res]))

    threads[threadIndex].posts += 1
    e.target[0].value = ''
  }

  function deletePost(post) {
    fetch(`http://localhost:8080/deletePost/${post}`, {
      method: "post", body: JSON.stringify({creatorID: userID})
    }).then((res) => res.json()).then((res) => setPosts([...posts.filter(p => p._id !== post)]))
    threads[threadIndex].posts -= 1
  }

  function beginEditingPost(post) {
    setEditingID(post._id)
    setEditingContent(post.content)
  }

  function editPost(post) {
    fetch(`http://localhost:8080/editPost/${post}`, {
      method: "post",  body: JSON.stringify({creatorID: userID, newContent: editingContent})
    }).then((res) => res.json()).then((res) => {
      if (res.changed) {
        setEditingID("")
        let newPost = {...posts[editingIndex]}
        newPost.content = editingContent
        setPosts([...posts.slice(0, editingIndex), newPost, ...posts.slice(editingIndex + 1)])
        setEditingContent("")
      } else {
        setEditingContent("")
        setEditingID("")
      }
    })
  }

  return (
    <div className='col-span-3'>
      <div className='flex flex-row mb-4 justify-between'>
        <div>
          <div className='text-xl font-bold uppercase mb-1 flex lora'>{title ? title : "Posts"}</div>
          {title && <div className='text-sm italic text-slate-500'>created by {threads[threadIndex].creator.username} on {new Date(threads[threadIndex].creationTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'})}</div>}
        </div>
        {threadIndex > -1 && <div className='mb-2 text-sm italic'>
          <p className='font-bold uppercase text-right'>{threads[threadIndex].category}</p>
          {threads[threadIndex].creator._id === userID && <button className={deleteStyles + " font-semibold"} onClick={deleteActiveThread}>Delete Thread</button>}
        </div>}
      </div>
      
      {threadIndex > -1 && <form className="flex flex-row w-full rounded-lg px-4 h-auto mb-8 hind-madurai" onSubmit={(e) => createPost(e)}>
        <input type="text" className="w-full h-10 border-2 border-gray-300 rounded-lg px-4 mr-4" placeholder="Create a new post" />
        <button type="submit" className="bg-pink-800 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>}
      {title && posts && posts.map((post) => {
        const date = new Date(post.creationTimestamp)
        return (
          <div key={post._id} className="bg-gray-100 rounded-lg px-4 py-4 my-2 ">
            {editingID === post._id ? 
              <div>
                <textarea className='w-full' value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
              </div>
              : 
              <div className="flex flex-row justify-between cursor-pointer hind-madurai mb-2">
                <div className="text-md">{post.content}</div>
              </div> 
            }
            <div className='flex flex-row justify-between text-sm italic'>
              <div className="text-gray-500">Posted by {post.creator.username} ({timeAgo.format(date)})</div>
              {post.creator._id === userID &&
                <div>
                  {editingID === post._id && <button onClick={() => setEditingID("")}>Cancel</button>}
                  <button className="p-0.5 px-2 text-blue-500 italic hover:underline" 
                    onClick={editingID === post._id ? () => editPost(post._id) : () => beginEditingPost(post)}
                  >
                    {editingID === post._id ? "Confirm" : "Edit"}
                  </button>
                  <button className={deleteStyles + " pl-1"} onClick={() => deletePost(post._id)}>Delete</button>
                </div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostsSection