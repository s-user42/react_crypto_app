import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from "html-react-parser";

import { numberWithCommas } from "../Components/CoinsTable";
import CoinInfo from "../Components/CoinInfo";

import { SingleCoin } from "../config/api";
import axios from "axios";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down("md")]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    sidebar: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: '2px solid grey',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Montserrat'
    },
    coinDescription: {
        width: '100%',
        fontFamily: 'Montserrat',
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: 'justify'
    },
    coinPriceData: {
        alignSelf: 'start',
        padding: 25,
        paddingTop: 10,
        width: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'space-around'
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            alignItems: 'start'
        }
    }
}))

const CoinPage = () => {
    const { id } = useParams();
    const [ coin, setCoin ] = useState();
    const [ loaded, setLoaded ] = useState(true);

    const { currency, symbol } = CryptoState();

    const fetchCoin = async() => {
        setLoaded(true);
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);

        setLoaded(false);
    }

    useEffect(() => {
        fetchCoin();
    }, []);


    const classes = useStyles();

    if (loaded) return <LinearProgress></LinearProgress>
    return ( 
        <div className={classes.container}>

            <div className={classes.sidebar}>
                <img src={coin?.image.large} alt={coin?.name} height={200} style={{ marginBottom: 20 }} />
                <Typography variant="h3" className={ classes.title}>{ coin?.name }</Typography>
                <Typography variant="subtitle1" className={classes.coinDescription}>
                    { ReactHtmlParser(coin?.description.en.split('. ')[0]) }. {" "}
                    { ReactHtmlParser(coin?.description.en.split('. ')[1]) }.
                </Typography>

                <div className={classes.coinPriceData}>

                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5' className={ classes.title }>Rank:</Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
                            { coin?.market_cap_rank }
                        </Typography>
                    </span>

                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5' className={ classes.title }>Current Price:</Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
                            { symbol } { numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]) }
                        </Typography>
                    </span>

                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5' className={ classes.title }>Market Cap:</Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
                            { symbol } {' '}
                            { numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                                .toString()
                                .slice(0, -6)) 
                            }M
                        </Typography>
                    </span>

                </div>

            </div>

            <CoinInfo coin = {coin}/>

        </div>
    );
}
 
export default CoinPage;