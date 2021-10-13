import { makeStyles, createTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  datePicker: {
    width: "100%",
  },
}));

export const pickerTheme = createTheme({
  overrides: {
    MuiPickersDatePickerRoot: {
      landscape: {
        width: 999,
      },
    },
  },
});

export default useStyles;
