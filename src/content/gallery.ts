import { GalleryItem } from "@/types";
import { images } from "./images";

export const trainingGallery: GalleryItem[] = [
  { image: images.trainerStage2, category: "Stage" },
  { image: images.corporateGreatwhiteBoardroom, category: "Corporate" },
  { image: images.corporateGreatwhiteLobby, category: "Corporate" },
  { image: images.corporateAnchorGroup, category: "Corporate" },
  { image: images.corporateTeamOffice, category: "Team" },
  { image: images.liveSessionCall, category: "Workshop" },
];

export const galleryCategories = ["All", "Stage", "Corporate", "Team", "Workshop"] as const;
