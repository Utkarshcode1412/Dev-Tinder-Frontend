import React from 'react'
import { useSelector } from 'react-redux'
import ProfileCard from './ProfileCard';

const ViewProfile = () => {
    const user = useSelector((store) => store.user);

  return (
    user && (
        <div className=' bg-blue-950/50'>
            <ProfileCard user={user} />
        </div>
    )
  )
}

export default ViewProfile