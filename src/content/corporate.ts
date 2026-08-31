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
    caption: "Gen AI training session with a corporate team",
  },
  {
    image: images.corporateGreatwhiteLobby,
    caption: "Corporate training group",
  },
  {
    image: images.corporateAnchorGroup,
    caption: "Corporate training group",
  },
  {
    image: images.corporateTeamOffice,
    caption: "Athenix training team",
  },
];
