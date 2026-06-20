import { Story } from "@/types/story";

export const stories: Story[] = [
  {
    id: 1,
    title: "TỤ CHẠNG VẠNG",
    slides: [
      { type: "image", src: "/images/tuchangvangsn.jpg" },
      { type: "image", src: "/images/tuchangvangsn.jpg" },
      { type: "youtube", videoId: "9z49qb8H8T0" },
    ],
    href: "/shop/tu-chang-vang",
  },
  {
    id: 2,
    title: "TỤ VÀNG",
    slides: [
      { type: "image", src: "/images/tuvangsn.jpg" },
      { type: "youtube", videoId: "v5g_3-dIoJ0" },
    ],
    href: "/shop/tu-vang",
  },
  {
    id: 3,
    title: "TỤ LAM",
    slides: [
      { type: "image", src: "/images/tulamsn.jpg" },
    ],
    href: "/shop/tu-lam",
  },
];