import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants.js'
import { removeConnections } from '../utils/connectionSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUsers } from '@fortawesome/free-solid-svg-icons';

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async(status, _id) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequests(_id));

        } catch (error) {
            
        }
    };

    const fetchRequests = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequests(res.data.data));
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return null;

    if (requests.length === 0)
        return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="my-10 flex flex-col items-center px-4">
        <div className="btn btn-primary mb-4">
            <FontAwesomeIcon icon={faCheck} />
            Requests
        </div>

      {requests.map((request) => {
        const sender = request?.fromUserId || request?.fromUser || request?.sender || {};
        const { _id, firstName, lastName, photoUrl, age, gender, about } = sender;

        return (
          <div
            key={_id}
            className="flex w-full max-w-3xl items-center justify-between rounded-lg bg-base-300 p-4 m-4 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName && lastName ? `${firstName} ${lastName}` : 'Unknown User'}
              </h2>
              {(age || gender) && <p>{[age, gender].filter(Boolean).join(', ')}</p>}
              <p>{about || 'No bio available.'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-soft btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-soft btn-success"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests