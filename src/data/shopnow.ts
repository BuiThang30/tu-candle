export type Specs = {
  thanhPhan: string;
  kichThuoc: string;
  muiHuong: string;
  trongLuong: string;
  quaTrinhChay: string;
  thoiGianChay: string;
  mauSac: string;
};

export type Spotify = {
  trackName: string;
  artist: string;
  url: string;
  albumArt: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  checkoutName: string;
  price: string;
  image: string;
  specs: Specs;
  concept: string;
  spotify: Spotify;
};

export const products: Product[] = [
  {
    id: "tu-chang-vang",
    slug: "tu-chang-vang",
    name: "TỤ CHẠNG VẠNG",
    checkoutName: "Chạng vạng",
    price: "295.000VNĐ",
    image: "/images/tuchangvangsn.jpg",

    specs: {
      thanhPhan: "SOY WAX MIXED, BẤC COTTON SỢI",
      kichThuoc: "180X60MM (CHIỀU CAO / ĐƯỜNG KÍNH)",
      muiHuong: "HƯƠNG THƠM NGUYÊN BẢN CỦA SÁP THANH NHẸ",
      trongLuong: "255G / 8,9 OZ",
      quaTrinhChay:
        "ĐƯỢC TÍNH TOÁN KỸ THUẬT ĐỂ TẠO HIỆU ỨNG TAN CHẢY ĐIỀU KHẮC ĐẸP MẮT",
      thoiGianChay: "~10 GIỜ",
      mauSac:
        "ĐƯỢC THIẾT KẾ CHUYỂN ĐỘNG PHÂN TẦNG. SẮC ĐỘ MÀU CÓ THỂ CHÊNH LỆCH NHẸ GIỮA CÁC MẺ ĐỔ — ĐÂY LÀ ĐẶC TÍNH TỰ NHIÊN HOÀN TOÀN BÌNH THƯỜNG CỦA CHẤT LIỆU SÁP",
    },

    concept:
      "Chúng tôi chọn một lối đi riêng so với phần lớn các chiếc nến được tạo ra ngoài kia. Không bó buộc mình trong một hình dáng sẵn có của chiếc cốc, tập trung vào kỹ thuật thiết kế thủ công, vẻ đẹp của sự tan chảy và tính nguyên bản của ngọn lửa. Với mỗi sắc độ màu, TỤ CANDLE thiết kế kỹ lưỡng kỹ thuật, để khi bấc lửa thắp lên, dòng chảy sáp sẽ tự thân dệt lên thành một tác phẩm nghệ thuật. Giờ đây, nến không còn là một vật phát sáng thuần túy. Nó là một quá trình. Một khoảnh khắc độc bản không thể tạo lại.",

    spotify: {
      trackName: "Meditation No.1",
      artist: "Laraaji, Brian Eno",
      url: "https://open.spotify.com/playlist/5w0q5eXvsDS73xj0YTqpBs?si=wRb8GqXTQleewkR253st-g&nd=1&dlsi=84d377203b854c8c",
      albumArt: null,
    },
  },

  {
    id: "tu-vang",
    slug: "tu-vang",
    name: "TỤ VÀNG",
    checkoutName: "Vàng",
    price: "295.000VNĐ",
    image: "/images/tuvangsn.jpg",

    specs: {
      thanhPhan: "SOY WAX MIXED, BẤC COTTON SỢI",
      kichThuoc: "180X60MM (CHIỀU CAO / ĐƯỜNG KÍNH)",
      muiHuong: "HƯƠNG THƠM NGUYÊN BẢN CỦA SÁP THANH NHẸ",
      trongLuong: "255G / 8,9 OZ",
      quaTrinhChay:
        "ĐƯỢC TÍNH TOÁN KỸ THUẬT ĐỂ TẠO HIỆU ỨNG TAN CHẢY ĐIỀU KHẮC ĐẸP MẮT",
      thoiGianChay: "~10 GIỜ",
      mauSac:
        "ĐƯỢC THIẾT KẾ CHUYỂN ĐỘNG PHÂN TẦNG. SẮC ĐỘ MÀU CÓ THỂ CHÊNH LỆCH NHẸ GIỮA CÁC MẺ ĐỔ — ĐÂY LÀ ĐẶC TÍNH TỰ NHIÊN HOÀN TOÀN BÌNH THƯỜNG CỦA CHẤT LIỆU SÁP",
    },

    concept:
      "Chúng tôi chọn một lối đi riêng so với phần lớn các chiếc nến được tạo ra ngoài kia. Không bó buộc mình trong một hình dáng sẵn có của chiếc cốc, tập trung vào kỹ thuật thiết kế thủ công, vẻ đẹp của sự tan chảy và tính nguyên bản của ngọn lửa. Với mỗi sắc độ màu, TỤ CANDLE thiết kế kỹ lưỡng kỹ thuật, để khi bấc lửa thắp lên, dòng chảy sáp sẽ tự thân dệt lên thành một tác phẩm nghệ thuật. Giờ đây, nến không còn là một vật phát sáng thuần túy. Nó là một quá trình. Một khoảnh khắc độc bản không thể tạo lại.",

    spotify: {
      trackName: "Meditation No.1",
      artist: "Laraaji, Brian Eno",
      url: "https://open.spotify.com/playlist/4O4mteJOR4c4dPZ5E7NQXk?si=PZpt-DyrTqWzcrmu9W-_yg&nd=1&dlsi=ec120cf81c5f4dd6",
      albumArt: null,
    },
  },

  {
    id: "tu-lam",
    slug: "tu-lam",
    name: "TỤ LAM",
    checkoutName: "Lam",
    price: "295.000VNĐ",
    image: "/images/tulamsn.jpg",

    specs: {
      thanhPhan: "SOY WAX MIXED, BẤC COTTON SỢI",
      kichThuoc: "180X60MM (CHIỀU CAO / ĐƯỜNG KÍNH)",
      muiHuong: "HƯƠNG THƠM NGUYÊN BẢN CỦA SÁP THANH NHẸ",
      trongLuong: "255G / 8,9 OZ",
      quaTrinhChay:
        "ĐƯỢC TÍNH TOÁN KỸ THUẬT ĐỂ TẠO HIỆU ỨNG TAN CHẢY ĐIỀU KHẮC ĐẸP MẮT",
      thoiGianChay: "~10 GIỜ",
      mauSac:
        "ĐƯỢC THIẾT KẾ CHUYỂN ĐỘNG PHÂN TẦNG. SẮC ĐỘ MÀU CÓ THỂ CHÊNH LỆCH NHẸ GIỮA CÁC MẺ ĐỔ — ĐÂY LÀ ĐẶC TÍNH TỰ NHIÊN HOÀN TOÀN BÌNH THƯỜNG CỦA CHẤT LIỆU SÁP",
    },

    concept:
      "Chúng tôi chọn một lối đi riêng so với phần lớn các chiếc nến được tạo ra ngoài kia. Không bó buộc mình trong một hình dáng sẵn có của chiếc cốc, tập trung vào kỹ thuật thiết kế thủ công, vẻ đẹp của sự tan chảy và tính nguyên bản của ngọn lửa. Với mỗi sắc độ màu, TỤ CANDLE thiết kế kỹ lưỡng kỹ thuật, để khi bấc lửa thắp lên, dòng chảy sáp sẽ tự thân dệt lên thành một tác phẩm nghệ thuật. Giờ đây, nến không còn là một vật phát sáng thuần túy. Nó là một quá trình. Một khoảnh khắc độc bản không thể tạo lại.",

    spotify: {
      trackName: "Meditation No.1",
      artist: "Laraaji, Brian Eno",
      url: "https://open.spotify.com/playlist/7mNK8nj4zol90sCct4TEN2?si=aRNl52vLS8ysUzOKMLMFsg&nd=1&dlsi=f457c8b18c034863",
      albumArt: null,
    },
  },
];

// Helper: lấy sản phẩm theo slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}