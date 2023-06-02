import { useContext, useEffect, useState } from "react";
import { Box , Typography, TextField, Button, Grid} from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Navigate } from 'react-router-dom';

import api  from "../../services/api";
import TopBar from "../../components/topBar/Topbar";



const itensPerPage = 5;
const Categories  = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categorie, setCategorie] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState('');
  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete-categorie/${id}`);
      setOpenDialog(true);
      const response = await api.get('/list-categories');
      setCategories(response.data);
    } catch (error) {
        
    }
  }

  const handleEdit = async (data) => {
    try {
    setEdit(true);
    setId(data.id);
    setCategorie(data.name);
    } catch (error) {
        
    }
  }

  const handleData = async () => {
    if (edit === false){
    try {
        await api.post('/add-categorie', {name: categorie});
        setOpenDialog(true);
        setCategorie("");
        const response = await api.get('/list-categories');
        setCategories(response.data);
    } catch (error) {
        
    }
} else{
    try{
        
        await api.put(`/edit-categorie/${id}`, {name: categorie, id: id });
        setCategorie('');
        setEdit(false);
        setOpenDialog(true);
        const response = await api.get('/list-categories');
        setCategories(response.data);
        
    }catch(error){

    }
}
  }
  


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItems = categories.slice(startIndex, endIndex);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  

  useEffect(() => {
    async function loadProfiles() {
     try{
        const response = await api.get('/list-categories');
      setCategories(response.data);
     }catch(error){
        setCategories([]);
     }   
      
    }
    loadProfiles();
  }, [])

  return (
  
  <Box  sx={{
    height: "100vh",
    width: "100vw",
    display: "flex",
    backgroundColor: "#FCFCFC"
}}>
   
 

  <Box
    sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FCFCFC"
      }}>

<Box><TopBar/></Box>
    <Box
                    sx={{
                        boxSizing: "border-box",
                        pl: "40px",
                        pr: "40px",
                      
                        
                    }}>
                    <Typography variant="h4" sx={{ mt: "50px", mb: "20px" }}>
                      Configuraçoes de Categorias
                      </Typography>

                    </Box>
                    <Grid container
          justifyContent="center"
          alignItems="center"
          >
                    <form>
      <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
      <TextField
        label="Nova Categoria"
        variant="outlined"
        value={categorie}
        onChange={(event) => setCategorie(event.target.value)} 
        sx={{ width: '300px' }}
      />
      </Grid>
      <Grid item>
      <Button type="button" variant="contained" style={{backgroundColor: "black"}} onClick={handleData}>
      {edit ? 'Editar' : 'Adicionar'}
      </Button>
      </Grid>
      </Grid>
    </form>
                    </Grid>

                    <Grid container
          justifyContent="center"
          alignItems="center"
         >
                  
      
    </Grid>
    <Grid container
    direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{padding: "40px"}}>
 <TableContainer sx= {{width: "600px"}}>         
<Table>
  <TableHead>
    <TableRow>
      <TableCell sx= {{width: "300px"}}>Categorias</TableCell>
      <TableCell sx= {{width: "300px"}}>Ações</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    
    {currentItems.map((data) => (
      <TableRow key={data.id}>
        <TableCell>{data.name}</TableCell>
        <TableCell>
        <Button sx = {{color: 'black'}} onClick={() => handleEdit(data)}>
            <EditIcon /> Editar

          </Button>
          <Button sx = {{color: 'black'}} onClick={() => handleDelete(data.id)}>
            <DeleteIcon /> Excluir
          </Button>
          
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer> 
<Pagination
        count={Math.ceil(categories.length / itensPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
</Grid>
  </Box>
  
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle>Operação realizada com sucesso!</DialogTitle>
        <DialogContent>
          <p>Operação realizada com sucesso!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

  </Box>
  )};

export default Categories;
