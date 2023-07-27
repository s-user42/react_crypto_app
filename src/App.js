import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';

import './App.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    App: {
        backgroundColor: "#14161a",
        color: 'white',
        minHeight: '100vh'
    }
}));

function App() {

    const classes = useStyles()


    return (
        <BrowserRouter>
            <div className={classes.App}>

                <Header />

                <Routes>

                    <Route path='/' Component={Homepage} />
                    <Route path='/coins/:id' Component={CoinPage} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
