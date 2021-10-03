import { TextFieldProps } from "@material-ui/core";

type PropsType = Omit<TextFieldProps, "value" | "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
};

export default PropsType;