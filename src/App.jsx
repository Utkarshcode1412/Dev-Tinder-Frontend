import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body.jsx"
import Login from "./components/Login.jsx"
import Profile from "./components/Profile.jsx"
import { Provider } from "react-redux"
import appStore from "./utils/appStore.js"
import Feed from "./components/Feed.jsx"
import PublicRoute from "./components/PublicRoute.jsx"
import ViewProfile from "./components/ViewProfile.jsx"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Body />}> 
                    <Route index element={<Feed />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="viewprofile" element={<ViewProfile />} />

                    <Route element={<PublicRoute />}>
                      <Route path="login" element={<Login />} />
                    </Route>    

                </Route>              
            </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
