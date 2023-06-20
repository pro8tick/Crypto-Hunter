import React,{useState} from 'react'
import useCryptoContext from '../Context/CryptoContext'
import { UseGetCointData } from '../Hooks/GetCoinsByProperty'
import { CoinList } from '../Config/api'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { numberWithComma } from './Banner/Carausal'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },

  });

function Coinstable() {
    const {currency,symbol} = useCryptoContext()
    const [page, setPage] = useState(1)
    const {isLoading,data:coins}= UseGetCointData(CoinList(currency),['trending-coin',currency])
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const classes = useStyles()

    const darKTheme = createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })

    const handleSearch =()=>{

        return coins?.filter((coin)=>            
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }
    
  return (
    <ThemeProvider theme={darKTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography
                variant='h4'
                style={{
                    marginBottom:15,
                    fontFamily: "Montserrat"
                }}
            >
                Crypto Currency prices by MArket Cap.
            </Typography>
            <TextField 
                variant='outlined' 
                label='Search for a crypto currency...' 
                style={{marginBottom:20, width:"100%"}}
                onChange={e=>setSearch(e.target.value.toLowerCase())}
            />

            <TableContainer>
                {isLoading?(
                    <LinearProgress style={{backgroundColor:"gold"}}/>):
                    (<Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                    style={{
                                        color: "black",
                                        fontWeight: "700",
                                        fontFamily: "Montserrat",
                                    }}
                                    key={head}
                                    align={head === "Coin" ? "center" : "right"}
                                >
                                    {head}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                                .slice((page-1)*10,(page-1)*10+10)
                                .map((row)=>{
                                     let profit= row.price_change_percentage_24h>0
                                
                                    return (
                                    <TableRow
                                        onClick={()=>navigate(`/coins/${row.id}`)}
                                        className={classes.row}
                                        key={row.name}
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            style={{
                                                display:"flex",
                                                gap:15,                                               
                                                
                                            }}
                                        >
                                           <img
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                                style={{marginBottom: 10}}
                                            />
                                            <div
                                                style={{
                                                    display:"flex",
                                                    flexDirection:"column"
                                                }}
                                            >
                                                <span 
                                                    style={{
                                                        textTransform:"uppercase",
                                                        fontSize:22
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{color:"darkgray"}}>
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>
                                            {symbol}{" "}
                                            {numberWithComma(row.current_price.toFixed(2),currency)}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithComma(
                                                row.market_cap.toString().slice(0, -6),currency
                                            )}
                                            M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination
                count={Number((handleSearch()?.length/10).toFixed(0))}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>   
    </ThemeProvider>
  )
}

export default Coinstable