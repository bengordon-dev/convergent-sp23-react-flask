import React, { useState } from 'react'
import ThreadsSection from './ThreadsSection'
import PostsSection from './PostsSection'

function Main() {

    const [threads, setThreads] = useState([
        {
            name: "Ideas",
            posts: 1,
        },
        {
            name: "Questions",
            posts: 2
        }
    ])
    const [activeThread, setActiveThread] = useState(threads[0].name)
    const [posts, setPosts] = useState([
        {
            id: 1,
            thread: "Ideas",
            content: 'Hello World',
            postedBy: 'John Doe',
            createdAt: '2021-01-01T00:00:00.000Z'
        },
        {
            id: 2,
            thread: "Questions",
            content: 'What is the meaning of life?',
            postedBy: 'John Doe',
            createdAt: '2021-01-01T00:00:00.000Z'
        },
        {
            id: 3,
            thread: "Questions",
            content: 'What are the best programming languages?',
            postedBy: 'John Doe',
            createdAt: '2021-01-01T00:00:00.000Z'
        }
    ])

    

    return (
        <div className='grid grid-cols-4 pt-10 gap-8 px-44 font-sans'>
            <ThreadsSection threads={threads} activeThread={activeThread} setActiveThread={setActiveThread} />
            <PostsSection posts={posts} threads={threads} thread={activeThread} setPosts={setPosts} />
        </div>
    )
}

export default Main