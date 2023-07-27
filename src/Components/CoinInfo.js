import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { GraphicData } from "../config/api";
import { CircularProgress, ThemeProvider, makeStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core"
import { Line } from "react-chartjs-2";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



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
    const [ interval, setInterval ] = useState(2);
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


    const chartData = {
        labels: graphicData?.map((coin) => {
            const date = new Date(coin[0]);
            const time = date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return interval === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
            {
                data: graphicData?.map((coin) => coin[1]),
                label: `Price ( Past ${interval} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
            },
        ],
    };


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
                
                    </>
                )}
            </div>
        </ThemeProvider>

    );
}
 
export default CoinInfo;