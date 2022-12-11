import { useQuery } from "@apollo/client";
import { MeDocument } from "../generated/graphql";
import {
    Box,
    Card,
    Container,
    Divider,
    Heading,
    HStack,
    SkeletonCircle,
    SkeletonText,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import CampaignList from "../components/campaign/CampaignList";
import { CampaignItemGhost } from "../components/campaign/CampaignItem";
import { useRedirectUnauthenticated } from "../auth/AuthContext";

export interface HomeProps {}

const HomePage = (props: HomeProps) => {
    const { data, error, loading } = useQuery(MeDocument);

    useRedirectUnauthenticated();

    return (
        <Container maxW={"container.xl"} marginY={8} paddingX={8}>
            <Heading size={"2xl"}>Home</Heading>
            <Divider marginY={4} />
            <Heading marginY={4} size={"lg"}>
                Campaigns
            </Heading>
            {loading && (
                <Wrap marginX={4}>
                    {[1, 2, 3].map((_, index) => (
                        <WrapItem key={index}>
                            <CampaignItemGhost />
                        </WrapItem>
                    ))}
                </Wrap>
            )}
            {data && <CampaignList campaigns={data.me.campaigns} />}
        </Container>
    );
};

export default HomePage;
