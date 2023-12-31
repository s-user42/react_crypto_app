import { makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

import AliceCarousel from "react-alice-carousel";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center'
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }
}));


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTerending] = useState([]);
    const [error, setError] = useState(false);

    const classes = useStyles();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTerending(data);
            setError(false)
        } catch (error) {
            setError(true);
            if (error.response) {
                console.error('Ошибка от сервера:', error.response.data);
            } else if (error.request) {
                console.error('Нет ответа от сервера:', error.request);
            } else {
                console.error('Ошибка:', error.message);
            }
        }
    };

    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])

    
    const items = trending.map((coin => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link
            className={classes.carouselItem}
            to={`/react_crypto_app/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom: 10}} />
                <span> 
                    {coin?.symbol} &nbsp;
                    <span
                    style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500
                    }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>

                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    }));

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }
    
    if (error) return <ErrorMessage />;

    return (
        <div className = {classes.carousel}>

            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive = {responsive}
                autoPlay
                items = {items}
            />

        </div>
    );
}
 
export default Carousel;