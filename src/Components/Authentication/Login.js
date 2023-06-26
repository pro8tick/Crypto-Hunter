import { Box, Button, CircularProgress, TextField } from '@material-ui/core'
import React,{useState} from 'react'
import useCryptoContext from '../../Context/CryptoContext';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = ({handleClose}) => {
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    const {setAlert,setUser} = useCryptoContext();
    const [btnLoading,setBtnLoading] = useState(false)

    const handleSubmit =async ()=>{
        if (!email || !password) {
            setAlert({
              open: true,
              message: "Please fill all the Fields",
              type: "error",
            });
            return;
          }
      
        try {
            setBtnLoading(true)
            const result = await signInWithEmailAndPassword(auth, email, password);
            setAlert({
              open: true,
              message: `Sign Up Successful. Welcome ${result.user.email}`,
              type: "success",
            });
            setBtnLoading(false)
      
            handleClose();
        }catch (error) {
            setAlert({
            open: true,
            message: error.message,
            type: "error",
            });
            handleClose();
            return;
        }
    }
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
     
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        disabled={btnLoading}
      >
        {btnLoading ? <CircularProgress size={24}/> : "Login"}
      </Button>
    </Box>
  )
}

export default Login