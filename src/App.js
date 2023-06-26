import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css'
import Header from './Components/Header';
import { makeStyles } from '@material-ui/core';
import Alert  from './Components/Alert'
import { lazy,Suspense } from 'react';

const Home = lazy(() => import("./Pages/Home"));
const Coins = lazy(() => import("./Pages/Coins"));


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
        
      <BrowserRouter>
        <div className={classes.App}>                    
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                  <Route path ='/' element={<Home/>}/>
                  <Route path ='/coins/:id' element={<Coins/>}/>
              </Routes>      
            </Suspense>
        </div>
        <Alert/>
      </BrowserRouter>      
  
    </>
   
  );
}

export default App;
