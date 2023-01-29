import React from 'react'

function ThreadsSection({ threads, setThreads, activeThread, setActiveThread, categories, userID, refreshThreads, selectedCat, setCategories, setSelectedCat }) {

  const active = "bg-pink-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"
  const inactive = "bg-gray-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"

  function createThread(e) {
    e.preventDefault()
    if (e.target[0].value === "" || e.target[1].value === "") return 

    fetch("http://localhost:8080/createThread", {
      method: "post", body: JSON.stringify({creatorID: userID, category: e.target[1].value, title: e.target[0].value})
    }).then((res) => res.json()).then((res) => {
      if (!categories.includes(res.category)) {
        setCategories([...categories, res.category])
      }

      if (selectedCat === res.category) {
        setThreads([...threads, res])
      } else {
        setSelectedCat(res.category)
      }
      setActiveThread(res._id)
    })

    e.target[0].value = ''
    e.target[1].value = ''
  }
    
  return (
    <div className=''>
      <div className="text-xl font-bold uppercase content-end mb-4 lora">Threads</div>
      <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
        <option>All</option>
        {categories && categories.map((cat) => <option>{cat}</option>)}
      </select>
      <button onClick={refreshThreads}>Refresh Threads</button>
      <form onSubmit={createThread}>
        <input type="text" placeholder="title"></input>
        <input type="text" placeholder='category'></input>
        <button type="submit">Create Thread</button>
      </form>
      {threads.map((thread) => {
        return (
          <div key={thread._id} className={thread._id != activeThread ? inactive : active} onClick={() => setActiveThread(thread._id)}>
            <div className="font-semibold text-md">{thread.title}</div>
            <div className={thread._id != activeThread ? "text-sm text-gray-400" : "text-sm text-pink-400"}>{thread.posts} posts</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThreadsSection