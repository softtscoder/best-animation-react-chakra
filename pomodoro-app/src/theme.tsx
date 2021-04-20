import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace`, proxima: "Proxima Nova Rg" };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    mBlack: "#161617",
    mRed: "#FF3464",
    mCyian: "#64CCE4",
    mGray: "rgba(22, 22, 23, 0.59)",
  },
  fonts,
  breakpoints,
});

export default theme;
