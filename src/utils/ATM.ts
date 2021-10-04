import { billsType } from './types';

export const makeWithdrawal = (sum: number, bills: billsType) => {
  const remainingBills = { ...bills };
  const takenBills: billsType = {};

  Object.entries(bills).map(([value, amount]) => {
    const v = Number(value);
    const quotient = Math.floor(sum / v);
    if (quotient > 0) {
      if (amount >= quotient) {
        sum -= v * quotient;
        remainingBills[value] -= quotient;
        takenBills[value] = quotient;
      } else {
        sum -= v * amount;
        remainingBills[value] = 0;
        if (amount > 0) {
          takenBills[value] = amount;
        }
      }
    }
  });

  return {
    remainder: sum.toFixed(2),
    takenBills,
    remainingBills,
  };
};

export const billsAmount = (bills: billsType) => Object.values(bills).reduce((sum, amount) => sum + amount, 0);