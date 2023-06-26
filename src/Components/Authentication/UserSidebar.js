import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import useCryptoContext from '../../Context/CryptoContext';
import { Avatar } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import {auth, db} from '../../firebase'
import { CoinList } from '../../Config/api';
import { UseGetCointData } from '../../Hooks/GetCoinsByProperty';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { numberWithComma } from '../Banner/Carausal';


const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
    },
    picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      backgroundColor: "#EEBC1D",
      objectFit: "contain",
    },
    watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      borderRadius: 10,
      padding: 15,
      paddingTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
    },
    coin: {
      padding: 10,
      borderRadius: 5,
      color: "black",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#EEBC1D",
      boxShadow: "0 0 3px black",
    },
    
});

export default function UserSidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {user,setAlert,watchList,currency,symbol} = useCryptoContext()
  const {data:coins}= UseGetCointData(CoinList(currency),['trending-coin',currency])

  const removeFromWatchlist = async (coin) => {
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
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    setOpen(false);
  };

  return (
    <div>      
      <React.Fragment>
        <Avatar 
          onClick={()=>setOpen(true)}
          style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
          src={user.photoURL}
          alt={user.displayName || user.email}  
      />
        <Drawer  anchor="right" open={open} onClose={()=>setOpen(false)}>
          <div  className={classes.container}>
              <div className={classes.profile}>
                  <Avatar
                      className={classes.picture}
                      src={user.photoURL}
                      alt={user.displayName || user.email}
                  />
                  <span
                      style={{
                          width: "100%",
                          fontSize: 20,
                          textAlign: "center",
                          fontWeight: "bolder",
                          wordWrap: "break-word",
                      }}
                  >
                      {user.displayName || user.email}
                  </span>
                  {coins?.map(coin=>{
                    if(watchList.includes(coin.id))
                      return (
                      <div className={classes.coin}>
                        <span>{coin.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          {symbol}{" "}
                          {numberWithComma(coin.current_price.toFixed(2))}
                          <AiFillDelete
                            style={{ cursor: "pointer" }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </div>
                    )
                    else return <></>;
                  })}
              </div>
              <Button
                  variant="contained"
                  className={classes.logout}
                  onClick={logOut}
              >
              Log Out
            </Button>
          </div>
        </Drawer>
      </React.Fragment>     
    </div>
  );
}
