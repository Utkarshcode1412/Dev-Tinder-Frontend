import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants.js'
import { addConnections } from '../utils/connectionSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Connections = () => {

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

  const fetchConnections = async() => {
    try {
        const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
        });

        dispatch(addConnections(res.data.data));


    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

   if (!connections) return;

   if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
        <div className="btn btn-primary">
            <FontAwesomeIcon icon={faUsers} />
            Connections
        </div>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div className="shrink-0">
              <img
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full object-contain bg-base-200 border border-base-300 shadow-sm"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-9 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"chat/" + _id}>
              <button className='btn btn-primary'>Chat</button>  
            </Link>
          </div>
        );
      })}
    </div>
  )
}

export default Connections