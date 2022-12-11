import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CampaignDocument } from "../../generated/graphql";

export interface CampaignPageProps {}

const CampaignPage = (props: CampaignPageProps) => {
    const router = useRouter();
    const { id: campaignId } = router.query;

    const { data, loading, error } = useQuery(CampaignDocument, {
        variables: { id: campaignId as string },
        skip: campaignId === undefined,
    });

    return (
        <>
            <p>id: {campaignId}</p>
            <p>data: {JSON.stringify(data)}</p>
        </>
    );
};

export default CampaignPage;
