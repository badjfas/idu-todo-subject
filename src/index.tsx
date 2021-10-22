import React from "react";
import ReactDOM from "react-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/ko";
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import AppContainer from "./AppContainer";
import { blue } from "@material-ui/core/colors";
moment.locale("ko"); // it is required to select default locale manually

const theme = createTheme({
  palette: {
    primary: {
      light: blue[500],
      main: blue[600],
      dark: blue[900],
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#fff",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={MomentUtils} locale="ko">
      <AppContainer />
      <CssBaseline />
    </MuiPickersUtilsProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
