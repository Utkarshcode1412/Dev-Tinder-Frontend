import React from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightToBracket, faGear } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
       <div className="navbar bg-neutral shadow-sm">
          <div className="flex-1">
            <a className="btn btn-primary text-xl">Dev Tinder</a>
          </div>
            {user && (
              <div className="flex items-center gap-3">
                <div className=" rounded-2xl bg-blue-700 px-4 py-2 text-white shadow-sm">
                {user.firstName} {user.lastName}
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-primary btn-circle avatar mx-5">
                    <div className="w-14 rounded-full">
                      <img
                        alt="user photo"
                        className="object-cover"
                        src={user.photoUrl} />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-56 border border-blue-300 bg-slate-100 p-2 shadow-lg">
                    <li>
                      <a className="justify-between text-slate-800 hover:bg-blue-400">
                        <span className="flex items-center gap-2">
                          <span className="text-blue-700">
                            <FontAwesomeIcon icon={faCircleUser} />
                          </span>
                          <span>Profile</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="text-slate-800 hover:bg-blue-400">
                        <span className="flex items-center gap-2">
                          <span className="text-blue-700">
                            <FontAwesomeIcon icon={faGear} />
                          </span>
                          <span>Settings</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="text-slate-800 hover:bg-blue-400">
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
              </div>
            )}
        </div>
    </>
  )
}

export default NavBar