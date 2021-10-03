import { useState } from "react";
import { initBills, billsImages } from "./data";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import CurrencyInput from "components/presentational/CurrencyInput";

const ATM = () => {
  const [currentBills, setCurrentBills] = useState(0);
  const [bills, setBills] = useState(initBills[currentBills]);
  const [issuedBills, setIssuedBills] = useState();
  const [withdrawal, setWithdraw] = useState("");

  const changeCurrentBills = (e: any) => setCurrentBills(e.target.value);
  const changeWithdraw = (value: string) => setWithdraw(value);

  return (
    <Box maxWidth={800} m="0 auto">
      <Typography
        mb={3}
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        fontSize={28}
      >
        Онлайн-банкомат
      </Typography>
      <Box minWidth={120} mb={4}>
        <FormControl fullWidth>
          <InputLabel id="bills-label">Набор купюр</InputLabel>
          <Select
            labelId="bills-label"
            id="bills-select"
            value={currentBills}
            onChange={changeCurrentBills}
            label="Набор купюр"
            SelectDisplayProps={{
              style: {
                display: 'flex',
              },
            }}
          >
            {initBills.map((bills, id) => (
              <MenuItem key={id} value={id}>
                <Typography>{id+1}. </Typography>
                {Object.entries(bills).map(([key, value]) => (
                  <Box key={id+key} display="flex" mx={1}>
                    <img width={50} src={billsImages[key]} />
                    <Typography> x{value}</Typography>
                  </Box>
                ))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <CurrencyInput value={withdrawal} onChange={changeWithdraw} />
    </Box>
  );
};

export default ATM;
