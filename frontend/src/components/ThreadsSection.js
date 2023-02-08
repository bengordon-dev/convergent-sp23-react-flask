import React from 'react'

function ThreadsSection({ threads, setThreads, activeThread, setActiveThread, categories, userID, refreshThreads, selectedCat, setCategories, setSelectedCat }) {

  const active = "bg-pink-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"
  const inactive = "bg-gray-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"

  function createThread(e) {
    e.preventDefault()
    if (e.target[0].value === "" || (selectedCat == "All" && e.target[1].value === "")) return 

    console.log(e.target[0].value, e.target[1].value)

    fetch("http://localhost:8080/createThread", {
      method: "post", body: JSON.stringify({creatorID: userID, category: e.target[1].value == "" ? selectedCat : e.target[1].value, title: e.target[0].value})
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

  function refreshThreads() {
    window.location.reload(true)
  }
    
  return (
    <div className=''>
      <div className="text-xl font-bold uppercase content-end mb-5 lora">Threads</div>
      <div className="w-full flex flex-row h-7 items-center">
        <select className="flex my-2 font-semibold w-full mr-2 h-full" value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
          <option>All</option>
          {categories && categories.map((cat) => <option>{cat}</option>)}
        </select>
        <button className="font-semibold flex bg-pink-800 rounded-md px-3 text-white text-lg" onClick={refreshThreads}>&#8634;</button>
      </div>
      
      <form className="my-4 mb-6 text-sm" onSubmit={(e) => createThread(e)}>
        <input className="flex w-full p-2 tracking-wide border rounded-md mb-2" type="text" placeholder="title"></input>
        <input className="flex w-full p-2 tracking-wide border rounded-md mb-4" type="text" placeholder='category'></input>
        <button className="flex w-full p-1 py-1.5 justify-center tracking-wide border rounded-md mb-2 bg-pink-800 text-white font-semibold" type="submit">Create Thread</button>
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