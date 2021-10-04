import { useState } from "react";
import { initBills, billsImages } from "./data";
import { formValuesType } from "./types";
import { makeWithdrawal, billsAmount, currencyFormat } from "utils";
import { billsType } from "utils/types";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Popover,
  Button,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import CurrencyInput from "components/presentational/CurrencyInput";

const ATM = () => {
  const [currentBills, setCurrentBills] = useState(0);
  const [bills, setBills] = useState(initBills[currentBills]);
  const [takenBills, setTakenBills] = useState<billsType>();
  const [remainder, setRemainder] = useState("");
  const [isBillsOut, setIsBillsOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleSubmit, control, formState: { errors } } = useForm<formValuesType>();

  const onSubmit = ({ withdrawal }: formValuesType) => {
    const { remainder, takenBills, remainingBills } = makeWithdrawal(+withdrawal, bills);
    setRemainder(remainder);
    setTakenBills(takenBills);
    setBills(remainingBills);
    billsAmount(bills) === 0 && setIsBillsOut(true);
  };

  const openBillsInfo = (e: any) => setAnchorEl(e.currentTarget);
  const closeBillsInfo = () => setAnchorEl(null);

  const changeCurrentBills = (e: any) => {
    const { value } = e.target;
    setCurrentBills(value);
    setBills(initBills[value]);
    setTakenBills(undefined);
    setRemainder("");
    setIsBillsOut(false);
  };

  const isBillsInfoOpen = Boolean(anchorEl);
  const popperId = isBillsInfoOpen ? "bills-info-popper" : undefined;
  return (
    <Box maxWidth={800} m="0 auto">
      <Typography mb={3} variant="h2" textAlign="center" fontWeight="bold" fontSize={28}>
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
                display: "flex",
              },
            }}
          >
            {initBills.map((bills, id) => (
              <MenuItem key={id} value={id}>
                <Typography>{id + 1}. </Typography>
                {Object.entries(bills).map(([key, value]) => (
                  <Box key={id + key} display="flex" mx={1}>
                    <img width={50} src={billsImages[key]} />
                    <Typography> x{value}</Typography>
                  </Box>
                ))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex">
          <Controller
            control={control}
            name="withdrawal"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <CurrencyInput
                value={value}
                onChange={onChange}
                error={!!errors.withdrawal}
                helperText={errors.withdrawal?.message}
              />
            )}
            rules={{
              validate: (v: string) => +v >= 50 || "Сумма вывода должна быть не менее 50 руб.",
            }}
          />
          <Box p={1}>
            <Tooltip title="Оставшиеся купюры">
              <IconButton onClick={openBillsInfo} aria-describedby={popperId}>
                <InfoIcon color={isBillsInfoOpen ? "primary" : "inherit"} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 2, marginLeft: "auto" }} fullWidth>
          Выдача
        </Button>
      </Box>
      <Box mt={3}>
        {!isBillsOut ? (
          <Box>
            {takenBills && (
              <Box>
                <Typography variant="h4" fontWeight="bold" fontSize={22}>
                  Выданные купюры:
                </Typography>
                <Box>
                  {Object.entries(takenBills).map(([key, value]) => (
                    <Box key={key} display="flex" alignItems="center" m={2}>
                      <img width={200} src={billsImages[key]} />
                      <Typography ml={1}> x {value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {remainder && (
              <Typography>
                Остаток: <b>{currencyFormat(remainder, '', '₽')}</b>
              </Typography>
            )}
          </Box>
        ) : (
          <Typography variant="h4" fontWeight="bold" fontSize={22}>
            Купюры закончились
          </Typography>
        )}
      </Box>
      <Popover
        id={popperId}
        open={isBillsInfoOpen}
        anchorEl={anchorEl}
        onClose={closeBillsInfo}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Box p={1}>
          <Typography variant="h4" m={1} fontWeight="bold" fontSize={20}>
            Оставшиеся купюры
          </Typography>
          {Object.entries(bills).map(([key, value]) => (
            <Box key={key} display="flex" alignItems="center" m={2}>
              <img width={100} src={billsImages[key]} />
              <Typography ml={1}> x {value}</Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default ATM;
