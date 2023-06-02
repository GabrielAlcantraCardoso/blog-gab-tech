import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button, Select, MenuItem, InputLabel} from "@mui/material";
import Topbar from "../../components/topBar/Topbar";
import api from "../../services/api";
import moment from 'moment';



const WritePost = () => {
  const [thumbImg, setThumbImg] = useState("");
  const [selectedThumbImg, setSelectedThumbImg] = useState("");
  const [textImg, setTextImg] = useState("");
  const [selectedTextImg, setSelectedTextImg] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [date, setDate] = useState('');
  


  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await await api.get('/list-categories');

      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens do banco de dados:', error);
    }
  };
const currentDate = moment().format('YYYY-MM-DD');

setDate(currentDate);

  fetchData();
}, []);

const handleChange = (event) => {
  setSelectedItem(event.target.value);
};


const handleAdd = async () => {
try{
  const response = await api.post('/add-post', {
    title: title,
    text: text,
    date: date,
    thumb_img: thumbImg,
    text_img: textImg,
    categories: categories,
    id_categories: selectedItem
  });
   const postId = response.data.postId;
   const newUrl = `/post/${postId}`;
   window.location.href = newUrl;
}catch(error){

}
}
  const handleThumbImgUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];

      setThumbImg(base64Image);
      setSelectedThumbImg(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTextImgUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];

      setTextImg(base64Image);
      setSelectedTextImg(reader.result);
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
        <Box><Topbar/></Box>
        
      
        <Box><Typography  variant="h4" sx={{ mt: "50px", mb: "50px" }}>Nova Publicaçao</Typography></Box>
        <Box sx={{padding: "20px"}}>
        <Grid container
            direction="row"
            spacing={5}
            sx={{ width: "fit-content" }}>
              <Grid item>
              <Grid container direction={"column"} spacing={2}>
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
                    
                    {selectedThumbImg ? (
                      
                  <img
                  src={selectedThumbImg}
                    
                    alt="Profile Picture"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <Typography variant="body2">Foto de Divulgação</Typography>
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
                    Carregar Imagem
                    <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleThumbImgUpload}
                />
                  </Button>
                </Grid>
                <Grid item>
                <Box
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
                    
                    {selectedTextImg ? (
                      
                  <img
                  src={selectedTextImg}
                    
                    alt="Text Img"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <Typography variant="body2">Imagem de Informação</Typography>
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
                    Carregar Imagem
                    <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleTextImgUpload}
                />
                  </Button>
                </Grid>
                </Grid>
              </Grid>
              <Grid item>
              <Grid container direction={"column"} spacing={5}>
                <Grid item>
                <TextField
                    label="Titulo:"
                    variant="outlined"
                    //disabled="disabled"
                   value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    sx={{ width: "60vw" }}
                  />
                </Grid>
                <Grid item><TextField
                   id="multiline-textfield"
                   label="Texto:"
                   multiline
                   rows={15}
                    variant="outlined"
                    //disabled="disabled"
                   value={text}
                  onChange={(event) => setText(event.target.value)}
                    sx={{ width: "60vw" }}
                  /></Grid>
              </Grid>
              </Grid>
              <Grid item>
              <Grid container direction="column" spacing={3}>
              <Grid item>
              <Select value={selectedItem} onChange={handleChange} sx={{minWidth: "200px", maxWidth: "220px"}} displayEmpty inputProps={{ placeholder: 'Selecionar Categoria' }}>
              <MenuItem value="" disabled>
        Selecionar Categoria
      </MenuItem>
      {categories.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
              </Grid>
              <Grid item>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }} onClick={handleAdd}
              >
                Publicar
              </Button>
              </Grid>
                
              </Grid>
             
              </Grid>
              
              </Grid>
        </Box>
        </Box>
    </Box>
  );
}
export default WritePost;
