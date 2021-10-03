import { useState, useRef } from "react";
import PropsType from "./types";
import { currencyFormat, escapeRegExp } from "./utils";
import { TextField, InputAdornment, Tooltip, IconButton, Popover, Box } from "@material-ui/core";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Numpad from "components/presentational/Numpad";

const CurrencyInput = ({ value = "", onChange, ...rest }: PropsType) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const containerRef = useRef(null);

  const openNumpad = () => setAnchorEl(containerRef.current);
  const closeNumpad = () => setAnchorEl(null);

  const handleChange = (v: string) => {
    const str = escapeRegExp(v);
    const regex = /^$|^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    regex.test(str) && onChange && onChange(str);
  };

  const isNumpadOpen = Boolean(anchorEl);
  const popperId = isNumpadOpen ? "numpad-popper" : undefined;
  return (
    <Box ref={containerRef} width="100%">
      <TextField
        value={currencyFormat(value)}
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Нумпад">
                <IconButton onClick={openNumpad} aria-describedby={popperId}>
                  <KeyboardIcon color={isNumpadOpen ? "primary" : "inherit"} />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        label="Введите нужную сумму"
        fullWidth
        {...rest}
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
    </Box>
  );
};

export default CurrencyInput;
