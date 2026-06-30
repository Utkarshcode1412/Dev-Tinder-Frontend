import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js'
import { addFeed } from '../utils/feedSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserCard from './UserCard.jsx';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      
      dispatch(addFeed(res?.data?.data));

    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      } else {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  }

  return (
    feed && (
      <div className='flex justify-center mx-10 my-10'>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed