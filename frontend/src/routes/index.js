import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Topbar from "../components/topBar/Topbar";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Settings from "../pages/settings/Settings";
import { Context } from "../context/authContext";
import Categories from "../pages/categories/Categories";
import ShowPost from "../pages/showPost/ShowPost";
import WritePost from "../pages/writePost/WritePost";
import SetHomePage from "../pages/setHomePage/SetHomepage";
import EditPost from "../pages/editPost/EditPost";
import checkTokenValidity from "../context/hooks/useAuth";

const CustomRoute = ({ isPrivate, ...rest }) => {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to="/" />;
  }
  checkTokenValidity (isPrivate)
  return (
  <Outlet {...rest} />);
};

const RoutesApp = () => {
  return (
    <div className="App">
      <Routes>
      
        <Route element={<CustomRoute isPrivate={false} />}>
          <Route path="login" element={<Login />} />
          <Route index element={<Homepage />} />
          <Route path="posts" element={<Homepage />} />
          <Route path="post/:id" element={<ShowPost />} />
     
        </Route>

        <Route element={<CustomRoute isPrivate={true} />}>
        <Route path="register" element={<Register />} />
        <Route path="edit-post/:id" element={<EditPost />} />
          <Route path="set-homepage" element={<SetHomePage/>}/> 
          <Route path="categories" element={<Categories/>}/>
          <Route path="write" element={<WritePost />} />
          <Route path="settings" element={<Settings />} />

        </Route>
      </Routes>
    </div>
  );
};

export default RoutesApp;


