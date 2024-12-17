'use client';

import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

const Page = ({ params }) => {
    const resolvedParams = use(params);//Future proofing for newer versions of nextjs
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!resolvedParams.id) return;

        const fetchBlogData = () => {
            const numericId = Number(resolvedParams.id); // Converted to a number
            const foundData = blog_data.find((item) => item.id === numericId);
            if (foundData) {
                setData(foundData);
                // console.log("Matched blog data:", foundData);
            }
        };

        fetchBlogData();
    }, [resolvedParams.id]); // Dependency array includes params.id

    return (
        data ? (
            <div>
                <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                    <div className="flex justify-between items-center">
                        <Link href='/'>
                            <Image src={assets.logo} alt="" width={180} className="w-[130px] sm:w-auto" priority />
                        </Link>
                        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                            Get started <Image src={assets.arrow} alt="arrow" />
                        </button>
                    </div>
                    <div className="text-center my-24">
                        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                        <Image src={data.author_img} width={60} height={60} alt='author_img' className='mx-auto mt-6 border border-white rounded-full' />
                        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                    </div>
                </div>
                <div className='mx-5 md:mx-auto max-w-[800px] mt-[-100px] mb-10'>

                    <Image src={data.image} width={1280} height={720} alt='' priority className='border-8 border-white' />
                    <h1 className='my-8 font-semibold text-[26px]'>Introduction:</h1>
                    <p>{data.description}</p>
                    <h3 className='my-5 text-[18px] font-semibold'>Step 1: Understand the Basics</h3>
                    <p className='my-3'>Before diving into any complex strategies, it’s crucial to understand the foundational principles. Whether it’s technology, lifestyle, or startups, knowing the basics lays a strong groundwork for future success.</p>
                    <p className='my-3'>Take time to explore the fundamentals. For example, in lifestyle management, focus on habit-building. For startups, research market trends, and in technology, get comfortable with essential tools or coding languages.</p>
                    <h3 className='my-5 text-[18px] font-semibold'>Step 2: Understand the Basics</h3>
                    <p className='my-3'>Before diving into any complex strategies, it’s crucial to understand the foundational principles. Whether it’s technology, lifestyle, or startups, knowing the basics lays a strong groundwork for future success.</p>
                    <p className='my-3'>Take time to explore the fundamentals. For example, in lifestyle management, focus on habit-building. For startups, research market trends, and in technology, get comfortable with essential tools or coding languages.</p>
                    <h3 className='my-5 text-[18px] font-semibold'>Step 3: Understand the Basics
                    </h3>
                    <p className='my-3'>Before diving into any complex strategies, it’s crucial to understand the foundational principles. Whether it’s technology, lifestyle, or startups, knowing the basics lays a strong groundwork for future success.</p>
                    <p className='my-3'>Take time to explore the fundamentals. For example, in lifestyle management, focus on habit-building. For startups, research market trends, and in technology, get comfortable with essential tools or coding languages.</p>
                    <h3 className='my-5 text-[18px] font-semibold'>Conclusion:
                    </h3>
                    <p className='my-3'>In conclusion, whether you’re working on a lifestyle change, building a startup, or advancing in technology, the process remains the same. Understand the basics, develop a strategic plan, and take consistent action while reflecting and adjusting as needed.</p>
                    <div className='my-24'>
                        <p className='text-balance font-semibold my-4'>Share this article on social media</p>
                        <div className='flex'>
                            <Image src={assets.facebook_icon} alt='' />
                            <Image src={assets.twitter_icon} alt='' />
                            <Image src={assets.googleplus_icon} alt='' />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        ) : (
            <p className='text-center text-3xl mt-10'>Loading...</p>
        )
    );
};

export default Page;
