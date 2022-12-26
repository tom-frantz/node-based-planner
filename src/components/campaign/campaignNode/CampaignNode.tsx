import { CampaignQuery } from "generated/graphql";
import {
    Box,
    Container,
    defineStyle,
    Divider,
    Heading,
    LightMode,
    Text,
} from "@chakra-ui/react";

import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";

export const subheading = defineStyle({
    fontFamily: "Megrim, serif",
});

export interface CampaignNodeProps {
    data: CampaignQuery["campaign"]["campaignNodes"][number];
}

const CampaignNode = (props: CampaignNodeProps) => {
    const { data } = props;
    const { title, description } = data;

    return (
        <Container
            bg="gray.700"
            p={2}
            width={"100%"}
            height={"100%"}
            marginX={0}
            maxW={"100%"}
            borderRadius={8}
            borderColor={"gray.200"}
            borderWidth={1.2}
        >
            <NodeResizer isVisible={true} minWidth={180} minHeight={100} />
            <Handle type={"target"} position={Position.Top} />
            <Handle type={"target"} position={Position.Left} />
            <Heading fontWeight={"regular"}>{title}</Heading>
            <Heading
                as="h4"
                size="md"
                variant={"subheading"}
                fontWeight={"regular"}
            >
                subtitle
            </Heading>
            <Divider />
            <Text fontSize="sm">Amaze</Text>
            <Handle type={"source"} position={Position.Bottom} />
            <Handle type={"source"} position={Position.Right} />
        </Container>
    );
};

export default CampaignNode;
