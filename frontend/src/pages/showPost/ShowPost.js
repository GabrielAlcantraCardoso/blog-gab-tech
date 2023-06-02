import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import Topbar from "../../components/topBar/Topbar";
import React, { useState, useContext, useEffect } from "react";
import api from "../../services/api";

const ShowPost = () => {

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
<Box>
      <Topbar/>
      
      <Grid container direction="row">
        <Grid item><SinglePost /></Grid>
      
      <Grid item>
        {hidden ? (null) : (<Sidebar />)}
        </Grid>
      
      </Grid>
      </Box>

  );
}
export default ShowPost