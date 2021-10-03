import PropsType from "./types";
import useStyles from "./styled";
import { Button } from "@material-ui/core";
import BackspaceIcon from "@material-ui/icons/Backspace";

const Numpad = ({ value = "", onChange }: PropsType) => {
  const classes = useStyles();

  const handleChange = (symbol: string) => onChange && onChange(value + symbol);
  const backspace = () => onChange && onChange(value.slice(0, -1));

  return (
    <div className={classes.container}>
      {new Array(9).fill(null).map((_, id) => (
        <Button
          key={id}
          className={classes.button}
          onClick={() => handleChange(String(id + 1))}
          variant="outlined"
        >
          {id + 1}
        </Button>
      ))}
      <Button className={classes.button} onClick={() => handleChange(".")} variant="outlined">
        .
      </Button>
      <Button className={classes.button} onClick={() => handleChange("0")} variant="outlined">
        0
      </Button>
      <Button className={classes.button} onClick={backspace} variant="outlined">
        <BackspaceIcon />
      </Button>
    </div>
  );
};

export default Numpad;
