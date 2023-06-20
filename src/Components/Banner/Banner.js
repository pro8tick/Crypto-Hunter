import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carausal from './Carausal'

const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner2.jpg)"
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:'column',
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagline:{
        display:"flex",
        height:"40%",
        justifyContent:"center",
        flexDirection:"column",
        textAlign:"center"
    }, 
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
      },
}))

function Banner() {
    const classes = useStyles()
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography 
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily: "Montserrat"
                }}
            >
                Crypto Hunter
            </Typography>
            <Typography 
                variant='subtitle2'
                style={{
                    color:"darkgray",
                    textTransform:"capitalize",
                    fontFamily: "Montserrat"
                }}
            >
                Get all  the info regarding your Crypo currency here.
            </Typography>
          </div>
          <Carausal/>
        </Container>
    </div>
    
  )
}

export default Banner