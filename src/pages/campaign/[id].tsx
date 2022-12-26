import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";

import {
    applyNodeChanges,
    Background,
    Controls,
    Node,
    NodeChange,
    Position,
    ReactFlow,
    PanelPosition,
} from "reactflow";
import "reactflow/dist/style.css";

import { REACT_FLOW_NODE_TYPES, toFlowNode } from "lib/campaign/flow";
import {
    CampaignDocument,
    UpdateCampaignNodeDocument,
} from "generated/graphql";

import {
    Button,
    Code,
    Grid,
    GridItem,
    IconButton,
    LightMode,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useCallback, useEffect, useState } from "react";
import StyledMinimap from "components/campaign/flow/StyledMinimap";

export interface CampaignPageProps {}

const CampaignPage = (props: CampaignPageProps) => {
    const router = useRouter();
    const theme = useTheme();
    const { id: campaignId } = router.query;

    const { data, loading, error } = useQuery(CampaignDocument, {
        variables: { id: campaignId as string },
        skip: campaignId === undefined,
    });
    let updateTimeout: number | undefined = undefined;
    const [updateNode, {}] = useMutation(UpdateCampaignNodeDocument);

    const [nodes, setNodes] = useState<Node[]>([]);
    const onNodesChange = useCallback((changes: NodeChange[]) => {
        if (updateTimeout !== undefined) {
            clearTimeout(updateTimeout);
        }

        setNodes((nds) => {
            const changedNodes = applyNodeChanges(changes, nds);

            console.log("HONK", changedNodes)
            updateTimeout = setTimeout(() => {
                changedNodes.forEach((node) => {
                    updateNode({
                        variables: {
                            id: node.id,
                            input: {
                                position: node.position,
                                height: node.height,
                                width: node.width
                            },
                        },
                        // context: {
                        //     fetchOptions: {
                        //         signal: abortController.signal,
                        //     },
                        // },
                        optimisticResponse: (vars) => {
                            return {
                                campaignNodeUpdate: {
                                    ...node.data,

                                    id: node.id,
                                    __typename: "CampaignNode",

                                    position: node.position,
                                    height: node.height,
                                    width: node.width
                                },
                            };
                        },
                    })
                        .then(console.log)
                        .catch(console.log);
                });
            }, 2000) as unknown as number;

            return changedNodes;
        });
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }
        const nextNodes = data.campaign.campaignNodes.map(
            (campaignNode, index) => {
                return toFlowNode(campaignNode);
            }
        );

        setNodes(nextNodes);
    }, [data]);

    const edges =
        data?.campaign.campaignNodes
            .map((campaignNode, index) => {
                return campaignNode.transitions.map((transition) => {
                    const source = transition.from.id;
                    const target = transition.to.id;

                    // This will remove duplicates from the graph response.
                    if (campaignNode.id !== source) {
                        return undefined;
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
                <Text>
                    data: <Code>{JSON.stringify(data)}</Code>
                </Text>
            </GridItem>
            <GridItem colSpan={1}>
                <ReactFlow
                    style={{ border: "5px solid red", fontSize: "6px" }}
                    nodes={nodes}
                    edges={edges}
                    fitView
                    nodeTypes={REACT_FLOW_NODE_TYPES}
                    onNodesChange={onNodesChange}
                    // onEdgesChange={onEdgesChange}
                    // onConnect={onConnect}
                >
                    <StyledMinimap />
                    <Controls
                        style={{ marginRight: 240 }}
                        position={"bottom-right"}
                    />
                    <Background />
                    <LightMode>
                        <IconButton
                            colorScheme="primary"
                            aria-label="Add Node"
                            size="lg"
                            pos={"absolute"}
                            isRound
                            bottom={0}
                            m={4}
                            icon={<AddIcon />}
                        />
                    </LightMode>
                </ReactFlow>
            </GridItem>
        </Grid>
    );
};

export default CampaignPage;
