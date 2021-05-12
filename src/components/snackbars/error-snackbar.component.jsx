import PropTypes from "prop-types";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./MUI-styles";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ErrorSnackbar = ({ isError, message, errorAction }) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    errorAction(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

ErrorSnackbar.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  errorAction: PropTypes.func.isRequired,
};

export default ErrorSnackbar;
