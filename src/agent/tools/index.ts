import { readFile, writeFile, listFiles, deleteFile } from "./file.ts";
import { creator } from "./creator.ts";
import { webSearch } from "./webSearch.ts";

// All tools combined for the agent
export const tools = {
  readFile,
  writeFile,
  listFiles,
  deleteFile,
  creator,
  webSearch,
};

// Export individual tools for selective use in evals
export { readFile, writeFile, listFiles, deleteFile } from "./file.ts";
export { creator } from "./creator.ts";

export { webSearch } from "./webSearch.ts";

// Tool sets for evals
export const fileTools = {
  readFile,
  writeFile,
  listFiles,
  deleteFile,
};
