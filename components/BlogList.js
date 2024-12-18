import React, { use, useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import axios from 'axios';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <div>
            <div className='flex justify-center gap-2 my-10'>
                <button onClick={() => (setMenu('All'))} className={menu == "All" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>All</button>
                <button onClick={() => (setMenu('Technology'))} className={menu == "Technology" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>Technology</button>
                <button onClick={() => (setMenu('Startup'))} className={menu == "Startup" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>Startup</button>
                <button onClick={() => (setMenu('Lifestyle'))} className={menu == "Lifestyle" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>Lifestyle</button>
            </div>
            {/* blog item */}
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-10 xl:mx-24'>
                {blogs.filter((item) => menu == 'All' ? true : menu == item.category).map((item, index) => {
                    return <BlogCard key={index} id={item._id} title={item.title} image={item.image} description={item.description} category={item.category} />
                })}
            </div>
        </div>
    )
}

export default BlogList