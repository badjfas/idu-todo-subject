import { Grid, ThemeProvider } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import Day from "./Day";
import useStyles, { pickerTheme } from "./styles";
import { AppProps } from "./types";

const AppPresenter = (props: AppProps) => {
  const { date, onChange } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <ThemeProvider theme={pickerTheme}>
        <KeyboardDatePicker
          disableToolbar
          autoOk
          orientation="landscape"
          variant="static"
          value={date}
          onChange={onChange}
          renderDay={(day, selectedDate, dayInCurrentMonth, dayComponent) => {
            return (
              <Day
                date={date}
                day={day}
                selectedDate={selectedDate}
                dayInCurrentMonth={dayInCurrentMonth}
                dayComponent={dayComponent}
              />
            );
          }}
        />
      </ThemeProvider>
    </Grid>
  );
};

export default AppPresenter;
