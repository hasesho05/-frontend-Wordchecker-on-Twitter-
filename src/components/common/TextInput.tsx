import { TextField } from "@mui/material";
import React from "react";

interface Props {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.memo((props:Props) => {
  const { fullWidth, label, multiline, required, rows, value, type, onChange } = props;
  return (
    <TextField 
      fullWidth={fullWidth}
      label={label}
      margin="dense"
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
})

export default TextInput;