import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectButton: {
    border: "1px solid #0D71FB",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    width: "21%",
    "&:hover": {
        backgroundColor: "#0D71FB",
        color: "black",
    },
  }
});

const SelectButton = ({ children, selected, onClick }) => {

    const classes = useStyles(false);

    const buttonStyles = {
        backgroundColor: "#0D71FB",
        color: "black",
        fontWeight: 700
    }
    
    return (
        <span onClick={onClick} className={classes.selectButton} style={selected ? buttonStyles : null}>
            {children}
        </span>
    );
};

export default SelectButton;