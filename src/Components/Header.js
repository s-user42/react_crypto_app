import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";

import React from "react";

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: '#0D71FB',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
        variant: 'h6'
    }
}))

const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const {currency, setCurrency } = CryptoState();

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setCurrency(selectedCurrency);
    };

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
                color: "#fff"
            },
            type: "dark"
        }
    })

    return ( 
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container> 
                <Toolbar>
                    <Typography onClick={() => navigate("/react_crypto_app")} className={classes.title}>Crypto Hunter</Typography>

                    <Select 
                    value={currency}
                    onChange={handleCurrencyChange}
                    variant="outlined" 
                    style={{
                        width: 100, 
                        height: 40,
                        marginRight: 15
                    }}>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                    </Select>

                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
}
 
export default Header;