import React, { createContext, useContext, useState ,useEffect} from 'react'

const Crypto = createContext()

export function CryptoContext({children}) {
    const [currency,setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
  
    useEffect(() => {
      if(currency==='INR') setSymbol('₹')
      else setSymbol('$')
     
    }, [currency])
    
  return (
    <Crypto.Provider value={{currency,setCurrency,symbol}}>
        {children}
    </Crypto.Provider>
    )
  
}



export default function useCryptoContext() {
    return useContext(Crypto)
}