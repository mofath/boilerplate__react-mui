import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

const SwitchController = ({
  control,
  name,
  label,
  defaultValue = false,
  onChange,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            required
            error={fieldState?.invalid}
            component="fieldset"
          >
            <FormGroup>
              <FormControlLabel
                style={{ width: "100%" }}
                control={
                  <Switch
                    checked={isChecked}
                    {...field}
                    {...rest}
                    onChange={(event) => {
                      setIsChecked(event.target.checked);
                      field.onChange(Boolean(event.target.checked));
                      onChange && onChange(event);
                    }}
                  />
                }
                label={label}
              />
            </FormGroup>
            <FormHelperText>{fieldState?.error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default SwitchController;
