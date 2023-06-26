import React from 'react'
import { UseGetCointData } from '../Hooks/GetCoinsByProperty'
import { SingleCoin } from '../Config/api'
import { Button, LinearProgress, Typography, makeStyles } from '@material-ui/core'
import CoinInfo from '../Components/CoinInfo'
import useCryptoContext from '../Context/CryptoContext'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { numberWithComma } from '../Components/Banner/Carausal'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'


const useStyles = makeStyles((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]:{
        flexDirection:"column",
        alignItems:"center",
      },
    },
    sidebar:{
      width:"30%",
      [theme.breakpoints.down("md")]:{
          width:"100%",
      },
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      marginTop:25,
      borderRight:"2px solid grey"
    },
    heading:{
      fontWeight:"bold",
      marginBottom:20,
      fontFamily:"Montserrat",
      marginLeft:"40px"
    },
    description:{
      width:"100%",
      fontFamily:"Montserrat",
      padding:25,
      paddingBottom:15,
      paddingTop:0,
      textAlign:'justify'
     },
     marketData:{
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
     }
    
}))

function Coins() {
  const {currency,symbol,setAlert,user,watchList} = useCryptoContext()
  const {id}= useParams() 
  const classes= useStyles()
  const {data:coin,isLoading,isError} = UseGetCointData(SingleCoin(id),["single-coin",id])

  const inWatchlist = watchList.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchList ? [...watchList, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchList.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (isLoading) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{marginBottom:20}}
          />
          <Typography variant='h3' className={classes.heading} >
            {coin?.name}
          </Typography>
          <Typography variant='subtitle1' className={classes.description}>
           {ReactHtmlParser(coin?.description.en.split(". ")[0])} .
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithComma(coin?.market_cap_rank,currency)}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithComma(
                  coin?.market_data.current_price[currency.toLowerCase()],
                  currency)
                }
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithComma(Number(coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0,-6)),
                  currency
                  )}
                M
              </Typography>
            </span>
            {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
          </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default Coins