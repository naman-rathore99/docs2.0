import { useOther } from '@liveblocks/react/suspense'
import React from 'react'

const ActiveCollab = () => {
    const others = useOther();

    const collobrators = others.map((others) => other.info)
    return (
        <ul className='collaborators-list'>
            {collobrators.map((collab)=>{
                <li key={}></li>
            })
            }
        </ul>
    )
}

export default ActiveCollab