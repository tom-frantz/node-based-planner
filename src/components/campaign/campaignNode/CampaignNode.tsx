import { CampaignQuery } from "generated/graphql";
import {Box, Container, Heading, Text} from "@chakra-ui/react";
import {Handle, Position} from "reactflow";

export interface CampaignNodeProps {
    data: CampaignQuery["campaign"]["campaignNodes"][number];
}

const CampaignNode = (props: CampaignNodeProps) => {
    const { data } = props;
    const { title, description } = data;


    return (
        <Container bg="paper.900">
            <Handle type={"target"} position={Position.Top}/>
            <Handle type={"target"} position={Position.Left}/>
            <Heading size={"xs"}>{title}</Heading>
            <Text fontSize={"xx-small"}>{description}</Text>
            <Handle type={"source"} position={Position.Bottom}/>
            <Handle type={"source"} position={Position.Right}/>
        </Container>
    );
};

export default CampaignNode;