export type AuthorTrustSignal = {
  label: string;
  value: string;
  detail: string;
};

export const authorProfile = {
  name: "Miles McQueen",
  role: "Publisher, SaaS Signal",
  shortBio:
    "I publish SaaS Signal for software buyers who need a clear call before the demo calendar fills up. The work is simple: read the claims, pressure-test the buying case, and say where the tool is likely to disappoint.",
  statement:
    "I care less about feature lists and more about the week after the contract is signed. Who owns setup? What breaks first? Where does the real cost hide? Those are the questions that save teams money.",
  contactPath: "/contact",
  trustSignals: [
    {
      label: "Editorial stance",
      value: "Buyer first",
      detail: "Reviews are written for the person who has to explain the purchase later, not for the vendor trying to close it."
    },
    {
      label: "Money model",
      value: "Labeled sponsors",
      detail: "Paid placements stay labeled and separate from the report logic. The site does not need to pretend every tool is a winner."
    },
    {
      label: "Correction path",
      value: "Open inbox",
      detail: "If a claim is stale, thin, or wrong, send the evidence. Good corrections make the site more useful."
    }
  ],
  reviewPrinciples: [
    "Show the implementation cost before the pitch gets comfortable.",
    "Name the workflows where the tool breaks down.",
    "Prefer a narrow pilot over a big promise.",
    "Treat missing limits as risk, not fine print."
  ]
} as const;
