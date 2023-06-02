import { react, useState, useContext } from "react";
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import api from "../../services/api";
import { Context } from "../../context/authContext";
import imgBackground from "../../img/img_background_2.jpeg";
import { Navigate } from 'react-router-dom';
import TopBar from "../../components/topBar/Topbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { authenticated, handleLogin } = useContext(Context);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setFormError("Preencha todos os campos.");
    } else {
      setFormError("");
      try {
        await handleLogin(email, password);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFormError(error.response.data.message);
        } else {
          setFormError("Ocorreu um erro ao processar a solicitação.");
        }
      }
    }
  };

  const handleRedirect = (event) => {
    window.location.href = "/register"
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
      <Box
        component="form"
        sx={{
          height: "400px",
          width: "400px",
          backgroundColor: "white",
          borderRadius: "10px",
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
          <Grid container direction="row" sx={{ml: "280px",
              mt: "-50px"}}>
            <Grid item>
            <Button variant="contained" sx={{backgroundColor: "white", color: "black"}} onClick={handleRedirect}>REGISTRAR</Button>
            </Grid>
          </Grid>
            <Typography
              sx={{
                mb: "40px",
                mt: "60px",
              }}
              variant="h5"
            >
              Login
            </Typography>
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
    </Box>
  );
};

export default Login;
