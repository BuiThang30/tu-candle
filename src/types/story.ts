export type SlideItem =
  | { type: "image"; src: string }
  | { type: "youtube"; videoId: string };

export interface Story {
  id: number;
  title: string;
  slides: SlideItem[];
  href: string;
}