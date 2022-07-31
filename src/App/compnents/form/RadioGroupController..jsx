import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const RadioGroupController = ({
  name,
  label,
  defaultValue="",
  control,
  options,
  onChange,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <FormControl error={fieldState?.invalid} component="fieldset">
          {label && <FormLabel>{label}</FormLabel>}
          <RadioGroup
            style={{ flexDirection: "row" }}
            {...field}
            onChange={(event) => {
              onChange && onChange(event);
              field.onChange(event);
            }}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{fieldState?.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RadioGroupController;
