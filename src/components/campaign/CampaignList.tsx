import { Campaign } from "../../generated/graphql";
import campaignItem, { CampaignItemProps } from "./CampaignItem";
import CampaignItem from "./CampaignItem";
import { HStack } from "@chakra-ui/react";

export interface CampaignListProps {
    campaigns: CampaignItemProps["campaign"][];
}

const CampaignList = (props: CampaignListProps) => {
    const { campaigns } = props;

    return (
        <HStack>
            {campaigns.map((campaign) => (
                <CampaignItem key={campaign.id} campaign={campaign} />
            ))}
        </HStack>
    );
};

export default CampaignList;
