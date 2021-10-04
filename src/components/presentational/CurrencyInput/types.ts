import { NumberFormatProps } from "react-number-format";

type PropsType = NumberFormatProps & {
  value?: string;
  onChange?: (value: string) => void;
};

export default PropsType;