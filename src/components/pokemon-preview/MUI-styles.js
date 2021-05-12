import { makeStyles } from "@material-ui/core/styles";

export const paginationStyles = makeStyles((theme) => ({
    tablePagination: {
        width: "400px",
        ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
            padding: '20px',
            width: '100px',
        }
    },
    caption: {
        ['@media (max-width:480px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none'
        }
    }
}));