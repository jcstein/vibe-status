export interface ServiceConfig {
  key: string;
  name: string;
  statusPageUrl: string;
}

export const services: ServiceConfig[] = [
  { key: "claude", name: "Claude", statusPageUrl: "https://status.claude.com" },
  { key: "github", name: "GitHub", statusPageUrl: "https://www.githubstatus.com" },
  { key: "vercel", name: "Vercel", statusPageUrl: "https://www.vercel-status.com" },
  { key: "netlify", name: "Netlify", statusPageUrl: "https://www.netlifystatus.com" },
  { key: "npm", name: "npm", statusPageUrl: "https://status.npmjs.org" },
  { key: "linear", name: "Linear", statusPageUrl: "https://linearstatus.com" },
  { key: "figma", name: "Figma", statusPageUrl: "https://status.figma.com" },
];
