import React, { useState, useContext, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Box, Grid, Button, TextField, Typography } from "@mui/material";
import api from "../../services/api";
import imgBackground from "../../img/img_background_2.jpeg";
import { useParams , Navigate } from 'react-router-dom';
import moment from 'moment';
const SinglePost = () => {

  const [img, setImg] = useState(false);
  const [thumbImg, setThumbImg] = useState("");
  const [textImg, setTextImg] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState('');
  const [name, setName] = useState("");
  const { id } = useParams();
  const [visibility, setVisibility] = useState(false);
 

  const handleEdit = () => {
    const postId = id 
   const newUrl = `/edit-post/${postId}`;
   window.location.href = newUrl; 
     
  }
  const handleDelete = async () => {
    try {
      await api.delete(`/delete-post/${id}`);
      window.location.href = "/"
      
    } catch (error) {
        console.log(error)
    }
  }
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

   
  useEffect(() => {
    
    async function loadPostData() {
     try{
      const response = await api.get(`/post/${id}`);
      
      console.log("")

      const data = response.data;
      console.log("dados do post:", data)
      if(data){
        console.log("dados do titulo:", data.post.title)
        setTitle(data.post.title);
        setText(data.post.text);
        const formattedDate = moment(data.post.date).format('DD-MM-YYYY');

        setDate(formattedDate);
        
      }
      if(data.post.id_user){
        console.log("entrou aqui")
        const idUser = data.post.id_user

        const result = await api.get(`/user/${idUser}`)

       setName(result.data.name)
      }
      if (data.post.thumb_img) {
        const byteaData = data.post.thumb_img;
      

        const imageUrl = `data:image/jpeg;base64,${byteaData}`;
      

        setThumbImg(imageUrl)
      

      }
      if (data.post.text_img) {
        setImg(true);
        const byteaData = data.post.text_img;

        const imageUrl = `data:image/jpeg;base64,${byteaData}`;
      
        setTextImg(imageUrl)
      

      }
     }catch(error){
      setTitle("");
      setText("");
      setDate("");
     }  }
     const loadUserData = async () => {
      try {

      } catch (error) {
        console.error('Erro ao buscar itens do banco de dados:', error);
      }
    }; 
    loadCheckToken();
    loadPostData();
    loadUserData();
  }, [])

  return (
    <Box sx={{
      width: "65vw",
      display: "flex",
      ml: "40px",
    mr: "40px"}}
      >

<Grid container direction="column">
  <Grid item>
  <Box sx={{
      height: "250px",
      width: "100%",
      backgroundImage: `url(${thumbImg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      borderRadius: "20px"
      
      }}>
       
</Box> 
{visibility ? (
  <>
    <Button
      type="submit"
      variant="contained"
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        marginRight: "20px",
        marginBottom: "20px"
      }}
      onClick={handleDelete}
    >
      APAGAR
    </Button>
    <Button
      type="submit"
      variant="contained"
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        marginBottom: "20px"
      }}
      onClick={handleEdit}
    >
      EDITAR
    </Button>
  </>
) : null }



{console.log("titulo", title)}



  </Grid>
  <Grid item>
    <Typography variant="h5" sx={{mt: "20px"}}> {title}</Typography>
  </Grid>
  <Grid item>
  <Grid container direction="row" >
    <Grid item sx={{ marginRight: "auto" }}><Typography sx={{mt: "20px", color: "gray"}}> Autor: {name}</Typography></Grid>
    <Grid item><Typography  sx={{mt: "20px", marginLeft: "auto" , color: "gray"}}> {date}</Typography></Grid>
    </Grid>
  </Grid>
  { img ? (
  <Grid item sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",}}>
  <Box
  sx={{
    height: "350px",
    width: "350px",
    backgroundImage: `url(${textImg})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "20px",
    mt: "20px"
    
  }}
>

</Box>
  </Grid>) : null  }
  
  <Grid item>
    <Box sx={{mt: "20px", width: "100%"}}>
      <Typography sx={{ wordWrap: "break-word", textAlign: "left" }}>{text}</Typography>
    </Box>
  </Grid>
  
</Grid>

    </Box>
  );
}
export default SinglePost;
