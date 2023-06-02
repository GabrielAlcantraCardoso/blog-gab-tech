import { Link } from "react-router-dom";
import { Box, Grid, Typography, TextField, Button, Select, MenuItem, InputLabel} from "@mui/material";
const Post = ({img, category, title, date, text, id }) => {
  const maxText = 30;
  return (
    
   <Box sx={{width: "400px", 
   height: "500px",
    display: "flex",
    justifyContent: "center", 
    mr: "40px",
    mb: "20px"}}>

<Grid container direction="column" alignItems="center" sx={{ width: 'fit-content' }}>
  <Grid item>
  <Box sx={{width: "400px", 
  height: "250px", 
  backgroundColor: "white", 
  mb: "0px", 
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "10px"}}> </Box>
  </Grid>
  <Grid item>
  <Box sx={{width:"400px", height: "fit-content", wordWrap: "break-word"}}>
  <Typography sx={{mb: "20px", color: "gray"}}>{category}</Typography>
  </Box>
  
  </Grid>
  <Grid item>
    <Box sx={{width:"400px", height: "fit-content", wordWrap: "break-word"}}>
      <Link to={`/post/${id}`}>
  <Typography variant= "h5" sx={{mb: "20px"}}>{title}</Typography>
  </Link>
  </Box>
  </Grid>
  <Grid item>
  <Box sx={{width:"400px", height: "fit-content", wordWrap: "break-word"}}>
  <Typography sx={{mb: "20px", color: "gray"}} >{date}</Typography>
  </Box>
   
    </Grid>
  <Grid item>
  <Box sx={{width:"400px", height: "fit-content", wordWrap: "break-word"}}>
  <Typography  sx={{color: "gray"}}>{text.slice(0, maxText) + ' ...'}</Typography>
  </Box>

  </Grid>
  </Grid>
     
    
   
   </Box>
  );
}

export default Post;