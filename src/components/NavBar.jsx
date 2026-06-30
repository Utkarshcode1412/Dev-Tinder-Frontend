import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightToBracket, faGear, faHandshake, faTree, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { removeUser } from '../utils/userSlice.js';
import { removeFeed } from '../utils/feedSlice.js';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  const handleLogout = async() => {
    try {

      await axios.post(
        BASE_URL + "/logout", 
        {}, 
        {withCredentials: true}
      );

      dispatch(removeUser());
      dispatch(removeFeed());

      return navigate("/login");

    } catch (error) {
      //console.log(error);
    }
  }


  return (
    <>
      <div className="navbar border-b border-base-300 bg-base-100 text-base-content shadow-sm">
        <div className="flex-1"> 
         {user ? (
            <Link to="/" className="btn btn-soft btn-primary text-xl">
              <FontAwesomeIcon icon={faTree} />
              <span>Dev Tinder</span>
            </Link>
          ) : (
            <button className="btn btn-soft btn-primary text-xl">
              <FontAwesomeIcon icon={faTree} />
              <span>Dev Tinder</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <Link
              to="/viewprofile"
              className="flex items-center gap-2 rounded-2xl bg-blue-700 px-4 py-2 text-white shadow-sm transition hover:bg-blue-800"
            > <span>
                <FontAwesomeIcon icon={faCircleUser} />
              </span>
              {user.firstName} {user.lastName}
            </Link>
          )}

          <label
            className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-md transition-all duration-200 ${theme === 'dark' ? 'border-primary bg-slate-800 text-yellow-300' : 'border-sky-200 bg-sky-100 text-sky-700'}`}
          >
            <input
              type="checkbox"
              className="theme-controller sr-only"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3.5A.75.75 0 0 1 12 2.75Zm0 14.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 17.25Zm8.25-5.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-16.5 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM5.03 5.03a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L5.03 6.09a.75.75 0 0 1 0-1.06Zm11.88 11.88a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM5.03 18.97a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0Zm11.88-11.88a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0ZM12 7.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Z" />
              </svg>
            )}
          </label>

          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-primary btn-circle avatar mx-5">
                <div className="w-14 rounded-full">
                  <img alt="user photo" className="object-cover" src={user.photoUrl} />
                </div>
              </div>

              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-56 border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li>
                  <Link to="/profile" className="justify-between text-base-content hover:bg-primary/10">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-700">
                        <FontAwesomeIcon icon={faCircleUser} />
                      </span>
                      <span>Edit Profile</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="text-base-content hover:bg-primary/10">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-700">
                        <FontAwesomeIcon icon={faHandshake} />
                      </span>
                      <span>Connections</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="text-base-content hover:bg-primary/10">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-700">
                        <FontAwesomeIcon icon={faComment} />
                      </span>
                      <span>Invitations</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <a className="text-base-content hover:bg-primary/10">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-700">
                        <FontAwesomeIcon icon={faGear} />
                      </span>
                      <span>Settings</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-base-content hover:bg-primary/10">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-700">
                        <FontAwesomeIcon icon={faRightToBracket} />
                      </span>
                      <span>Logout</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar