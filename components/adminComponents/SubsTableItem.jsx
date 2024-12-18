import React from 'react'

const SubsTableItem = ({ email, mongoId, date, deleteEmail }) => {
    const emailDate = new Date(date);
    return (
        <tr className='ng-white border-b text-left'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email ? email : "NO Email"}
            </th>
            <td className='hidden sm:block px-6 py-4'>{emailDate.toDateString()}</td>
            <td onClick={() => deleteEmail(mongoId)} className='cursor-pointer px-6 py-4'>x</td>
        </tr>
    )
}

export default SubsTableItem