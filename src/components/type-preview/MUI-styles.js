import { makeStyles } from "@material-ui/core";

export const typePreviewStyles = makeStyles({
    style: {
        backgroundColor: (props) => props.backgroundColor,
        color: "white",
        padding: "6px",
        borderRadius: "5px",
        textAlign: "center",
        marginTop: "3px",
    },
    secondStyle: {
        color: (props) => props.color,
    },
});
