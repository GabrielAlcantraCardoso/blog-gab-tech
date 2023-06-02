import { useLocation } from "react-router";
import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";

import Topbar from "../../components/topBar/Topbar";
import api from "../../services/api";
import { Box } from "@mui/system";

export default function Homepage() {
  const location = useLocation();
  console.log(location);
  const [hidden, setHidden] = useState(false);

  const loadHomeConfig = async () => {
    try{
      const result = await api.get('/home-info/1');
    setHidden(result.data.hidden);
    }catch(error){

    }
  }

  useEffect(() => {
    loadHomeConfig();

  }, [])
  return (
    <>
       <Topbar/>
      <Header />
      <Box sx={{display: "flex"}}>
        <Posts />
        {hidden ? (
          null
          
        ) : (  <Sidebar />)}
       
      </Box>
    </>
  );
}