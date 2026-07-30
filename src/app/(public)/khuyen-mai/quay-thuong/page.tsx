import { Metadata } from "next";
import { LuckyDrawClient } from "@/components/lucky-wheel/LuckyDrawClient";
import { Prize } from "@/types/promotion";

export const metadata: Metadata = {
  title: "Vòng Quay May Mắn | Lonking",
  description: "Tham gia vòng quay may mắn để nhận nhiều phần quà hấp dẫn.",
};

// Removed GraphQL imports since we now use REST API

export const revalidate = 60; // Revalidate every minute

export default async function LuckyWheelPage() {
  let prizes: Prize[] = [];
  let segments: { prizeId: string; color: string }[] = [];

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/lucky/v1/prizes`;
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        prizes = data.data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          type: "GIAI_NHI", // Default to GIAI_NHI for now
          quantity: item.quantity,
          image: item.imageUrl || "",
          probability: 10,
        }));
      }
    }

    // Add a "Chúc may mắn" (Miss) prize
    const missPrizeId = "MISS_PRIZE_ID";
    prizes.push({
      id: missPrizeId,
      name: "Chúc may mắn",
      type: "TRUOT",
      quantity: 6, // Number of miss segments
      image: "",
      probability: 70,
    });

    // Create segments logic
    // We want a total of 12 segments: distribute prizes and misses
    const totalSegments = 12;
    const realPrizeCount = prizes.filter(p => p.id !== missPrizeId).length;

    // Simple distribution: alternate real prizes and miss prizes
    const colors = ["#FFD700", "#d32f2f"];
    for (let i = 0; i < totalSegments; i++) {
      if (i % 2 === 0 && realPrizeCount > 0) {
        // Even indices get real prizes (cycle through them)
        const prizeIndex = (i / 2) % realPrizeCount;
        segments.push({ prizeId: prizes[prizeIndex].id, color: colors[i % 2] });
      } else {
        // Odd indices get miss prize
        segments.push({ prizeId: missPrizeId, color: colors[i % 2] });
      }
    }

  } catch (error) {
    console.error("Failed to fetch prizes from WP:", error);
    // Fallback if it fails so the wheel isn't empty
    prizes = [
      { id: "p1", name: "Giải Đặc Biệt", type: "GIAI_NHAT", quantity: 1, image: "", probability: 5 },
      { id: "p2", name: "Giải Nhất", type: "GIAI_NHI", quantity: 2, image: "", probability: 10 },
      { id: "p3", name: "Giải Nhì", type: "GIAI_NHI", quantity: 3, image: "", probability: 15 },
    ];
    const missPrizeId = "MISS_PRIZE_ID";
    prizes.push({
      id: missPrizeId,
      name: "Chúc may mắn",
      type: "TRUOT",
      quantity: 6,
      image: "",
      probability: 70,
    });

    const totalSegments = 12;
    const colors = ["#FFD700", "#d32f2f"];
    const realPrizeCount = prizes.filter(p => p.id !== missPrizeId).length;
    for (let i = 0; i < totalSegments; i++) {
      if (i % 2 === 0 && realPrizeCount > 0) {
        const prizeIndex = (i / 2) % realPrizeCount;
        segments.push({ prizeId: prizes[prizeIndex].id, color: colors[i % 2] });
      } else {
        segments.push({ prizeId: missPrizeId, color: colors[i % 2] });
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b30000] to-[#660000] pt-28 pb-16 overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-8 relative">
        {/* Festive Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-red-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 drop-shadow-lg uppercase leading-normal pt-2 mb-1">
            Quay Số Trúng Thưởng
          </h1>
          <p className="text-yellow-100 text-lg md:text-xl max-w-2xl font-medium drop-shadow-md">
            Quay vòng may mắn để trúng quà hấp dẫn nhất!
          </p>
        </div>

        <div className="flex justify-center items-center w-full">
          <LuckyDrawClient prizes={prizes} segments={segments} />
        </div>
      </div>
    </div>
  );
}
