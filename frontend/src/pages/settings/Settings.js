import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import Topbar from "../../components/topBar/Topbar";
import api from "../../services/api";

const Settings = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const [about, setAbout] = useState ("");
  const [instagram, setInstagram] = useState ("");
  const [facebook, setFacebook] = useState ("");
  const [linkedin, setLinkedin] = useState ("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [existingData, setExistingData] = useState(false);
  const [formError, setFormError] = useState("");
  


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {

      const response = await api.get('/showUserConfig');
      const data = response.data;
      console.log("data", data)
      if (data) {
        setId(data.id);  
        setName(data.name);
        setEmail(data.email);
        setExistingData(true);
        setAbout(data.about);
        setInstagram(data.instagram_link);
        setFacebook(data.facebook_link);
        setLinkedin(data.linkedin_link);
        setProfilePicture(data.profile_picture);
        

        if (data.profile_picture) {
          const byteaData = data.profile_picture;
        
          
          const imageUrl = `data:image/jpeg;base64,${byteaData}`;
        
         
          setSelectedImage(imageUrl);
        
 
        }
  
      }

  
    } catch (error) {
      console.error(error);
    }
  };




  const handleAddData = async () => {
    try {
      const data = {
        name: name,
        email: email,
        password: password,
        profile_picture: profilePicture,
        about: about,
        instagram_link: instagram,
        facebook_link: facebook,
        linkedin_link: linkedin,
        

      
      };

      if (existingData && id) {
        await api.put(`/EditUserConfig/${id}`, data);
        window.location.reload();
        console.log("Dados atualizados com sucesso!");
      } else {
          await api.post("/addUserConfig", data);
          console.log("Dados adicionados com sucesso!");
      
      }
    } 
    catch (error) {
      if (error.response && error.response.status === 401) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Ocorreu um erro ao processar a solicitação.");
      
      }
      
    }
  };

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1]; 

      setProfilePicture(base64Image);
      setSelectedImage(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "#FCFCFC",
      }}
    >
     
 
     <Box sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FCFCFC",
      }}>  
        <Box ><Topbar/></Box>
        
      
        <Box><Typography  variant="h4" sx={{ mt: "50px", mb: "50px" }}>Configuraçoes do Usuario</Typography></Box>
        
       <Box sx={{
            mt: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>


            <Grid container
            direction="row"
            spacing={5}
            sx={{ width: "fit-content" }}>
              <Grid item>
                <Grid container direction={"column"} spacing={5}>
                  <Grid item> <TextField
                    label="Nome:"
                    variant="outlined"
                   value={name}
                    onChange={(event) => setName(event.target.value)}
                    sx={{ width: "300px" }}
                  /></Grid>
                  <Grid item><TextField
                    label="Email:"
                    variant="outlined"
                   value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{ width: "300px" }}
                  /></Grid>

                  <Grid item><TextField
                   id="multiline-textfield"
                   label="Sobre Mim:"
                   multiline
                   rows={5}
                    variant="outlined"
                   value={about}
                  onChange={(event) => setAbout(event.target.value)}
                    sx={{ width: "300px" }}
                  /></Grid>
                  
                  
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction={"column"} spacing={5}>
                 
                 <Grid item><TextField
                    label="Link Instagram:"
                    variant="outlined"
                   value={instagram}
                  onChange={(event) => setInstagram(event.target.value)}
                    sx={{ width: "300px" }}
                  /></Grid>
                  <Grid item><TextField
                    label="Link Facebook:"
                    variant="outlined"
                   value={facebook}
                  onChange={(event) => setFacebook(event.target.value)}
                    sx={{ width: "300px" }}
                  /></Grid>
                  <Grid item><TextField
                    label="Link Linkedin:"
                    variant="outlined"
                   value={linkedin}
                    onChange={(event) => setLinkedin(event.target.value)}
                    sx={{ width: "300px" }}
                  />
                  </Grid>
                  <Grid item><TextField
                  id="password"
                  type="password"
                    label="Senha:"
                    variant="outlined"
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}
                    sx={{ width: "300px" }}
                  /></Grid>
                  <Grid item>
                  <Button onClick={handleAddData}
      type="submit"
                    variant="contained"
                    style={{ backgroundColor: "black",
                    justifyContent:"center", alignItems:"center"
                 }}
                  >
                  {existingData ? "Editar" : "Armazenar"}
                  </Button>
                  </Grid>
                  <Grid item>
            {formError && (
              <Typography
                sx={{
                  color: "red",
                }}
                variant="h9"
              >
                {formError}
              </Typography>
            )}
          </Grid>
                </Grid>
              </Grid>
              <Grid item>
              <Grid container direction={"column"} spacing={3}>
              <Grid item><Box
                    sx={{
                      height: "200px",
                      width: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    
                    {selectedImage ? (
                      
                  <img
                  src={selectedImage}
                    
                    alt="Profile Picture"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <Typography variant="body2">Foto de Perfil</Typography>
                )}
                  </Box>
                  </Grid>
                  <Grid item>
                  <Button
                    component="label"
                    variant="contained"
                    style={{
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    Carregar Foto
                    <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
                  </Button>
                  </Grid>
                    </Grid>
              </Grid>
            </Grid>
            </Box>
       
     
    </Box>
    
    </Box>
  );
};

export default Settings;
