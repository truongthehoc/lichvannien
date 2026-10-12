'use client';

import React, { useState } from 'react';
import Header, { ActiveTab } from '@/components/Header';
import Footer from '@/components/Footer';
import CalendarMonth from '@/components/CalendarMonth';
import { DayHeroCard, DayDetailedPanels } from '@/components/CalendarDayDetail';
import ConvertDateTool from '@/components/ConvertDateTool';
import NgayTotXauViewer from '@/components/NgayTotXauViewer';
import TuViViewer from '@/components/TuViViewer';
import TuViHangNgayViewer from '@/components/TuViHangNgayViewer';
import ThanSoHocViewer from '@/components/ThanSoHocViewer';
import SaoHanViewer from '@/components/SaoHanViewer';
import GieoQueViewer from '@/components/GieoQueViewer';
import ThuocLoBanViewer from '@/components/ThuocLoBanViewer';
import AboutUsViewer from '@/components/AboutUsViewer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSelectDateFromChild = (date: Date) => {
    setSelectedDate(date);
    setActiveTab('calendar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* TAB 1: LỊCH VẠN NIÊN (THÁNG & NGÀY) */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Row: Lịch Tháng (Trái) & Tờ Lịch Ngày (Phải) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
                <CalendarMonth
                  selectedDate={selectedDate}
                  onSelectDate={(newDate) => setSelectedDate(newDate)}
                />
              </div>

              <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
                <DayHeroCard
                  currentDate={selectedDate}
                  onDateChange={(newDate) => setSelectedDate(newDate)}
                />
              </div>
            </div>

            {/* Bottom Row: Chi Tiết Giờ Hoàng Đạo, Trực, Sao, Xuất Hành & Kiêng Cữ (Full-width) */}
            <DayDetailedPanels currentDate={selectedDate} />
          </div>
        )}

        {/* TAB 2: TỬ VI MỖI NGÀY */}
        {activeTab === 'tuvihangngay' && (
          <div className="animate-fadeIn">
            <TuViHangNgayViewer onSelectDateDirectly={handleSelectDateFromChild} />
          </div>
        )}

        {/* TAB 3: ĐỔI NGÀY ÂM DƯƠNG */}
        {activeTab === 'convert' && (
          <div className="animate-fadeIn">
            <ConvertDateTool />
          </div>
        )}

        {/* TAB 3: XEM NGÀY TỐT XẤU */}
        {activeTab === 'ngaytot' && (
          <div className="animate-fadeIn">
            <NgayTotXauViewer onSelectDate={handleSelectDateFromChild} />
          </div>
        )}

        {/* TAB 4: TỬ VI TRỌN ĐỜI */}
        {activeTab === 'tuvi' && (
          <div className="animate-fadeIn">
            <TuViViewer />
          </div>
        )}

        {/* TAB 5: SAO HẠN & GIẢI HẠN */}
        {activeTab === 'saohan' && (
          <div className="animate-fadeIn">
            <SaoHanViewer />
          </div>
        )}

        {/* TAB 6: THẦN SỐ HỌC PITAGO (BẢN THÂN, CRUSH, CẶP ĐÔI) */}
        {activeTab === 'thansohoc' && (
          <div className="animate-fadeIn">
            <ThanSoHocViewer />
          </div>
        )}

        {/* TAB 7: GIEO QUẺ KINH DỊCH */}
        {activeTab === 'gieoque' && (
          <div className="animate-fadeIn">
            <GieoQueViewer />
          </div>
        )}

        {/* TAB 8: THƯỚC LỖ BAN */}
        {activeTab === 'thuocloban' && (
          <div className="animate-fadeIn">
            <ThuocLoBanViewer />
          </div>
        )}

        {/* TAB 9: VỀ CHÚNG TÔI & DONATE */}
        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <AboutUsViewer />
          </div>
        )}
      </main>

      <Footer onNavigateTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
