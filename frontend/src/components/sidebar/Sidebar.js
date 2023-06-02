import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, TextField, Button, Select, MenuItem, InputLabel} from "@mui/material";
import api from "../../services/api";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
 const Sidebar = () => {
  const [userData, setUserData] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [hidden, setHidden] = useState(false);
  const [about, setAbout] = useState ("");
  const [instagram, setInstagram] = useState ("");
  const [facebook, setFacebook] = useState ("");
  const [linkedin, setLinkedin] = useState ("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadUserData() {
     try{
      const result = await api.get('/home-info/1');
      
      const userId = result.data.id_user;
      setHidden(result.data.hidden);
      const response = await api.get(`/user/${userId}`);
      const data = response.data;
      console.log("dados:", data)
      if(data){
        setName(data.name);
        setAbout(data.about);
        setInstagram(data.instagram_link);
        setFacebook(data.facebook_link);
        setLinkedin(data.linkedin_link);
      }
      if (data.profile_picture) {
        const byteaData = data.profile_picture;
      

        const imageUrl = `data:image/jpeg;base64,${byteaData}`;
      

        setProfilePicture(imageUrl);
      

      }
     }catch(error){
        setUserData([]);
     }  }
     const loadCategories = async () => {
      try {

        const response = await api.get('/list-categories');
        
  

        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar itens do banco de dados:', error);
      }
    }; 
      
    
    loadCategories();
    loadUserData();
  }, [])
  
   return (
    <Box sx={{
      width: "25vw",
      minHeight: "900px",
      height:"fit-content",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        mr: "40px",
        borderRadius: "10px",
        overflow: "hidden"
        }}
      >
      <Grid container direction="column" alignItems="center" sx={{ width: 'fit-content', mt:"20px" }}>
      <Grid item>
      <Box sx={{width:"20vw", height: "2px", backgroundColor: "black", mt: "30px", mb: "10px"}}></Box>
      </Grid>
        <Grid item> <Typography>SOBRE MIM</Typography></Grid>
        <Grid item>
        <Box sx={{width:"20vw", height: "2px", backgroundColor: "black", mt: "10px", mb: "30px"}}></Box>
        </Grid>
        
        <Grid item>
        <Box sx={{width:"250px", mb: "10px"}}>
        <img
                  src={profilePicture}
                    
                    alt="Profile Picture"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
        </Box>

        </Grid>
        <Grid item>
        <Box sx={{width:"20vw", minHeight: "150px", height: "fit-content", wordWrap: "break-word"}}>
        <Typography > {about}</Typography>
        </Box>
        </Grid>
        <Grid item><Box sx={{width:"20vw", height: "2px", backgroundColor: "black", mt: "30px", mb: "10px"}}>
          
          </Box></Grid>
        <Grid item>
          <Typography>CATEGORIAS</Typography>
        </Grid>
        <Grid item><Box sx={{width:"20vw", height: "2px", backgroundColor: "black", mt: "10px", mb: "30px"}}>
          
          </Box></Grid>
        <Grid item>
        <Box sx={{width:"20vw", minHeight: "150px", height: "fit-content",}}>
        {categories.map((item) => (
          <Typography sx={{ textAlign: "left" }}> - {item.name}</Typography>
        ))}
        </Box>
        </Grid>
        <Grid item><Box sx={{width:"20vw", height: "2px", backgroundColor: "black", mt: "30px", mb: "10px"}}></Box></Grid>
        <Grid item>
          <Typography>ME SIGA</Typography>
        </Grid>
        <Grid item><Box sx={{width:"20vw", height: "2px", backgroundColor: "black", mt: "10px", mb: "30px"}}></Box></Grid>
        <Grid item>
          <Grid container direction="row">
            <Link to={`${instagram}`} target="_blank" >
            <Grid item><InstagramIcon sx={{width: "50px", height: "50px", color:"black"}}/></Grid>
            </Link>
            <Link to={`${facebook}`} target="_blank">
            <Grid item><FacebookIcon sx={{width: "50px", height: "50px", color:"black"}}/></Grid>
            </Link>
            <Link to={`${linkedin}`} target="_blank" sx={{ textDecoration: 'none' }}>
            <Grid item><LinkedInIcon sx={{width: "50px", height: "50px", color:"black"}}/></Grid>
            </Link>
          </Grid>
        </Grid>
      </Grid>

    </Box>
   
  );
}
export default  Sidebar;