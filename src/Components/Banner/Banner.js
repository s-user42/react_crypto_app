import { makeStyles, Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
    banner: {
      backgroundImage: "url(./banner1.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%" 
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
  }));

const Banner = () => {
    const classes = useStyles()
    return ( 
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>

                    <Typography
                    variant="h2"
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 15,
                        fontFamily: 'Montserrat'
                    }}> 
                        Crypto Currency
                    </Typography>

                    <Typography
                    variant="subtitle2"
                    style={{
                        color: 'darkgray',
                        textTransform: 'capitalize',
                        fontFamily: 'Montserrat'
                    }}> 
                        Get all info regarging your favorite Crypto Currency
                    </Typography>


                </div>
                
            
            <Carousel />
            </Container>
            

        </div>
    );
}
 
export default Banner;