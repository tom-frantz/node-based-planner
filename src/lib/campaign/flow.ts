import CampaignNode from "components/campaign/campaignNode/CampaignNode";
import { CampaignNode as CampaignNodeType } from "generated/graphql";
import { Node } from "reactflow";

export const REACT_FLOW_NODE_TYPES = {
    campaignNode: CampaignNode,
};

export const toFlowNode = (node: { id: string, position: {x: number, y: number} }): Node => {
    return {
        id: node.id,
        type: "campaignNode",
        position: node.position,
        data: node,
    };
};
