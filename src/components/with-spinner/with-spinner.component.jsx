import React from "react";
import "./styles.scss";

const withSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return (
      <div>
        <div className={`${isLoading ? "spinner-overlay" : "hidden"}`}>
          <div className="spinner-container" />
        </div>
        <WrappedComponent {...otherProps} />
      </div>
    );
  };
  return Spinner;
};

export default withSpinner;
