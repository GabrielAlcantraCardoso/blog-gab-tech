
import { Box, Grid, Typography, TextField, Button, Select, MenuItem, InputLabel} from "@mui/material";
import imgBackground from "../../img/img_background_5.jpg";

const Header = () => {
  return (
  <Box sx={{padding: "20px 40px 20px 40px "}}>
   <Box sx={{ 
   height: "300px", 
   backgroundColor: "black",
   backgroundImage: `url(${imgBackground})`,
   backgroundSize: "cover",
   backgroundPosition: "center",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   borderRadius: "10px",
  
   
   }}>
  <Typography variant="h2">BLOG GAB TECH</Typography>
   </Box>
   </Box>
  );
}
export default Header;