import Post from "../post/Post";
import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button, Select, MenuItem, InputLabel} from "@mui/material";
import api from "../../services/api";
import moment from 'moment';
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [thumbImg, setThumbImg] = useState("");



  useEffect(() => {
    const loadPostsData =  async () => {
     try{
      const response = await api.get('list-posts');
      console.log("")

      console.log("dados do post:", response.data)
      setPosts(response.data.posts);
      console.log("posts informacoes",posts)

     }catch(error){
      setPosts([]);
     }  }
   
      
    
    loadPostsData();
  }, [])



  return (
    <Box sx={{width: "70vw", 
    minHeight: "100vh", 
    height: "fit-content", 
    ml: "40px",
    display: "flex",
    flexWrap: "wrap"}}>
         
       {Array.isArray(posts) && posts.map((post) => (
      <Post
        img={`data:image/jpeg;base64,${post.thumb_img}`}
        text={post.text}
        category={post.categories[0]}
        date={moment(post.date).format('DD-MM-YYYY')}
        id={post.id}

       
        title={post.title}
      />
    ))}

    </Box>
  );
}
export default Posts;
