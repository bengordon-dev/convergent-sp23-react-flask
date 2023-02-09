import React from 'react'

function ThreadsSection({ threads, setThreads, activeThread, setActiveThread }) {

  const active = "bg-pink-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"
  const inactive = "bg-gray-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"

  const createThread = (e) => {
    e.preventDefault();

    var newthread = {
      name: e.target[0].value,
      posts: 0
    }

    setThreads([...threads, newthread])
    console.log(threads);
    
  }


  return (
    <div className=''>
      <div className="text-xl font-bold uppercase content-end mb-4 lora">Threads</div>
      <form className="flex flex-row w-full rounded-lg px-4 h-auto mb-8 hind-madurai" onSubmit={(e) => createThread(e)}>
          <input type="text" className="w-full h-10 border-2 border-gray-300 rounded-lg px-4 mr-4" placeholder="Create a new thread" />
          <button type="submit" className="bg-pink-800 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>
      {threads.map((thread) => {
        return (
          <div key={thread.name} className={thread.name != activeThread ? inactive : active} onClick={() => setActiveThread(thread.name)}>
            <div className="font-semibold text-md">{thread.name} </div>
            <div className={thread.name != activeThread ? "text-sm text-gray-400" : "text-sm text-pink-400"}>{thread.posts} posts</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThreadsSection