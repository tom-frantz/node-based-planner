import {
    defineStyle,
    defineStyleConfig,
    extendTheme,
    ThemeConfig,
} from "@chakra-ui/react";

const colors = {
    primary: {
        900: "#42202A",
        800: "#502633",
        700: "#602E3E",
        600: "#74384B",
        500: "#8C435A",
        400: "#A44E69",
        300: "#B6657F",
        200: "#C5869A",
        100: "#D7ACBA",
    },
    paper: {
        900: "#815C34",
        800: "#9C6F3F",
        700: "#B88650",
        600: "#C8A177",
        500: "#DBC1A6",
        400: "#EEE1D5",
    },
};
const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};
const fonts = {
    heading: `'Della Respira', serif`,
    // heading: `megrim, serif`
    body: `'Quattrocento', serif`,
};

const theme = extendTheme({
    colors,
    config,
    fonts,
    components: {
        Heading: {
            variants: {
                subheading: {

                    // fontFamily: "Megrim, sans-serif",
                },
            },
        },
    },
});
export default theme;
