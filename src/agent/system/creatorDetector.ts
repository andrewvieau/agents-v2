export function isCreatorQuestion(text: string): boolean {
  const t = text.toLowerCase();
  const q1 = /\bwho (created|made|built) (this|the) (agent|bot|project|repo)\b/;
  const q2 = /\bwho (is|was) the (creator|author) of (this|the) (agent|bot|project)\b/;
  return q1.test(t) || q2.test(t);
}

export function isCreatorClaim(text: string): boolean {
  const t = text.toLowerCase();
  // First-person claims about this agent/repo
  const claim1 = /\b(i|we) (created|built|made|authored|wrote) (this|the|this agent|this repo|this project)\b/;
  const claim2 = /\b(this is my|my project|my repo|my agent)\b/;
  return claim1.test(t) || claim2.test(t);
}
