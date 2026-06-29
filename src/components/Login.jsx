import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("devTinderEmail") || "";
    setEmailId("utkarsh@gmail.com");
    setPassword("Utkarsh@123");
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailId(value);
    localStorage.setItem("devTinderEmail", value);
  };

  const handleLogin = async (e) => {
    e?.preventDefault();

    if (!emailId.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      localStorage.removeItem("devTinderEmail");
      setEmailId("");
      setPassword("");
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };


  return (
    <div className='flex justify-center my-40'>
      <div className="card bg-base-200 text-base-content w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleLogin} className="space-y-3" noValidate> 
                <label className="input validator my-3 outline-none! ring-0! focus-within:outline-none! focus-within:ring-0!">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input 
                        type="email"
                        name="email"
                        placeholder="mail@site.com"
                        required
                        autoComplete="email"
                        value={emailId}
                        onChange={handleEmailChange}
                        className="outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent"
                        />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>

                  <label className="input validator my-3 flex items-center gap-2 outline-none! ring-0! focus-within:outline-none! focus-within:ring-0!">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        ></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                      </g>
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="user-current-password"
                      required
                      placeholder="Password"
                      minLength="8"
                      autoComplete="one-time-code"
                      data-lpignore="true"
                      data-form-type="other"
                      inputMode="text"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="grow outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent"
                    />
                    <button
                      type="button"
                      className="opacity-70 hover:opacity-100"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.5a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.183a1.01 1.01 0 0 1 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                </label>
                <p className="validator-hint hidden">
                    Enter a valid password
                </p>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                <div className="card-actions justify-center pt-2">
                  <button type="submit" className="btn btn-soft btn-primary">Login</button>
                </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login