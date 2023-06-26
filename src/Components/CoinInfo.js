import React ,{useState} from 'react'
import useCryptoContext from '../Context/CryptoContext'
import { UseGetCointData } from '../Hooks/GetCoinsByProperty'
import { HistoricalChart } from '../Config/api'
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core'
import { Line } from 'react-chartjs-2'
import { chartDays } from "../Config/data";
import SelectButton from "./SelectButton";

const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

function CoinInfo({coin}) {
    const {currency} = useCryptoContext()
    const [days, setDays] = useState(1)
    const classes = useStyles()

    const {data:historicData, isFetching} = UseGetCointData(HistoricalChart(coin.id,days,currency),["historic-data",days,coin.id,currency])

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });


  
  return (
   <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
            {!historicData || isFetching ? (
            <CircularProgress
                style={{ color: "gold" }}
                size={250}
                thickness={1}
            />
            ) :
            (<>
            <Line
                data={{
                    labels: historicData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                        date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                        {
                        data: historicData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                        },
                    ],
                }}
                options={{
                    elements: {
                    point: {
                        radius: 1,
                    },
                    },
                }}
                />
                <div 
                    style={{
                        display:"flex",
                        marginTop:20,
                        justifyContent:"space-around",
                        width:"100%",
                    }}>
                    {chartDays.map((day)=>(
                         <SelectButton
                            key={day.value}
                            onClick={() => {setDays(day.value);                           
                         }}
                         selected={day.value === days}
                       >
                         {day.label}
                       </SelectButton>
                    ))}
                </div>
            </>)
            }
        </div>
   </ThemeProvider>
  )
}

export default React.memo(CoinInfo)
