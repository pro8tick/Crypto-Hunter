import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useState ,useEffect} from 'react'
import { auth, db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Crypto = createContext()

export function CryptoContext({children}) {
    const [currency,setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [user, setUser] = useState(null)
    const [watchList, setWatchList] = useState([])

    const [alert, setAlert] = useState({
      open: false,
      message: "",
      type: "",
    });

    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            setWatchList(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);
    
    useEffect(() => {
      onAuthStateChanged(auth,(user)=>{
        !!user? setUser(user):setUser(null)
      })     
    }, [])
    
    useEffect(() => {
      if(currency==='INR') setSymbol('₹')
      else setSymbol('$')
     
    }, [currency])
    
  return (
    <Crypto.Provider 
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        user,
        setUser,
        setAlert,
        watchList,
        setWatchList
      }}
    >
        {children}
    </Crypto.Provider>
    )
  
}



export default function useCryptoContext() {
    return useContext(Crypto)
}