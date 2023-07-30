import axios from "axios";
import { useState, useEffect } from "react";
import { CoinList } from "../config/api";
import { ThemeProvider, createTheme, Container, Typography, TextField, TableContainer, TableCell, LinearProgress, Table, TableHead, TableRow, TableBody, makeStyles} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import Pagination from "@material-ui/lab/Pagination";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
        margin: '10px',
        "@media (max-width: 540px)" : {
            margin: -2,
        }, 
        width: '15px'
      },
    },
});

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const { currency, symbol } = CryptoState();

    
    const classes = useStyles();
    
    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark"
        }
    })

    const filterSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        )
    }

    return (
        <ThemeProvider theme={darkTheme}> 
            <Container style={{ textAlign: "center" }}>
                <Typography
                variant="h4"
                style={{ margin: 10, fontFamily: 'Montserrat' }}>
                    Cryptocurrency Prices
                </Typography>

                <TextField 
                label="Search for a Crypto Currency..."
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 20, width: "100%" }}></TextField>


                <TableContainer>
                    { loading ? (
                            <LinearProgress/>
                        ) : (
                            <Table>
                                <TableHead style={{backgroundColor: "#0D71FB"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat"
                                            }}
                                            key = {head}
                                            align={head === "Coin" ? "left" : "right"}
                                            >{head}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {filterSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                            onClick = {() => navigate(`/react_crypto_app/coins/${row.id}`)}
                                            className = {classes.row}
                                            key = {row.name}
                                            >
                                                <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                  display: "flex",
                                                  gap: 15,
                                                }}>
                                                    <img
                                                        src={row.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{marginBottom: 10}}
                                                    />

                                                    <div
                                                    style={{display: "flex", flexDirection: "column"}}>
                                                        <span style={{textTransform: "uppercase", fontSize: 22}}>{row?.symbol}</span>
                                                        <span style={{color: "darkgray"}}>{row.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
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
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
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
                // count={(filterSearch()?.length / 10).toFixed(0)}
                className={classes.pagination}
                count = {10}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "#EEBC1D"
                }}
                boundaryCount={1} 
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
                />
            </Container>
        </ThemeProvider>
    )
}
 
export default CoinsTable;