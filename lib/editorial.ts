import type { DirectoryRow } from "../types";

export type EditorialTake = {
  headline: string;
  verdict: string;
  bestMove: string;
  skipIf: string;
  gutCheck: string;
  checks: readonly [string, string, string];
};

type EditorialBuilder = (row: DirectoryRow) => EditorialTake;

function audienceFor(row: DirectoryRow): string {
  return row.useCaseName
    .replace(/^CRM For /, "")
    .replace(/^For /, "")
    .toLowerCase()
    .replaceAll("saas", "SaaS")
    .replaceAll("crm", "CRM")
    .replaceAll("hr", "HR");
}

function moneyLine(row: DirectoryRow): string {
  const [firstOption, secondOption, thirdOption] = row.optionLabels;
  return `${firstOption} gets the first look, ${secondOption} has to prove the extra effort, and ${thirdOption} is the cheap way to see if the team will actually change behavior.`;
}

function firstSignal(row: DirectoryRow): string {
  return row.comparisonRows[0].dimension;
}

function secondSignal(row: DirectoryRow): string {
  return row.comparisonRows[1].dimension;
}

function thirdSignal(row: DirectoryRow): string {
  return row.comparisonRows[2].dimension;
}

const editorialBuilders: Record<string, EditorialBuilder> = {
  "ai-tools": (row) => {
    const [firstOption, secondOption, thirdOption] = row.optionLabels;
    const audience = audienceFor(row);
    return {
      headline: `Most ${audience} should buy less AI than the demo suggests.`,
      verdict: `${moneyLine(row)} The mistake is chasing clever output. The win is getting work drafted, checked, and shipped without adding a new review burden.`,
      bestMove: `Start with ${firstOption} on one messy weekly task. If the review step feels heavier after two weeks, stop there.`,
      skipIf: `Skip ${secondOption} for now if nobody can explain who approves the output and where bad suggestions get caught.`,
      gutCheck: `${thirdOption} only matters if it improves ${firstSignal(row)} without making the team sound generic.`,
      checks: [
        `Ask for a demo using your own source material, not their polished sample.`,
        `Make the vendor show the review path before the writing path.`,
        `Kill the trial if the team saves time but loses its voice.`
      ]
    };
  },
  crm: (row) => {
    const [firstOption, secondOption, thirdOption] = row.optionLabels;
    const audience = audienceFor(row);
    return {
      headline: `${audience} do not need a prettier contact database.`,
      verdict: `${moneyLine(row)} The right CRM is the one people update after a bad call, not the one with the longest settings page.`,
      bestMove: `Put ${firstOption} in front of the person who hates admin work. If they can live with it, the team has a shot.`,
      skipIf: `Skip ${secondOption} if the sales process is still changing every week. Heavy setup will freeze bad habits in place.`,
      gutCheck: `${thirdOption} works only if it makes ${secondSignal(row)} obvious without another meeting.`,
      checks: [
        `Import twenty real contacts and watch how fast the first mistake appears.`,
        `Ask the vendor to show a lost deal, not only a won deal.`,
        `Do not buy until follow-up ownership is painfully clear.`
      ]
    };
  },
  analytics: (row) => {
    const [firstOption, secondOption, thirdOption] = row.optionLabels;
    const audience = audienceFor(row);
    return {
      headline: `${audience} should fix the question before buying the chart.`,
      verdict: `${moneyLine(row)} My bias is simple: if the team cannot name the decision this report will change, it is not analytics yet. It is decoration.`,
      bestMove: `Start with ${firstOption} only after one person owns event names, funnel definitions, and the weekly readout.`,
      skipIf: `Skip ${secondOption} if your current reports already disagree. A stronger tool will make the argument louder.`,
      gutCheck: `${thirdOption} is worth testing when ${thirdSignal(row)} matters more than executive polish.`,
      checks: [
        `Pick one metric that changes a real decision this month.`,
        `Make the vendor explain what happens when tracking is wrong.`,
        `Walk away if the demo cannot show a plain answer in five minutes.`
      ]
    };
  },
  automation: (row) => {
    const [firstOption, secondOption, thirdOption] = row.optionLabels;
    const audience = audienceFor(row);
    return {
      headline: `${audience} should automate the boring part, not the broken part.`,
      verdict: `${moneyLine(row)} Automation pays when the process is already clear. If the team still argues about who owns the handoff, software will not settle it.`,
      bestMove: `Use ${firstOption} on one repeatable workflow with a visible failure path. Quiet failures are expensive.`,
      skipIf: `Skip ${secondOption} if the setup needs a specialist before anyone sees value.`,
      gutCheck: `${thirdOption} is useful only if ${firstSignal(row)} stays readable after the third edit.`,
      checks: [
        `Write the manual process on one page before the demo.`,
        `Ask what breaks when a step fails at 11 p.m.`,
        `Do not automate work nobody has agreed to own.`
      ]
    };
  },
  "customer-support": (row) => {
    const [firstOption, secondOption, thirdOption] = row.optionLabels;
    const audience = audienceFor(row);
    return {
      headline: `${audience} should protect the queue before chasing features.`,
      verdict: `${moneyLine(row)} The best support tool is the one agents trust when the inbox is ugly. Everything else is brochure copy.`,
      bestMove: `Start with ${firstOption} on the tickets that make agents sigh. That is where the truth shows up.`,
      skipIf: `Skip ${secondOption} if bot accuracy is still a hope instead of a measured number.`,
      gutCheck: `${thirdOption} is worth a trial when ${secondSignal(row)} improves without hiding angry customers.`,
      checks: [
        `Replay ten bad tickets from last month inside the demo.`,
        `Ask how handoff notes survive a busy shift.`,
        `Do not buy if agents need a second screen to trust the first one.`
      ]
    };
  }
};

function buildDefaultTake(row: DirectoryRow): EditorialTake {
  const [firstOption, secondOption, thirdOption] = row.optionLabels;
  const audience = audienceFor(row);
  return {
    headline: `${audience} should buy for the next hard week, not the perfect quarter.`,
    verdict: `${moneyLine(row)} The smart move is to test the tool against work people already dislike doing.`,
    bestMove: `Start with ${firstOption} and one owner. No owner, no trial.`,
    skipIf: `Skip ${secondOption} if the team needs a committee to understand the setup.`,
    gutCheck: `${thirdOption} is worth keeping only if it changes a decision people already make.`,
    checks: [
      `Use real work in the demo.`,
      `Ask who owns the tool after launch.`,
      `Stop the trial if the setup feels like a second job.`
    ]
  };
}

export function getEditorialTake(row: DirectoryRow): EditorialTake {
  const builder = editorialBuilders[row.categorySlug] ?? buildDefaultTake;
  return builder(row);
}
