import React, { useState, useContext } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import api from "../../services/api";
import imgBackground from "../../img/img_background_2.jpeg";
import { Navigate } from 'react-router-dom';
import TopBar from "../../components/topBar/Topbar";
const Register = () => {
    const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState(false);


  const handleFullNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
   
    event.preventDefault();
    if ( !name || !email || !password || !confirmPassword) {
      setFormError("Preencha todos os campos.");
    } else {
      setFormError("");
      try {
        await api.post('/register', {name: name, email: email, password: password, confirmPassword: confirmPassword});
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setOpenDialog(true);
        console.log("chegou ate aqyi")
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFormError(error.response.data.message);
        } else {
          setFormError("Ocorreu um erro ao processar a solicitação.");
        }
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
   
    <Navigate to="/login" />
    window.location.href = "/login";
  }

  const handleRedirect = (event) => {
    window.location.href = "/login"
  }
  return (
    <Box
    sx={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FCFCFC",
      backgroundImage: `url(${imgBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <TopBar/>
    <Box>
    
    <Box
      component="form"
      sx={{
        height: "550px",
        width: "400px",
        backgroundColor: "white",
        borderRadius: "10px",
        mt: "50px"
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
        <Grid container direction="row" sx={{ml: "320px",
              mt: "-60px"}}>
            <Grid item>
            <Button variant="contained" sx={{backgroundColor: "white", color: "black"}} onClick={handleRedirect} >Login</Button>
            </Grid>
          </Grid>
          <Typography
            sx={{
              mb: "40px",
              mt: "70px",
            }}
            variant="h5"
          >
            Registrar
          </Typography>
          
        </Grid>
        <Grid item>
          <TextField
            id="name"
            type="text"
            label="Nome Completo"
            variant="outlined"
            value={name}
            onChange={handleFullNameChange}
            sx={{ width: "300px" }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            type="email"
            helperText={emailError ? "Endereço de email inválido" : ""}
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            sx={{ width: "300px" }}
          />
        </Grid>
        
        <Grid item>
          <TextField
            id="password"
            type="password"
            label="Senha"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={{ width: "300px" }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirmar Senha"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            sx={{ width: "300px", mb: "20px" }}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "black" }}
            onClick={handleSubmit}
          >
            Confirmar
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

      
</Box>

<Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle>Blog Gab Tech</DialogTitle>
        <DialogContent>
          <p>Você foi cadastrado com sucesso!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
      
    </Box>
  </Box>

  );
};

export default Register;
