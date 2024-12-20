import React, { useState } from 'react'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
    const [email, setEmail] = useState("");
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);

        const response = await axios.post('/api/email', formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setEmail("");
        }
        else {
            toast.error("Error");
        }
    }
    return (
        <div className='px-5 py-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Image src={assets.logo} width={180} alt='blog app logo' className='w-[110] sm:max-w[130px]' />
                <button className='flex items-center gap-2 font-medium px-3 py-1 sm:px-6 sm:py-3 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get started <Image src={assets.arrow} alt='arrow' /></button>
            </div>
            <div className='text-center my-8'>
                <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
                <p className='mt-10 text-xs sm:text-base max-w-[740px] m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ducimus et harum? Nulla eum rerum saepe nostrum omnis. Iste, velit!</p>
            </div>
            <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 border border-black m-auto shadow-[-7px_7px_0px_#000000] '>
                <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none' />
                <button type="submit" className='border-l border-black px-4 py-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
            </form>
        </div>
    )
}

export default Header