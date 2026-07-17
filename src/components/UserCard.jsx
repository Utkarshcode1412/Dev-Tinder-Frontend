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
        <div className="soft-card card w-full max-w-md overflow-hidden rounded-[1.5rem]">
            <figure className=" p-4">
                <img src={photoUrl} alt={firstName} />
            </figure>
            <div className="card-body w-full max-w-md">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                <button
                    className="btn border-[color:var(--border)] bg-transparent text-[color:var(--text)] hover:bg-[color:var(--brand-soft)]"
                    onClick={() => handleSendRequest("ignored", _id)}
                >
                    Ignore
                </button>
                <button
                    className="btn bg-[color:var(--brand)] text-[color:var(--cream)] hover:bg-[color:var(--brand-dark)]"
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
