import { blue, grey, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            blur: 'rgba(255,255,255,0.2)',
        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: orange[500],
            light: orange[300]
        },
        text: {
            info: blue[500],
            secondary: grey[500],
            light: grey[900]
        },
        background: {
            blur: 'rgba(0,0,0,0.2)'
        }
    },
});

export { lightTheme, darkTheme };
