import { makeStyles } from '@material-ui/core'
import React from 'react'
import useCryptoContext from '../../Context/CryptoContext'
import {TrendingCoins} from '../../Config/api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { UseGetCointData } from '../../Hooks/GetCoinsByProperty'

const useStyle = makeStyles(()=>({
    carausel:{
        height:"50%",
        display: "flex",
        alignContent:"center"

    },
    carauselItem:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      cursor:"pointer",
      color:"white",
      textTransform:"upperCase"
    }
}))


export const numberWithComma =(price,currency)=>{
  const stringType = currency==='INR'?'en-IN':'en-US'
  return price.toLocaleString(stringType)
}

function Carausal() {
    const classes= useStyle()
    const {currency,symbol} = useCryptoContext()
    const {isLoading,data:trending,isError} = UseGetCointData(TrendingCoins(currency),['crypto-coin',currency])

   
    if (isLoading) {
      return <h2>Loading...</h2>
    }
    if(isError){
      return <p>Error occured</p>
    }
    const items= trending?.map((coin)=>{
      let profit= coin.price_change_percentage_24h>0
      return (
        <Link className={classes.carauselItem} to={`/coins/${coin.id}`}>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{
              marginBottom:10
            }}
          />
          <span>
            {coin?.symbol}
            &nbsp;
            <span style={{
              color:profit?"rgb(14,203,129)":"red",
              fontWeight:500
            }}>
              {profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
            </span>
            <span style={{
              fontWeight:500,
              fontSize:22
            }}>
              {symbol}{numberWithComma(coin?.current_price,currency)}
            </span>
          
        </Link>
      )
    })

    // useEffect(() => {
    //   fetchTrendingCoins()         
    // }, [currency])
    
    const responsive = {
      0:{
        items:2
      },
      512:{
        items:4
      }
    }

  return (
    <div className={classes.carausel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carausal