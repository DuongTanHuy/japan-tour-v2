import { PolaroidCard, TimelineNode, BentoItem } from "./types";

// Dynamic generated images paths
import heroBg from '@/assets/images/mst_mountains_1781512525097.jpg';
import heroFg from '@/assets/images/kimono_fg_1781512543879.jpg';
import bookBg from '@/assets/images/contact_fuji_1781512560499.jpg';

export { heroBg as HERO_BG_IMAGE, heroFg as HERO_FG_IMAGE, bookBg as BOOK_BG_IMAGE };

export const polaroidCards: PolaroidCard[] = [
  {
    id: "p1",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    caption: "3 cities in Japan",
  },
  {
    id: "p2",
    imageUrl:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop",
    caption: "10 days",
  },
  {
    id: "p3",
    imageUrl:
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=600&auto=format&fit=crop",
    caption: "gigabytes of photos",
  },
  {
    id: "p4",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
    caption: "eat ramen",
  },
  {
    id: "p5",
    imageUrl:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop",
    caption: "enjoy the vibe",
  },
];

export const timelineTour: TimelineNode[] = [
  {
    id: "t1",
    days: "Days 1–3",
    city: "Osaka",
    photos: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600&auto=format&fit=crop", // Osaka Castle
      "https://images.unsplash.com/photo-1764071288946-da85ee08ad8f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Osaka skyline
    ],
  },
  {
    id: "t2",
    days: "Days 4–6",
    city: "Kyoto",
    photos: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop", // Pagoda
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop", // Torii red path
    ],
  },
  {
    id: "t3",
    days: "Days 7–10",
    city: "Tokyo",
    photos: [
      "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Shibuya
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop", // Tokyo quiet narrow lane
    ],
  },
];

export const bentoItems: BentoItem[] = [
  {
    id: "b1",
    title: "Guides",
    description: "2 awesome guides who know everything about Japan!",
    iconName: "Compass",
  },
  {
    id: "b2",
    title: "Flights",
    description: "Routes: Moscow — Osaka, Tokyo — Moscow",
    iconName: "Plane",
  },
  {
    id: "b3",
    title: "Transfers",
    description: "From the airport to your hotels automatically organized",
    iconName: "Car",
  },
  {
    id: "b4",
    title: "Hotels",
    description:
      "Comfortable accommodation, 2 people per room (breakfast included)",
    iconName: "Hotel",
  },
];
