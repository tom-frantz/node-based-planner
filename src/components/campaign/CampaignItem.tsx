import { Campaign } from "../../generated/graphql";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    SkeletonText,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface CampaignItemProps {
    campaign: Pick<Campaign, "id" | "title" | "description">;
}

const CampaignItem = (props: CampaignItemProps) => {
    const { campaign } = props;
    const router = useRouter();

    return (
        <Card
            maxW="sm"
            variant={"elevated"}
            sx={{ "&:hover": { backgroundColor: "gray.400" } }}
            onClick={() => {
                router.push(`campaign/${campaign.id}`);
            }}
        >
            <CardHeader>
                <Heading size="md">{campaign.title}</Heading>
            </CardHeader>

            {campaign.description && (
                <>
                    <Divider />
                    <CardBody>
                        <Text>{campaign.description}</Text>
                    </CardBody>
                </>
            )}
        </Card>
    );
};

export default CampaignItem;

export const CampaignItemGhost = (props: {}) => (
    <Card boxShadow="lg" height={"28"} width={"sm"}>
        <SkeletonText
            padding="4"
            paddingRight={"40"}
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
        />
        <Divider />
        <SkeletonText
            padding="4"
            noOfLines={2}
            spacing="4"
            skeletonHeight="2"
        />
    </Card>
);
