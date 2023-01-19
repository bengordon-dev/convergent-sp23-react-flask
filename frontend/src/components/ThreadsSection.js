import React from 'react'

function ThreadsSection({ threads, activeThread, setActiveThread }) {

  const active = "bg-pink-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"
  const inactive = "bg-gray-200 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai"

  return (
    <div className=''>
      <div className="text-xl font-bold uppercase content-end mb-4 lora">Threads</div>
      {threads.map((thread) => {
        return (
          <div key={thread.name} className={thread.name != activeThread ? inactive : active} onClick={() => setActiveThread(thread.name)}>
            <div className="font-semibold text-md">{thread.name}</div>
            <div className={thread.name != activeThread ? "text-sm text-gray-400" : "text-sm text-pink-400"}>{thread.posts} posts</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThreadsSection