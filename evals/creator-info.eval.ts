import { evaluate } from "@lmnr-ai/lmnr";
import { creator } from "../src/agent/tools/creator.ts";
import { toolsSelected, toolsAvoided, toolSelectionScore } from "./evaluators.ts";
import type { EvalData, EvalTarget } from "./types.ts";
import dataset from "./data/creator-info.json" with { type: "json" };
import { singleTurnExecutor } from "./executors.ts";

/**
 * Creator tool selection evaluation
 */
const executor = async (data: EvalData) => {
  return singleTurnExecutor(data, { creator });
};

evaluate({
  data: dataset as Array<{ data: EvalData; target: EvalTarget }>,
  executor,
  evaluators: {
    toolsSelected: (output, target) => {
      if (target?.category !== "golden") return 1;
      return toolsSelected(output, target);
    },
    toolsAvoided: (output, target) => {
      if (target?.category !== "negative") return 1;
      return toolsAvoided(output, target);
    },
    selectionScore: (output, target) => {
      if (target?.category !== "secondary") return 1;
      return toolSelectionScore(output, target);
    },
  },
  config: {
    projectApiKey: process.env.LMNR_API_KEY,
  },
  groupName: "creator-tool-selection",
});
