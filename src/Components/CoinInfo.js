import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { GraphicData } from "../config/api";
import { CircularProgress, ThemeProvider, makeStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core"
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
];



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


const CoinInfo = ({ coin }) => {
    const [ graphicData, setGraphicData ] = useState();
    const [ interval, setInterval ] = useState(1);
    const [ loaded, setLoaded ] = useState(true);

    const { currency } = CryptoState();

    const classes = useStyles();

    const fetchGrarphicData = async() => {
        setLoaded(true);
        const { data } = await axios.get(GraphicData(coin.id, interval, "EUR"));
        setGraphicData(data.prices);

        setLoaded(false);
    }

    useEffect(() => {
        fetchGrarphicData();
    }, [ interval ])


    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
    });




    return (
        <ThemeProvider theme = {darkTheme}>
            <div className={ classes.container }>
                {loaded ? (
                    <CircularProgress
                    size={250} thinkness={1}/>
                ): (
                    <>
                        <Line
                            data={{
                                labels: graphicData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                                return interval === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: graphicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${interval} Days ) in ${currency}`,
                                        borderColor: "#0D71FB",
                                        borderWidth: 2,
                                        backgroundColor: "#0D71FB"
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 0,
                                    },
                                },
                            }}
                        />
                        <div
                        style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%"
                          }}>
                            {chartDays.map(day => (
                                <SelectButton
                                key={day.value}
                                onClick={() => setInterval(day.value)}
                                selected={ day.value === interval }
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                
                    </>
                )}
            </div>
        </ThemeProvider>

    );
}
 
export default CoinInfo;