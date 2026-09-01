import { GalleryItem } from "@/types";
import { images } from "./images";

export const trainingGallery: GalleryItem[] = [
  { image: images.corporateGreatwhiteBoardroom, category: "Corporate" },
  { image: images.corporateGreatwhiteLobby, category: "Corporate" },
  { image: images.corporateAnchorGroup, category: "Corporate" },
  { image: images.corporateSalesMarketingTeam, category: "Corporate" },
  { image: images.corporateRadhaKrishnaHr, category: "Corporate" },
  { image: images.liveSessionCall, category: "Workshop" },
];

export const galleryCategories = ["All", "Corporate", "Workshop"] as const;
