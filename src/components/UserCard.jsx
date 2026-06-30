import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { removeUserFromFeed } from "../utils/feedSlice.js";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
    if (!user) return null;
    const dispatch = useDispatch();

    const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
    
    const handleSendRequest = async (status, userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                {withCredentials:true}
            );

            dispatch(removeUserFromFeed(userId));

        } catch (err) {}
    };

    return (
        <div className="card bg-sky-800 w-96 shadow-xl">
            <figure>
                <img src={photoUrl} alt={firstName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleSendRequest("ignored", _id)}
                >
                    Ignore
                </button>
                <button
                    className="btn btn-outline btn-success"
                    onClick={() => handleSendRequest("interested", _id)}
                >
                    Interested
                </button>
                </div>
            </div>
        </div>
    )
};

export default UserCard;
