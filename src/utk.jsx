import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("devTinderEmail") || "";
    setEmailId("");
    setPassword("");
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

    try {
      const res = await axios.post(
        "http://localhost:8000/login",
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
          <form onSubmit={handleLogin} className="space-y-3"> 
                <label className="input validator my-3">
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
                        />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>

                  <label className="input validator my-3 flex items-center gap-2">
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
                      name="password"
                      required
                      placeholder="Password"
                      minLength="8"
                      autoComplete="new-password"
                      data-lpignore="true"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="grow"
                    />
                    <button
                      type="button"
                      className="text-sm opacity-70 hover:opacity-100"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                </label>
                <p className="validator-hint hidden">
                    Enter a valid password
                </p>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                <div className="card-actions justify-center pt-2">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login