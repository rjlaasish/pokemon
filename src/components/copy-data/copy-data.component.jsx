import PropTypes from "prop-types";
import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { copyStyles, useStyles } from "./MUI-styles";

const CopyData = ({ children, onCopy }) => {
  const classes = copyStyles();
  const toolTipStyles = useStyles();

  const CustomTooltip = (props) => {
    return <Tooltip arrow classes={toolTipStyles} {...props} />;
  };

  return (
    <div className={classes.container}>
      <CustomTooltip title="Copy" placement="top">
        <IconButton aria-label="Copy" onClick={onCopy}>
          <FileCopyIcon fontSize="small" color="primary" />
        </IconButton>
      </CustomTooltip>
      {children}
    </div>
  );
};

CopyData.propTypes = {
  onCopy: PropTypes.func.isRequired,
};

export default CopyData;
