import { Story } from "@/types/story";

export const stories: Story[] = [
  {
    id: 1,
    title: "TỤ CHẠNG VÀNG",
    slides: [
      { type: "image", src: "/images/tuchangvangsn.jpg" },
      { type: "image", src: "/images/tuchangvangsn.jpg" },
      { type: "youtube", videoId: "_w2PR0Sko8g" },
    ],
    href: "/shop/tu-chang-vang",
  },
  {
    id: 2,
    title: "TỤ VÀNG",
    slides: [
      { type: "image", src: "/images/tuvangsn.jpg" },
      { type: "youtube", videoId: "6uVJqD2hSGQ" },
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