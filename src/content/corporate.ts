import { CorporateClient, CorporateGalleryItem } from "@/types";
import { images } from "./images";

export const corporateClients: CorporateClient[] = [
  { name: "Anchor Group" },
  { name: "Radhakrishna Foodland" },
  { name: "Greatwhite Global Pvt. Ltd." },
  { name: "Canara Bank" },
  { name: "GNIMS" },
  { name: "SBI" },
  { name: "Ira Skills" },
];

export const corporateFocusAreas: string[] = [
  "Generative AI",
  "Prompt Engineering",
  "AI Productivity",
  "Excel",
  "Power BI",
  "Data Analytics",
  "AI Automation",
  "AI Tools for Teams",
  "Role-Specific AI Workflows",
];

export const corporateGallery: CorporateGalleryItem[] = [
  {
    image: images.corporateGreatwhiteBoardroom,
    caption: "Gen AI training session — Greatwhite Global Pvt. Ltd.",
  },
  {
    image: images.corporateGreatwhiteLobby,
    caption: "Gen AI training group — Greatwhite Global Pvt. Ltd.",
  },
  {
    image: images.corporateAnchorGroup,
    caption: "Corporate training group — Anchor Group",
  },
  {
    image: images.corporateSalesMarketingTeam,
    caption: "Gen AI training — Sales & Marketing team",
  },
  {
    image: images.corporateRadhaKrishnaHr,
    caption: "AI Mentorship training — Radhakrishna Foodland HR team",
  },
];
