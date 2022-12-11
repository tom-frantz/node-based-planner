import {useRouter} from "next/router";
import {useMutation, useQuery} from "@apollo/client";
import {applyNodeChanges, Background, Controls, MiniMap, Node, NodeChange, ReactFlow} from "reactflow";

import {REACT_FLOW_NODE_TYPES, toFlowNode} from "lib/campaign/flow";
import {CampaignDocument, UpdateCampaignNodeDocument} from "generated/graphql";
import {Grid, GridItem, Text, useTheme} from "@chakra-ui/react";

import "reactflow/dist/style.css";
import {useCallback, useEffect, useState} from "react";

export interface CampaignPageProps {
}

const CampaignPage = (props: CampaignPageProps) => {
    const router = useRouter();
    const theme = useTheme();
    const {id: campaignId} = router.query;


    const {data, loading, error} = useQuery(CampaignDocument, {
        variables: {id: campaignId as string},
        skip: campaignId === undefined,
    });
    let updateTimeout: number | undefined = undefined;
    const [updateNode, {}] = useMutation(UpdateCampaignNodeDocument);

    const [nodes, setNodes] = useState<Node[]>([])
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            if (updateTimeout !== undefined) {
                clearTimeout(updateTimeout);
            }

            updateTimeout = setTimeout(() => {
                console.log("TIMER UPDATING ")
                nodes.forEach((node) => {
                    updateNode({
                        variables: {
                            id: node.id,
                            input: {
                                position: node.position
                            }
                        }
                    }).then(console.log).catch(console.log)
                })
            }, 1000) as unknown as number;

            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        []
    );

    useEffect(() => {
        if (!data) {
            return
        }
        const nextNodes = data.campaign.campaignNodes.map((campaignNode, index) => {
            return toFlowNode(campaignNode);
        })

        setNodes(nextNodes)
    }, [data])


    const edges =
        data?.campaign.campaignNodes
            .map((campaignNode, index) => {
                return campaignNode.transitions.map((transition) => {
                    const source = transition.from.id;
                    const target = transition.to.id;

                    // This will remove duplicates from the graph response..
                    if (campaignNode.id !== source) {
                        return undefined
                    }

                    return {
                        id: `e-${source}-${target}`,
                        source,
                        target,
                    };
                });
            })
            .flat()
            // Filter out any undefined items from before
            .filter((item) => item !== undefined) ?? [];

    return (
        <Grid
            h="100vh"
            templateRows="repeat(1, 1fr)"
            templateColumns={`${theme.sizes.container.md} 1fr`}
            gap={4}
        >
            <GridItem colSpan={1}>
                <Text>id: {campaignId}</Text>
                <Text>data: {JSON.stringify(data)}</Text>
            </GridItem>
            <GridItem colSpan={1}>
                <ReactFlow
                    style={{border: "5px solid red", fontSize: "6px"}}
                    nodes={nodes}
                    edges={edges}
                    fitView
                    nodeTypes={REACT_FLOW_NODE_TYPES}
                    onNodesChange={onNodesChange}
                    // onEdgesChange={onEdgesChange}
                    // onConnect={onConnect}
                >
                    <MiniMap position={"bottom-right"}/>
                    <Controls/>
                    <Background/>
                </ReactFlow>
            </GridItem>
        </Grid>
    );
};

export default CampaignPage;
