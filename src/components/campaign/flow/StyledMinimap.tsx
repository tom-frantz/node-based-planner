import { MiniMap, MiniMapProps } from "reactflow";
import { useColorModeValue, useToken } from "@chakra-ui/react";

export interface StyledMinimapProps extends MiniMapProps {}

const StyledMinimap = (props: StyledMinimapProps) => {
    const [
        lightModeBackgroundColor,
        darkModeBackgroundColor,
        lightModeMaskColor,
        darkModeMaskColor,
        lightModeNodeColor,
        darkModeNodeColor,
    ] = useToken("colors", [
        "white",
        "gray.800",
        "gray.50",
        "gray.900",
        "primary.500",
        "primary.500",
    ]);

    const backgroundColor = useColorModeValue(
        lightModeBackgroundColor,
        darkModeBackgroundColor
    );
    const maskColor = useColorModeValue(lightModeMaskColor, darkModeMaskColor);
    const nodeColor = useColorModeValue(lightModeNodeColor, darkModeNodeColor);

    return (
        <MiniMap
            style={{ backgroundColor }}
            maskColor={maskColor}
            nodeColor={nodeColor}
            {...props}
        />
    );
};

export default StyledMinimap;
