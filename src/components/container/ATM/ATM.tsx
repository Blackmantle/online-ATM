import { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CurrencyInput from "components/presentational/CurrencyInput";

const ATM = () => {
  const [withdrawal, setWithdraw] = useState("");

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
      <CurrencyInput value={withdrawal} onChange={changeWithdraw} />
    </Box>
  );
};

export default ATM;
