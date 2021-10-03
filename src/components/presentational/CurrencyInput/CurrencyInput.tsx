import { useState, useRef } from "react";
import IProps from "./types";
import { currencyFormat, escapeRegExp } from "./utils";
import { TextField, InputAdornment, IconButton, Popover, Box } from "@material-ui/core";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Numpad from "components/presentational/Numpad";

const CurrencyInput = ({ value = "", onChange }: IProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const containerRef = useRef(null);

  const openNumpad = () => setAnchorEl(containerRef.current);
  const closeNumpad = () => setAnchorEl(null);

  const handleChange = (v: string) => {
    const str = escapeRegExp(v);
    const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    regex.test(str) && onChange && onChange(str);
  };

  const isNumpadOpen = Boolean(anchorEl);
  const popperId = isNumpadOpen ? "numpad-popper" : undefined;
  return (
    <div ref={containerRef}>
      <TextField
        value={currencyFormat(value)}
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={openNumpad} aria-describedby={popperId}>
                <KeyboardIcon color={isNumpadOpen ? "primary" : "inherit"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Введите нужную сумму"
        fullWidth
      />
      <Popover
        id={popperId}
        open={isNumpadOpen}
        anchorEl={anchorEl}
        onClose={closeNumpad}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        PaperProps={{
          elevation: 0,
        }}
      >
        <Box mt={1}>
          <Numpad value={value} onChange={handleChange} />
        </Box>
      </Popover>
    </div>
  );
};

export default CurrencyInput;