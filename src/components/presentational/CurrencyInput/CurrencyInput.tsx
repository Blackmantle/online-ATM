import { useState, useRef, useEffect } from "react";
import PropsType from "./types";
import { checkCurrencyFormat } from "utils";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { TextField, InputAdornment, Tooltip, IconButton, Popover, Box } from "@material-ui/core";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Numpad from "components/presentational/Numpad";

const CurrencyInput = ({ value = "", onChange, ...rest }: PropsType) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.blur();
  }, []);

  const openNumpad = () => setAnchorEl(containerRef.current);
  const closeNumpad = () => setAnchorEl(null);

  const handleInputChange = ({ value: v }: NumberFormatValues) => onChange && onChange(v);
  const handleNumpadChange = (v: string) => checkCurrencyFormat(v) && onChange && onChange(v);

  const isNumpadOpen = Boolean(anchorEl);
  const popperId = isNumpadOpen ? "numpad-popper" : undefined;
  return (
    <Box ref={containerRef} width="100%">
      <NumberFormat
        inputRef={inputRef}
        value={value}
        onValueChange={handleInputChange}
        customInput={TextField}
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
        label="Введите нужную сумму (₽)"
        decimalScale={2}
        allowNegative={false}
        thousandSeparator
        isNumericString
        fullWidth
        {...rest}
      />
      <Popover
        id={popperId}
        open={isNumpadOpen}
        anchorEl={anchorEl}
        onClose={closeNumpad}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        PaperProps={{ elevation: 0 }}
      >
        <Box mt={1}>
          <Numpad value={value} onChange={handleNumpadChange} />
        </Box>
      </Popover>
    </Box>
  );
};

export default CurrencyInput;
