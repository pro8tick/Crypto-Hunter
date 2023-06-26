import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css'
import Header from './Components/Header';
import Home from './Pages/Home';
import Coins from './Pages/Coins';
import { makeStyles } from '@material-ui/core';


import Alert  from './Components/Alert'



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
            <Routes>
              <Route path ='/' element={<Home/>}/>
              <Route path ='/coins/:id' element={<Coins/>}/>
            </Routes>      
        </div>
        <Alert/>
      </BrowserRouter>      
  
    </>
   
  );
}

export default App;
