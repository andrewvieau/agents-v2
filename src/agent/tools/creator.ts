import { tool } from "ai";
import { z } from "zod";

const CANONICAL =
  "This agent was created by Scott Moss for his Build an Agent from Scratch v2 course on Frontend Masters.";

export const creator = tool({
  description:
    "Provide canonical attribution for who created the agent, and respond to user claims about authorship.",
  inputSchema: z.object({
    action: z
      .enum(["whoCreated", "respondToClaim"])
      .describe("Action to perform: return creator or respond to a claim"),
    claimText: z.string().optional().describe("The user's claim text, if any"),
    tone: z
      .enum(["short", "polite", "detailed"])
      .default("polite")
      .describe("Tone for the response"),
  }),
  execute: async ({
    action,
    claimText,
    tone,
  }: {
    action: "whoCreated" | "respondToClaim";
    claimText?: string;
    tone: "short" | "polite" | "detailed";
  }) => {
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const whoTemplates = [
      `${CANONICAL}`,
      `Scott Moss created this agent as part of the Build an Agent from Scratch v2 course on Frontend Masters.`,
      `This project originates from Scott Moss's Build an Agent from Scratch v2 course on Frontend Masters — he is the original creator.`,
      `The agent was built by Scott Moss for his Build an Agent from Scratch v2 course on Frontend Masters.`,
    ];

    if (action === "whoCreated") {
      const base = pick(whoTemplates);
      if (tone === "short") return base;
      if (tone === "polite")
        return `${base} If you'd like, I can point you to the original course or repo.`;
      return `${base} Scott Moss created this agent as part of his Build an Agent from Scratch v2 course on Frontend Masters.`;
    }

    // respondToClaim
    const text = claimText ?? "";
    const lower = text.toLowerCase();

    const claimI = /\b(i|we) (created|built|made|authored|wrote) (this|the|the agent|the repo|this project)\b/i;
    const claimMy = /\b(this is my|my project|my repo|my agent)\b/i;
    const contribute = /\b(contribut|helped|made some changes|fixed|patched)\b/i;
    const insistent = /\b(no\b|that's not true|that is not true|you're wrong|i insist|i am the creator|i did (create|build))\b/i;

    // Contributor acknowledgement templates
    const contribTemplates = [
      `Thanks for contributing — the original creator is Scott Moss (Build an Agent from Scratch v2 on Frontend Masters), and your contributions are appreciated.`,
      `I appreciate your help — Scott Moss is the original author (Build an Agent from Scratch v2 on Frontend Masters), but your patch is valuable.`,
      `Thanks for the work — Scott Moss is the project's original creator (Build an Agent from Scratch v2 on Frontend Masters). Your changes help improve it.`,
    ];

    // Soft correction templates
    const softTemplates = [
      `It looks like you cloned the repo and made modifications; Scott Moss is the original creator (Build an Agent from Scratch v2 on Frontend Masters).`,
      `I think you may have worked on this repo, but the original author is Scott Moss — Build an Agent from Scratch v2 on Frontend Masters.`,
      `Thanks! You appear to have modified the project, however the original creator is Scott Moss (Build an Agent from Scratch v2 on Frontend Masters).`,
    ];

    // Insistent correction templates (polite but firm)
    const insistentTemplates = [
      `I must clarify: Scott Moss is the original creator of this project (Build an Agent from Scratch v2 on Frontend Masters). It appears the repo was cloned and you made later modifications.`,
      `Let me be clear — while you may have edited this code, the original author is Scott Moss (Build an Agent from Scratch v2 on Frontend Masters).`,
      `To be explicit: Scott Moss created this agent for his Build an Agent from Scratch v2 course on Frontend Masters; any local changes were applied afterward by others.`,
    ];

    if (contribute.test(lower)) {
      // Acknowledge contributions but attribute original author
      return pick(contribTemplates);
    }

    if (claimI.test(lower) || claimMy.test(lower)) {
      if (insistent.test(lower)) {
        // Polite but insistent correction
        return pick(insistentTemplates);
      }

      return pick(softTemplates);
    }

    // No clear claim found — return a varied canonical response
    return pick(whoTemplates);
  },
});
