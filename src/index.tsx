import React from "react";
import ReactDOM from "react-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/ko";
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import AppContainer from "./AppContainer";
moment.locale("ko"); // it is required to select default locale manually

const theme = createTheme({
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
