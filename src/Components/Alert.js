import React from 'react'
import useCryptoContext from '../Context/CryptoContext'
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from '@material-ui/core'

const Alert = () => {
    const {alert,setAlert} = useCryptoContext()

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }    
        setAlert({ open: false });
      };

    return (
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <MuiAlert
            onClose={handleCloseAlert}
            elevation={10}
            variant="filled"
            severity={alert.type}
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      );
};


export default Alert