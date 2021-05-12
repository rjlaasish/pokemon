import React from "react";
import { typePreviewStyles } from "./MUI-styles";

const TypePreview = ({ children, ...props }) => {
  const { style } = typePreviewStyles(props);
  return <span className={style}>{children}</span>;
};

export default TypePreview;
