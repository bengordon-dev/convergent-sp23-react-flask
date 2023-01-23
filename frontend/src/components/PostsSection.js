import React from 'react'

function PostsSection({ posts, thread, threads, setPosts }) {

    const createPost = (e) => {
        e.preventDefault()

        if (e.target[0].value == '') return        

        var newpost = {
            id: posts.length + 1,
            thread: thread,
            content: e.target[0].value,
            postedBy: 'John Doe',
            createdAt: new Date().toISOString()
        }

        setPosts([...posts, newpost])
        threads[threads.findIndex(t => t.name == thread)].posts += 1
        e.target[0].value = ''
    }
    return (
        <div className='col-span-3'>
            <div className='text-xl font-bold uppercase mb-4 lora'>Posts</div>
            <form className="flex flex-row w-full rounded-lg px-4 h-auto mb-8 hind-madurai" onSubmit={(e) => createPost(e)}>
                <input type="text" className="w-full h-10 border-2 border-gray-300 rounded-lg px-4 mr-4" placeholder="Create a new post" />
                <button type="submit" className="bg-pink-800 text-white font-bold py-2 px-4 rounded">Create</button>
            </form>
            {posts.filter(post => post.thread == thread).map((post) => {
                return (
                    <div key={post.id} className="bg-gray-100 rounded-lg px-4 py-2 my-2 flex flex-row justify-between cursor-pointer hind-madurai">
                        <div className="text-md">{post.content}</div>
                        <div className="text-sm text-gray-500">{post.postedBy}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default PostsSection