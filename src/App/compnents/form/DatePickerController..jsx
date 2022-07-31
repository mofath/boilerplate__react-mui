import React from "react";
import DatePickerMui from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePickerMui } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DatePickerController = ({
  control,
  name,
  label,
  rules,
  defaultValue = null,
  ...rest
}) => {
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerMui
            {...props}
            label={label}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            {...field}
            {...rest}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DatePickerController;
