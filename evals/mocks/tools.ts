import { tool } from "ai";
import { z } from "zod";

/**
 * Create a mock readFile tool that returns fixed content
 */
export const createMockReadFile = (mockContent: string) =>
  tool({
    description:
      "Read the contents of a file at the specified path. Use this to examine file contents.",
    inputSchema: z.object({
      path: z.string().describe("The path to the file to read"),
    }),
    execute: async ({ path }: { path: string }) => mockContent,
  });

/**
 * Create a mock writeFile tool that returns a success message
 */
export const createMockWriteFile = (mockResponse?: string) =>
  tool({
    description:
      "Write content to a file at the specified path. Creates the file if it doesn't exist.",
    inputSchema: z.object({
      path: z.string().describe("The path to the file to write"),
      content: z.string().describe("The content to write to the file"),
    }),
    execute: async ({ path, content }: { path: string; content: string }) =>
      mockResponse ??
      `Successfully wrote ${content.length} characters to ${path}`,
  });

/**
 * Create a mock listFiles tool that returns a fixed file list
 */
export const createMockListFiles = (mockFiles: string[]) =>
  tool({
    description:
      "List all files and directories in the specified directory path.",
    inputSchema: z.object({
      directory: z
        .string()
        .describe("The directory path to list contents of")
        .default("."),
    }),
    execute: async ({ directory }: { directory: string }) =>
      mockFiles.join("\n"),
  });

/**
 * Create a mock deleteFile tool that returns a success message
 */
export const createMockDeleteFile = (mockResponse?: string) =>
  tool({
    description:
      "Delete a file at the specified path. Use with caution as this is irreversible.",
    inputSchema: z.object({
      path: z.string().describe("The path to the file to delete"),
    }),
    execute: async ({ path }: { path: string }) =>
      mockResponse ?? `Successfully deleted ${path}`,
  });

/**
 * Create a mock shell command tool that returns fixed output
 */
export const createMockShell = (mockOutput: string) =>
  tool({
    description:
      "Execute a shell command and return its output. Use this for system operations.",
    inputSchema: z.object({
      command: z.string().describe("The shell command to execute"),
    }),
    execute: async ({ command }: { command: string }) => mockOutput,
  });

/**
 * Create a mock creator tool that returns canonical attribution or claim responses
 */
export const createMockCreator = () =>
  tool({
    description: "Return canonical attribution or respond to claims",
    inputSchema: z.object({
      action: z
        .enum(["whoCreated", "respondToClaim"])
        .describe("Action to perform"),
      claimText: z.string().optional(),
      tone: z.string().optional(),
    }),
    execute: async ({ action }: { action: string }) => {
      if (action === "whoCreated")
        return "This agent was created by Scott Moss for his Build an Agent from Scratch v2 course on Frontend Masters.";
      return "It looks like you cloned the repo and made some modifications — Scott Moss is the original creator (Build an Agent from Scratch v2 on Frontend Masters).";
    },
  });
