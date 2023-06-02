import { react, useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button, Select, MenuItem,FormControl, InputLabel} from "@mui/material";
import api from "../../services/api";
import { Context } from "../../context/authContext";
import imgBackground from "../../img/img_background_2.jpeg";
import { Navigate } from 'react-router-dom';
import TopBar from "../../components/topBar/Topbar";

const SetHomePage = () => {

    const [hidden, setHidden] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await api.get('/home-info/1');
  
      if (response.data) {
        await api.put('/home-info/1', {id_user: selectedUserId, hidden: hidden});
        console.log('Dados atualizados com sucesso!');
      } else {
        await api.post('/home-info', {id_user: selectedUserId, hidden: hidden});
        console.log('Dados adicionados com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao realizar a operação:', error);
    }
  };

  
  
  
    const handleHidden = (event) => {
      setHidden(event.target.value);
    };
    const handleUserChange = (event) => {
        const selectedId = event.target.value;
        setSelectedUserId(selectedId);

        const selectedUser = users.find((user) => user.id === selectedId);
        setSelectedUserName(selectedUser.name);

      };

      useEffect(() => {
 
        const fetchUsers = async () => {
          try {
            const response = await api.get('/list-users');
            setUsers(response.data);
          } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
          }
        };
    
        fetchUsers();
      }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FCFCFC",
      
      }}
    >
      <TopBar></TopBar>
      <Box
     
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
        
            <Typography
              sx={{
                mb: "40px",
                mt: "60px",
              }}
              variant="h5"
            >
            Visibilidade de Dados
            </Typography>
          </Grid>
          <Grid item>
          <Select value={selectedUserId}
        onChange={handleUserChange} sx={{minWidth: "300px", maxWidth: "520px"}} displayEmpty inputProps={{ placeholder: ' Informações do Usuario' }}>
              <MenuItem value="" disabled>
       Informações do Usuario
      </MenuItem>
    
      {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
          </Grid>
          <Grid item>
 
      <Select value={hidden}
        onChange={handleHidden} sx={{minWidth: "300px", maxWidth: "520px"}} displayEmpty inputProps={{ placeholder: ' Visibilidade de Informações' }}>
              <MenuItem value="" disabled>
        Visibilidade de Informações
      </MenuItem>
    
        <MenuItem value={false}>Não Esconder Informações</MenuItem>
        <MenuItem value={true}>Esconder Informações</MenuItem>
      </Select>
  
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
        </Grid>
      </Box>
    </Box>
  );
};

export default SetHomePage;
