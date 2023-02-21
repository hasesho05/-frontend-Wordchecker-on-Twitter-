import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
    values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1025,
        xl: 1536,
    },
}});

export default theme;