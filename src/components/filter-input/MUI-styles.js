import { makeStyles } from "@material-ui/core/styles";

export const filterStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            margin: theme.spacing(3),
        },
    },
}));