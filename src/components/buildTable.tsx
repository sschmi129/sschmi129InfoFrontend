import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Guestbook, Module, User } from './interfaces';

export const buildModulesTable = (modules: [Module] | undefined) => {
    if (modules === undefined) {
        return <></>;
    }
    const x: JSX.Element[] = [];
    const modulesTable =
        <>
            <table className='w-full table-fixed'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border-2 border-grey'>Module Name</th>
                        <th className='border-2 border-grey'>Compulsory Module</th>
                        <th className='border-2 border-grey'>Credit Points</th>
                        <th className='border-2 border-grey'>Learning Outcomes</th>
                        <th className='border-2 border-grey'>Content</th>
                    </tr>
                </thead>
                <tbody className='[&>*:nth-child(even)]:bg-gray-100' key = {uuidv4()}>
                    {x}
                </tbody>
            </table>
        </>
    for (let i = 0; i < modules.length; i++) {
        const y: JSX.Element[] = [];
        for (let key in modules[i]) {
            y.push(
                <td 
                    key = {uuidv4()}
                    className='border-2 border-grey'
                >
                    {modules[i][key as 'module_name' | 'compulsory_module' | 'credit_points' | 'learning_outcomes' | 'content']}
                </td>
            )
        }
        x.push(
            <tr key = {uuidv4()}>
                {y}
            </tr>
        )
    }
    return modulesTable;
}


export const buildGuestbookTable = (guestbook: [Guestbook] | undefined) => {
    if (guestbook === undefined) {
        return <></>;
    }
    if (guestbook[0]) {

    }

    let x: JSX.Element[] = [];
    let guestbookTable =
        <>
            <table>
                <thead>
                    <tr>
                        <th className='border-2 border-black'>id</th>
                        <th className='border-2 border-black'>Name</th>
                        <th className='border-2 border-black'>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {x}
                </tbody>
            </table>
        </>
    for (let i = 0; i < guestbook.length; i++) {
        let y: JSX.Element[] = [];
        for (let key in guestbook[i]) {
            y.push(
                <td className='border-2 border-black'>
                    {guestbook[i][key as 'name' | 'message']}
                </td>
            )
        }
        x.push(
            <tr className='border-2 border-black'>
                {y}
            </tr>
        )
    }
    return guestbookTable;
}
