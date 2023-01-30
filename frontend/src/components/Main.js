import React, { useState, useEffect } from 'react'
import ThreadsSection from './ThreadsSection'
import PostsSection from './PostsSection'

function Main(props) {
  const [threads, setThreads] = useState([])
  const [activeThread, setActiveThread] = useState("")
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCat, setSelectedCat] = useState("All") 
  const threadIndex = threads.findIndex(t => t._id == activeThread)

    
  useEffect(() => {
    fetch("http://localhost:8080/listCategories")
      .then((res) => res.json()).then((res) => setCategories(res.categories))
  }, [])

  function fetchThreads() {
    fetch(`http://localhost:8080/getAllThreads/${selectedCat}`)
      .then((res) => res.json()).then((res) => setThreads(res.threads))
  }

  useEffect(() => {
    fetchThreads()
  }, [selectedCat])

  useEffect(() => {
    if (activeThread !== "") {
      fetch(`http://localhost:8080/getAllPosts/${activeThread}`)
        .then((res) => res.json()).then((res) => setPosts(res.posts))
    }
  }, [activeThread])

  function refreshThreads() {
    fetch("http://localhost:8080/listCategories")
      .then((res) => res.json()).then((res) => {
        if (!res.categories.includes(selectedCat)) {
          // all threads in category were deleted, edge case
          setSelectedCat("All")
        }
        fetchThreads()
        setCategories(res.categories)
      })
  }

  function deleteActiveThread() {
    if (threads && activeThread && 
        threads[threads.findIndex(t => t._id == activeThread)].creator._id === props.userID) {
      fetch(`http://localhost:8080/deleteThread/${activeThread}`, {
        method: "post", body: JSON.stringify({creatorID: props.userID})
      }).then((res) => res.json()).then((res) => {
        if (res.success) {
          setPosts([])
          setThreads(threads.filter((e) => e._id !== activeThread))
          setActiveThread("")
        }
      })
    }
  }

  function stringifyTimestamp(stamp) {
    const date = new Date(stamp)
    return `${date.toDateString()} ${date.toTimeString().split(" ")[0]}`
  }


  return (
    <div className='grid grid-cols-4 pt-10 gap-8 px-44 font-sans'>
      <ThreadsSection 
        threads={threads} activeThread={activeThread} setActiveThread={setActiveThread} 
        setThreads={setThreads}
        refreshThreads={refreshThreads}
        categories={categories} setCategories={setCategories} 
        selectedCat={selectedCat} setSelectedCat={setSelectedCat} 
        userID={props.userID} 
        stringifyTimestamp={stringifyTimestamp}
      />
      <PostsSection 
        posts={posts} setPosts={setPosts}
        threads={threads} thread={activeThread}
        title={threads && activeThread && threadIndex > -1 && threads[threadIndex].title}
        userID={props.userID} 
        deleteActiveThread={deleteActiveThread}
        threadIndex={threadIndex}
        stringifyTimestamp={stringifyTimestamp}
      />
    </div>
  )
}

export default Main