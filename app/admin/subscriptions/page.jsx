'use client'
import SubsTableItem from '@/components/adminComponents/SubsTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
    const [emails, setEmails] = useState([]);

    const fetchEmails = async () => {
        const response = await axios.get('/api/email');
        setEmails(response.data.emails);
    }

    const deleteEmail = async (mongoId) => {
        try {
            const response = await axios.delete('/api/email', {  // Ensure the URL starts with '/'
                params: {
                    id: mongoId
                }
            });

            if (response.data.success) {
                toast.success(response.data.msg);
                fetchEmails();  // Refresh the email list after deletion
            } else {
                toast.error("Error deleting the email");
            }
        } catch (error) {
            toast.error("Failed to delete email");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEmails();
    }, [])
    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All Subcriptions</h1>
            <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-5 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Email Subcription
                            </th>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            emails.map((item, index) => {
                                return <SubsTableItem deleteEmail={deleteEmail} key={index} email={item.email} mongoId={item._id} date={item.date} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page