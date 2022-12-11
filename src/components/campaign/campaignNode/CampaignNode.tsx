import { CampaignQuery } from "generated/graphql";
import { Box, Container } from "@chakra-ui/react";

export interface CampaignNodeProps {
    data: CampaignQuery["campaign"]["campaignNodes"][number];
}

const CampaignNode = (props: CampaignNodeProps) => {
    const { data } = props;
    const { title, description } = data;

    return (
        <Container bg="paper.700">
            <p>{title}</p>
            <p>{description}</p>
        </Container>
    );
};

export default CampaignNode;
