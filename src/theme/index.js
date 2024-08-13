import { createTheme } from "@mui/material/styles";
import { grey, common } from "@mui/material/colors";

const palette = {
  light: {
    primary: {
      main: grey[800],
    },
  },
};

const theme = createTheme({
  primary: {
    main: palette.light.primary.main,
  },
  MuiAppBar: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: palette.light.primary.main,
      },
    },
  },
  MuiLink: {
    variant: "h3",
  },

  MuiList: {
    styleOverrides: {
      root: {},
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        color: common.white,
        alignItems: "stretch",
        fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        color: common.white,
        fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
    },
  },
  MuiModal: {
    styleOverrides: {
      root: {
        backgroundColor: grey["A100"],
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
