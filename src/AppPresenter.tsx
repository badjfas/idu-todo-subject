import { Grid, ThemeProvider } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import useStyles, { pickerTheme } from "./styles";
import { AppProps } from "./types";

const AppPresenter = (props: AppProps) => {
  const { date, onChange } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <ThemeProvider theme={pickerTheme}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          autoOk
          orientation="landscape"
          variant="static"
          value={date}
          onChange={onChange}
        />
      </ThemeProvider>
    </Grid>
  );
};

export default AppPresenter;
