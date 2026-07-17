import React, { useEffect } from 'react'
import NavBar from './NavBar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer.jsx'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  
  const fetchUser = async () => {
    if(userData) return;

    try{
      const res = await axios.get(BASE_URL + "/profile/view", {
       withCredentials: true,
      });

      dispatch(addUser(res.data));

    }  catch(err){
      if (err.response?.status === 401) {
        navigate("/login");
      }
      else console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div className=" ">
      <NavBar />
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Body