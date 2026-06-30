import React from 'react';
import { useSelector } from 'react-redux';

const ProfileCard = ({ user }) => {
  const userData = useSelector((store) => store.user);
  const profileUser = user || userData;

  if (!profileUser) return null;

  const { firstName = '', lastName = '', photoUrl = '', age = '', gender = '', about = '' } = profileUser;

  return (
    <>
      <button className=' btn bg-cyan-700  mx-175 my-2'>My Profile</button>
      <div className="flex justify-center px-4 py-10">
        <div className="card w-full max-w-md bg-base-200 shadow-xl">
          <figure className="px-6 pt-6">
            <img
              src={photoUrl || 'https://placehold.co/400x400?text=Profile'}
              alt={firstName || 'Profile'}
              className="h-56 w-56 rounded-full object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{`${firstName} ${lastName}`}</h2>
            {(age || gender) && (
              <p className="text-sm opacity-80">{[age, gender].filter(Boolean).join(', ')}</p>
            )}
            <p className="text-base">{about || 'No bio added yet.'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

