import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem,
  Chip,
  OutlinedInput,
  LinearProgress as MuiLinearProgress,
  TextField,
  styled,
} from "@mui/material";
import get from "lodash.get";

const ChipsWrapper = styled("div")(
  () => `
    display: flex;
    flex-wrap: wrap;
`
);

const LinearProgress = styled(MuiLinearProgress)(
  () => `
    position: absolute;
    left: 1%;
    right: 1%;
    top: 90%;
`
);

const SelectController = ({
  name,
  control,
  defaultValue,
  options,
  onChange,
  optionValue = "value",
  optionLabel = "label",
  loading = false,
  customOptionLabel,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={
        rest?.multiple
          ? defaultValue?.map((dv) => get(dv, optionValue, "")) || []
          : defaultValue || ""
      }
      render={({ field, fieldState }) => (
        <FormControl
          error={fieldState?.invalid}
          fullWidth={rest.fullWidth}
          size={rest.size}
        >
          {!loading ? (
            <InputLabel id={name}>{rest.label}</InputLabel>
          ) : (
            <LinearProgress />
          )}

          {!loading ? (
            <Select
              labelId={name}
              style={{ width: "100%" }}
              multiple={rest?.multiple}
              input={<OutlinedInput label={rest.label} />}
              {...(rest?.multiple && {
                renderValue: (selected) => (
                  <ChipsWrapper>
                    {selected.map((value, i) => (
                      <Chip
                        key={i}
                        label={get(
                          options.find((o) => get(o, optionValue) === value),
                          optionLabel
                        )}
                      />
                    ))}
                  </ChipsWrapper>
                ),
              })}
              {...rest}
              {...field}
              onChange={(event) => {
                onChange && onChange(event);
                field.onChange(event);
              }}
            >
              {options?.map((option, index) => {
                return (
                  <MenuItem
                    key={index}
                    disabled={option?.disabled}
                    value={get(option, optionValue, "")}
                  >
                    {customOptionLabel
                      ? customOptionLabel(option)
                      : get(option, optionLabel, "")}
                  </MenuItem>
                );
              })}
            </Select>
          ) : (
            <TextField
              variant={rest?.variant}
              label={rest.label}
              disabled
              size={rest.size}
            />
          )}
          <FormHelperText>{fieldState?.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default SelectController;