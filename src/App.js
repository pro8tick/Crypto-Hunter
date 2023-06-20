import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css'
import Header from './Components/Header';
import Home from './Pages/Home';
import Coins from './Pages/Coins';
import { makeStyles } from '@material-ui/core';
import { CryptoContext } from './Context/CryptoContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  const useStyle = makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh"
    }
  }))

  const classes = useStyle();

  return (
    <>
    <QueryClientProvider client={queryClient}>      
      <BrowserRouter>
        <div className={classes.App}>
          <CryptoContext>            
            <Header/>
            <Routes>
              <Route path ='/' element={<Home/>}/>
              <Route path ='/coins/:id' element={<Coins/>}/>
            </Routes>
          </CryptoContext>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
    </>
   
  );
}

export default App;
