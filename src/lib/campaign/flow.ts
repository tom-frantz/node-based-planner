import CampaignNode from "components/campaign/campaignNode/CampaignNode";
import { CampaignNode as CampaignNodeType } from "generated/graphql";
import { Node } from "reactflow";

export const REACT_FLOW_NODE_TYPES = {
    campaignNode: CampaignNode,
};

export const toFlowNode = (node: { id: string }): Node => {
    return {
        id: node.id,
        type: "campaignNode",
        position: { x: 10, y: 10 },
        data: node,
    };
};
