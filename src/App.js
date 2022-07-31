import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckboxController from "./App/compnents/form/CheckboxController";
import TextFieldController from "./App/compnents/form/TextFieldController";
import RadioGroupController from "./App/compnents/form/RadioGroupController.";
import SelectController from "./App/compnents/form/SelectController";
import SwitchController from "./App/compnents/form/SwitchController";
import AutocompleteController from "./App/compnents/form/AutocompleteController";
import { Button, Grid, Box } from "@mui/material";
import { useEffect } from "react";

function App() {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    firstName: yup.string().required(),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      rememberMe: true,
      firstName: "hello",
      radioGroup: "option2",
      select: "entity-two",
      autocomplete: "entity-one",
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ padding: "20px 100px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CheckboxController
              name="rememberMe"
              control={control}
              label="Remember me"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldController
              name="firstName"
              control={control}
              label="First Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <RadioGroupController
              name="radioGroup"
              control={control}
              label="RadioGroup Controller"
              options={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectController
              name="select"
              control={control}
              label="Select Controller"
              options={[
                {
                  label: "Option One",
                  value: "option-one",
                  id: "entity-one",
                },
                {
                  label: "Option Two",
                  value: "option-two",
                  id: "entity-two",
                },
              ]}
              optionValue="id"
              variant="outlined"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchController
              control={control}
              name="switch"
              defaultValue={true}
              label="Switch"
            />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteController
              control={control}
              name="autocomplete"
              textFieldProps={{
                label: "Autocomplete Controller",
                fullWidth: true,
                variant: "outlined",
              }}
              optionLabel="title"
              optionValue="id"
              options={[
                {
                  title: "Option One",
                  id: "entity-one",
                  value: "option-one",
                },
                {
                  title: "Option two",
                  id: "entity-two",
                  value: "option-two",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default App;
