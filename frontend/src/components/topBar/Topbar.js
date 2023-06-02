import React, { useState, useContext, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import api from "../../services/api";
import { Context } from "../../context/authContext";


const TopBar = () => {
  const [visibility, setVisibility] = useState(false);
  const { authenticated, handleLogout } = useContext(Context);
  useEffect(() => {
    const loadCheckToken =  async() => {
     try{
     const response = await api.post('/checkTokenValidity');
     console.log("dados", response)
     if(response.status === 200){
      setVisibility(true)
      console.log("com visibilidade")
    }else {
      setVisibility(false);
      console.log("sem visibilidade");
    }
     }catch(error){
       setVisibility(false)
       console.log("sem visibilidade")
     }  }
    
      
    loadCheckToken();
  }, [])

  return (<Box sx={{mb: "100px"}}> {visibility  ?  ( 
  <AppBar position="fixed" sx={{backgroundColor: "white"}}>
  <Toolbar sx={{ justifyContent: 'space-between' }}>
    <Link  to="/" style={{ textDecoration: 'none'}}>
    <Typography  sx={{color: "black"}}variant="h6" component="div" color="primary">
      Blog Gab Tech
    </Typography>
    </Link>
    <div >
    <Button sx={{color: "black"}}component={Link} to="/" >Publicações</Button>
    <Button sx={{color: "black"}}component={Link} to="/write" >Publicar</Button>
    <Button sx={{color: "black"}}component={Link} to="/categories" >Categorias</Button>
    <Button sx={{color: "black"}}component={Link} to="/set-homepage" >Visibilidade de Dados</Button>
      <Button sx={{color: "black"}}component={Link} to="/settings" >Configurações</Button>
      <Button sx={{color: "black"}}component={Link} to="/register" >Registrar</Button>
      <Button sx={{color: "black"}} onClick={handleLogout}>Logout</Button>
    </div>
  </Toolbar>
</AppBar>) :
(
  <AppBar position="fixed" sx={{backgroundColor: "white"}}>
<Toolbar sx={{ justifyContent: 'space-between' }}>
<Link  to="/" style={{ textDecoration: 'none'}}>
  <Typography sx={{color: "black"}}variant="h6" component="div" color="primary">
    Blog Gab Tech
  </Typography>
  </Link>
  <div >
  
    <Button sx={{color: "black"}}component={Link} to="/login" >Login</Button>
  </div>
</Toolbar>
</AppBar>
)
 }
   
    </Box>
  );
};

export default TopBar;
