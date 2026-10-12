import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lịch Vạn Niên Đại Việt - Tra cứu Âm Dương, Ngày Tốt Xấu, Tử Vi & Sao Hạn',
  description: 'Website tra cứu Lịch Vạn Niên chuẩn xác, đổi ngày âm dương, xem ngày hoàng đạo tốt xấu, lập lá số tử vi trọn đời, xem sao hạn và gieo quẻ Kinh Dịch.',
};

import { DongSonBackgroundWatermark } from '@/components/HeritageDecorations';
import DynamicBrandHead from '@/components/DynamicBrandHead';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fcfaf5] text-[#2c1d11] relative">
        <DynamicBrandHead />
        <DongSonBackgroundWatermark />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
