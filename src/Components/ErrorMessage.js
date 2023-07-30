
import { Button, makeStyles } from "@material-ui/core";
import error_message from "../img/error_message.png";
import { useEffect } from "react";

const useStyles = makeStyles({
    container: {
        margin: "0 auto", 
        display: "flex", 
        justifyContent: "center", 
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20
    },
    error_img: {
        width: 283,
        height: 216,
        "@media (max-width: 460px)" : {
            width: 165,
            height: 126
        }, 
    }
});

const ErrorMessage = () => {
    
    const classes = useStyles();

    const windowReload = () => {
        window.location.reload();
    }
    
    return (
        <div className={classes.container}>
            <img 
            className={classes.error_img}
            src={error_message} 
            alt="error message"/>

            <Button 
            onClick = {windowReload}
            style={{ width: "50%" }}
            color="primary">Restart</Button>

        </div>
    );
}
 
export default ErrorMessage;    