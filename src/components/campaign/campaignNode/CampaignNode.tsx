import {CampaignQuery} from "generated/graphql";
import {Container, defineStyle, Divider, Heading, Text, useColorModeValue,} from "@chakra-ui/react";

import {Handle, Position} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";
import {useCallback, useState} from "react";

export const subheading = defineStyle({
    fontFamily: "Megrim, serif",
});

export interface CampaignNodeProps {
    data: CampaignQuery["campaign"]["campaignNodes"][number];
    height: number
    width: number
}

const CampaignNode = (props: CampaignNodeProps) => {
    const {data} = props;
    const {title, description} = data;

    const containerBackgroundColor = useColorModeValue("gray.200", "gray.700")
    const containerBorderColor = useColorModeValue("gray.700", "gray.200")

    console.log("Here", props)

    return (
        <Container
            bg={containerBackgroundColor}
            p={0}
            width={props.width}
            height={props.height}
            marginX={0}
            maxW={"100%"}
            borderRadius={8}
            borderColor={containerBorderColor}
            borderWidth={1.2}
        >
            <NodeResizer isVisible={true} minWidth={180} minHeight={100}/>
            <Handle type={"target"} position={Position.Top}/>
            <Handle type={"target"} position={Position.Left}/>
            <Handle type={"source"} position={Position.Bottom}/>
            <Handle type={"source"} position={Position.Right}/>


            <Container p={2}>
                <Heading fontWeight={"regular"}>{title}</Heading>
                <Heading
                    as="h4"
                    size="md"
                    variant={"subheading"}
                    fontWeight={"regular"}
                >
                    {description}
                </Heading>
            </Container>

            <Divider/>
            <Container>
                <Text fontSize="sm">Amaze</Text>
            </Container>
        </Container>
    );
};

export default CampaignNode;
