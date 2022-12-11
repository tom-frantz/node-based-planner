import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Background, Controls, MiniMap, ReactFlow } from "reactflow";

import { REACT_FLOW_NODE_TYPES, toFlowNode } from "lib/campaign/flow";
import { CampaignDocument } from "generated/graphql";
import { Grid, GridItem, useTheme } from "@chakra-ui/react";

import "reactflow/dist/style.css";
import campaignNode from "../../components/campaign/campaignNode/CampaignNode";

export interface CampaignPageProps {}

const CampaignPage = (props: CampaignPageProps) => {
    const router = useRouter();
    const theme = useTheme();
    const { id: campaignId } = router.query;

    const { data, loading, error } = useQuery(CampaignDocument, {
        variables: { id: campaignId as string },
        skip: campaignId === undefined,
    });

    const nodes =
        data?.campaign.campaignNodes.map((campaignNode, index) => {
            const flowNode = toFlowNode(campaignNode);
            flowNode.position = { x: index * 40, y: index * 40 };

            return flowNode;
        }) ?? [];

    const edges =
        data?.campaign.campaignNodes
            .map((campaignNode, index) => {
                return campaignNode.transitions.map((transition) => {
                    const source = transition.from.id;
                    const target = transition.to.id;
                    return {
                        id: `e-${source}-${target}`,
                        source,
                        target,
                    };
                });
            })
            .flat() ?? [];

    return (
        <Grid
            h="100vh"
            templateRows="repeat(1, 1fr)"
            templateColumns={`${theme.sizes.container.md} 1fr`}
            gap={4}
        >
            <GridItem colSpan={1}>
                <p>id: {campaignId}</p>
                <p>data: {JSON.stringify(data)}</p>
            </GridItem>
            <GridItem colSpan={1}>
                <ReactFlow
                    style={{ border: "5px solid red" }}
                    nodes={nodes}
                    edges={edges}
                    fitView
                    nodeTypes={REACT_FLOW_NODE_TYPES}
                    // onNodesChange={onNodesChange}
                    // onEdgesChange={onEdgesChange}
                    // onConnect={onConnect}
                >
                    <MiniMap position={"bottom-right"} />
                    <Controls />
                    <Background />
                </ReactFlow>
            </GridItem>
        </Grid>
    );
};

export default CampaignPage;
