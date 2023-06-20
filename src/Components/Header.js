import { AppBar, Container,MenuItem,Select,ThemeProvider,Toolbar,Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useCryptoContext from '../Context/CryptoContext'

const useStyle = makeStyles(()=>({
    title:{
        flex:1,
        color:"gold",
        fontFamily:"Montserrat",
        cursor:"pointer",
        fontWeight:"bold"
    }
}))

const darKTheme = createTheme({
    palette:{
        primary:{
            main:"#fff"
        },
        type:"dark"
    }
})


function Header() {
    const classes = useStyle()
    const navigate = useNavigate()
    const {currency,setCurrency} = useCryptoContext()

  return (
    <ThemeProvider theme={darKTheme}>
        <AppBar position='static' color='transparent'>
            <Container>
                <Toolbar>
                    <Typography className={classes.title} onClick={()=> navigate('/')} variant='h6'> Crypto Hunter </Typography>

                    <Select variant='outlined' 
                        style={{
                            width:100,
                            height:40,
                            marginRight:15
                        }}
                        value={currency}
                        onChange={(e)=>setCurrency(e.target.value)}
                    
                    >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="INR">INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header