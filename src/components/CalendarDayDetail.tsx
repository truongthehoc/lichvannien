'use client';

import React from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sun, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ShieldAlert,
  Star,
  Quote,
  Landmark
} from 'lucide-react';
import { LunarDate, getFullDateDetails } from '@/utils/amlich';
import { getNgayTotXau } from '@/utils/ngaytotxau';
import { getDailyQuote, getDailyVNEvents } from '@/utils/danhngon_sukien';
import { get12ZodiacDailySummary } from '@/utils/tuvihangngay';

interface CalendarDayDetailProps {
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
}

export function DayHeroCard({ currentDate, onDateChange }: { currentDate: Date; onDateChange: (newDate: Date) => void }) {
  const dayDetails: LunarDate = getFullDateDetails(currentDate);
  const ngayTotXau = getNgayTotXau(
    dayDetails.jd,
    dayDetails.lunarDay,
    dayDetails.lunarMonth,
    dayDetails.canDay,
    dayDetails.chiDay
  );

  const dailyQuote = getDailyQuote(dayDetails.solarDay, dayDetails.solarMonth);
  const dailyVNEvents = getDailyVNEvents(dayDetails.solarDay, dayDetails.solarMonth);

  const prevDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() - 1);
    onDateChange(next);
  };

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    onDateChange(next);
  };

  const today = () => {
    onDateChange(new Date());
  };

  return (
    <div className="bg-gradient-to-br from-[#991b1b] via-[#b91c1c] to-[#7f1d1d] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-amber-500/40 relative overflow-hidden flex flex-col justify-start h-full space-y-3">
      {/* Background Watermark Lunar Day */}
      <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none text-9xl font-serif select-none">
        {dayDetails.lunarDay}
      </div>

      {/* ===== 1. KHỐI THÔNG TIN TỜ LỊCH NGÀY (SÁT TRÊN) ===== */}
      <div className="space-y-2.5 relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-red-400/30 pb-2">
          <button
            onClick={prevDay}
            className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-sm transition-all text-amber-200"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Ngày trước</span>
          </button>

          <button
            onClick={today}
            className="text-xs bg-amber-400 text-red-950 font-bold px-3 py-1 rounded-lg shadow hover:bg-amber-300 transition-all"
          >
            Hôm Nay
          </button>

          <button
            onClick={nextDay}
            className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-sm transition-all text-amber-200"
          >
            <span>Ngày sau</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dương Lịch & Âm Lịch Side-by-side */}
        <div className="grid grid-cols-2 gap-3 items-center">
          {/* Dương Lịch */}
          <div className="border-r border-red-400/30 pr-3 text-center sm:text-left">
            <div className="text-amber-300 font-medium text-[10px] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>DƯƠNG LỊCH</span>
            </div>
            <div className="text-5xl font-bold font-serif text-white tracking-tight drop-shadow-md my-0.5">
              {dayDetails.solarDay}
            </div>
            <div className="text-amber-100 text-xs font-medium">
              Tháng {dayDetails.solarMonth} / {dayDetails.solarYear}
            </div>
            <div className="text-amber-200 text-xs font-bold">
              {dayDetails.dayOfWeekName}
            </div>
            {dayDetails.holiday && (
              <div className="mt-1 inline-block bg-amber-400 text-red-950 font-bold text-[10px] px-2 py-0.5 rounded-full shadow truncate max-w-full">
                🎉 {dayDetails.holiday}
              </div>
            )}
          </div>

          {/* Âm Lịch */}
          <div className="pl-2 text-center sm:text-left">
            <div className="text-amber-300 font-medium text-[10px] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <Sun className="w-3 h-3" />
              <span>ÂM LỊCH</span>
            </div>
            <div className="flex items-baseline justify-center sm:justify-start gap-1 my-0.5">
              <span className="text-5xl font-bold font-serif text-amber-300 drop-shadow-md">
                {dayDetails.lunarDay}
              </span>
              <span className="text-xs text-amber-100 font-serif">
                / Thg {dayDetails.lunarMonth} {dayDetails.isLeap ? '(N)' : ''}
              </span>
            </div>
            <div className="text-amber-200 text-xs font-medium space-y-0.5 leading-snug">
              <div>Ngày: <strong className="text-white">{dayDetails.canChiDay}</strong></div>
              <div>Tháng: <strong className="text-white">{dayDetails.canChiMonth}</strong></div>
              <div>Năm: <strong className="text-white">{dayDetails.canChiYear}</strong></div>
            </div>
            {dayDetails.lunarHoliday && (
              <div className="mt-1 inline-block bg-red-800 text-amber-200 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-400/50 shadow truncate max-w-full">
                🏮 {dayDetails.lunarHoliday}
              </div>
            )}
          </div>
        </div>

        {/* Rating & Hoang Dao Badge */}
        <div className="pt-2 border-t border-red-400/30 flex items-center justify-between gap-2 text-xs">
          <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow text-[11px] ${
            dayDetails.isHoangDao ? 'bg-emerald-500 text-white' : 'bg-stone-700 text-amber-200'
          }`}>
            <Sparkles className="w-3 h-3" />
            <span>{dayDetails.hoangDaoType}</span>
          </span>

          <span className={`font-bold px-2.5 py-0.5 rounded-md text-[11px] ${
            ngayTotXau.rating === 'Đại Cát' ? 'bg-amber-400 text-red-950 font-bold' :
            ngayTotXau.rating === 'Tiểu Cát' ? 'bg-emerald-400 text-emerald-950' :
            ngayTotXau.rating === 'Bình Thường' ? 'bg-blue-400 text-blue-950' :
            'bg-red-400 text-red-950'
          }`}>
            {ngayTotXau.rating} ({ngayTotXau.score}/100)
          </span>
        </div>
      </div>

      {/* ===== 2. DANH NGÔN NGÀY MỚI (SÁT VỚI LỊCH PHÍA TRÊN) ===== */}
      <div className="bg-black/25 backdrop-blur-md p-3 rounded-xl border border-amber-300/30 space-y-1 relative z-10 shadow-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
          <Quote className="w-3 h-3 text-amber-400" />
          <span>Danh Ngôn Ngày Mới</span>
        </div>
        <p className="text-xs text-amber-50 leading-relaxed font-serif italic">
          &ldquo;{dailyQuote.quote}&rdquo;
        </p>
        <div className="text-right text-[10px] font-bold text-amber-300">
          — {dailyQuote.author}
        </div>
      </div>

      {/* ===== 3. SỰ KIỆN LỊCH SỬ VIỆT NAM (LIỀN KỀ) ===== */}
      <div className="bg-black/25 backdrop-blur-md p-3 rounded-xl border border-amber-300/30 space-y-1.5 relative z-10 shadow-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Sự Kiện Lịch Sử Việt Nam ({dayDetails.solarDay}/{dayDetails.solarMonth})</span>
        </div>
        <div className="space-y-1.5">
          {dailyVNEvents.map((evt, idx) => (
            <div key={idx} className="border-t border-white/10 pt-1 text-xs">
              <div className="font-bold text-amber-200 text-[11px]">
                [{evt.year}] {evt.title}
              </div>
              <p className="text-[11px] text-amber-100/80 leading-snug mt-0.5">
                {evt.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 4. DIỆN TÍCH DƯỚI: HỌA TIẾT HOA VĂN DÂN TỘC / TRỐNG ĐỒNG ĐÔNG SƠN ===== */}
      <div className="flex-1 min-h-[90px] rounded-xl border border-amber-400/20 bg-black/15 backdrop-blur-xs relative overflow-hidden flex items-center justify-center p-3 select-none">
        {/* SVG Trống Đồng & Họa Tiết Văn Hóa Đại Việt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-48 h-48 text-amber-300 animate-[spin_120s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Vòng tròn trung tâm & Ngôi sao 14 cánh */}
            <circle cx="200" cy="200" r="180" strokeDasharray="6 4" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="120" strokeDasharray="3 3" />
            <circle cx="200" cy="200" r="90" />
            <circle cx="200" cy="200" r="60" strokeDasharray="4 2" />
            <circle cx="200" cy="200" r="30" />
            {/* Ngôi sao trung tâm */}
            <polygon points="200,165 208,192 235,200 208,208 200,235 192,208 165,200 192,192" fill="currentColor" opacity="0.4" />
            {/* Chim Lạc bay quanh mặt trời */}
            <path d="M 200,30 Q 230,80 270,70 Q 240,110 200,90 Z" fill="currentColor" opacity="0.3" />
            <path d="M 370,200 Q 320,230 330,270 Q 290,240 310,200 Z" fill="currentColor" opacity="0.3" />
            <path d="M 200,370 Q 170,320 130,330 Q 160,290 200,310 Z" fill="currentColor" opacity="0.3" />
            <path d="M 30,200 Q 80,170 70,130 Q 110,160 90,200 Z" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Chữ truyền thống chìm tao nhã */}
        <div className="relative z-10 text-center space-y-1 text-amber-200/75">
          <div className="text-[11px] font-serif font-bold tracking-widest uppercase">
            ✦ TINH HOA ĐẠI VIỆT ✦
          </div>
          <div className="text-[10px] text-amber-300/60 font-serif italic">
            Quốc thái dân an • Vạn sự như ý
          </div>
        </div>
      </div>
    </div>
  );
}

export function DayDetailedPanels({ currentDate }: { currentDate: Date }) {
  const dayDetails: LunarDate = getFullDateDetails(currentDate);
  const ngayTotXau = getNgayTotXau(
    dayDetails.jd,
    dayDetails.lunarDay,
    dayDetails.lunarMonth,
    dayDetails.canDay,
    dayDetails.chiDay
  );

  return (
    <div className="space-y-6">
      {/* Khối 1: Giờ Hoàng Đạo trong ngày - Full width across screen */}
      <div className="heritage-card p-5 sm:p-6 bg-white border border-[#e5d5c5]">
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2 text-[#8b1818] font-serif font-bold text-lg">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>Khung Giờ Hoàng Đạo & Hắc Đạo Trong Ngày</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-800 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Giờ Hoàng Đạo (Tốt)</span>
            </span>
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span>
              <span>Giờ Hắc Đạo</span>
            </span>
          </div>
        </div>

        {/* 12 giờ hiển thị 6 cột trên màn hình lớn, 3 cột trên tablet, 2 cột trên mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {dayDetails.gioHoangDao.map((gio, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                gio.isHoangDao
                  ? 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-sm ring-1 ring-amber-200'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-bold text-sm text-stone-900 truncate">{gio.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap ${
                  gio.isHoangDao ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {gio.isHoangDao ? 'Hoàng đạo' : 'Hắc đạo'}
                </span>
              </div>
              <div className="text-stone-500 text-xs font-mono font-medium">{gio.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Khối 2: 2 Cột cân đối: Trực & Sao vs Hướng Xuất Hành & Tuổi Xung */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột Trái: Trực, Nhị Thập Bát Tú & Ngũ Hành */}
        <div className="heritage-card p-5 sm:p-6 bg-white border border-[#e5d5c5] space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[#8b1818] font-serif font-bold text-lg pb-2 border-b border-amber-100">
            <Star className="w-5 h-5 text-amber-600" />
            <span>Trực, Sao & Ngũ Hành Nạp Âm</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80">
              <div className="flex items-center justify-between text-amber-900 font-bold mb-1">
                <span>Thập Nhị Trực: Trực {ngayTotXau.truc.name}</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">{ngayTotXau.truc.meaning}</p>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
              <div className="flex items-center justify-between text-emerald-950 font-bold mb-1">
                <span>Nhị Thập Bát Tú: Sao {ngayTotXau.nhiThapBatTu.name} ({ngayTotXau.nhiThapBatTu.animal})</span>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                  ngayTotXau.nhiThapBatTu.quality === 'Tốt' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {ngayTotXau.nhiThapBatTu.quality}
                </span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">{ngayTotXau.nhiThapBatTu.meaning}</p>
              <p className="text-emerald-800 text-xs font-semibold mt-1.5">Lời khuyên: {ngayTotXau.nhiThapBatTu.advice}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Nạp âm Ngày:</span>
                <strong className="text-stone-800 text-xs">{dayDetails.napAmDay}</strong>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Tiết Khí:</span>
                <strong className="text-stone-800 text-xs">{dayDetails.tietKhi}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Cột Phải: Hướng Xuất Hành & Tuổi Xung */}
        <div className="heritage-card p-5 sm:p-6 bg-white border border-[#e5d5c5] space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[#8b1818] font-serif font-bold text-lg pb-2 border-b border-amber-100">
            <Compass className="w-5 h-5 text-amber-600" />
            <span>Hướng Xuất Hành & Tuổi Xung Khắc</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Hướng xuất hành */}
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
              <h5 className="font-bold text-amber-900 mb-2.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-700" />
                <span>Hướng Tốt Xuất Hành Đầu Ngày:</span>
              </h5>
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                  <div className="text-stone-500 text-[11px] mb-0.5">Hỷ Thần</div>
                  <div className="font-bold text-red-700 text-sm">{ngayTotXau.huongXuatHanh.hyThan}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                  <div className="text-stone-500 text-[11px] mb-0.5">Tài Thần</div>
                  <div className="font-bold text-emerald-700 text-sm">{ngayTotXau.huongXuatHanh.taiThan}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 shadow-sm">
                  <div className="text-stone-500 text-[11px] mb-0.5">Hạc Thần (Né)</div>
                  <div className="font-bold text-stone-600 text-sm">{ngayTotXau.huongXuatHanh.hacThan}</div>
                </div>
              </div>
            </div>

            {/* Tuổi xung */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <h5 className="font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Tuổi Xung Khắc Trong Ngày:</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {ngayTotXau.tuoiXung.map((tuoi, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{tuoi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Khối 3: Việc Nên Làm & Việc Kiêng Cữ */}
      <div className="heritage-card p-5 sm:p-6 bg-white border border-[#e5d5c5]">
        <div className="flex items-center gap-2 text-[#8b1818] font-serif font-bold text-lg mb-4 pb-3 border-b border-amber-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Chi Tiết Việc Nên Làm & Việc Kiêng Cữ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Việc nên làm */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-3 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Nên Làm Trong Ngày:</span>
            </div>
            <ul className="space-y-2 text-stone-700">
              {ngayTotXau.recommendedActivities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Việc kiêng kỵ */}
          <div className="bg-red-50/50 p-4 rounded-xl border border-red-200">
            <div className="flex items-center gap-1.5 text-red-800 font-bold mb-3 text-sm">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Kiêng Kỵ Nên Tránh:</span>
            </div>
            <ul className="space-y-2 text-stone-700">
              {ngayTotXau.avoidActivities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-sm">✕</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cảnh báo ngày kỵ nếu có */}
        {(ngayTotXau.tamNuong || ngayTotXau.nguyetKy || ngayTotXau.duongCongKy || ngayTotXau.satChu || ngayTotXau.thoTu) && (
          <div className="mt-4 p-3.5 bg-amber-100/80 border border-amber-300 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Lưu ý ngày bách kỵ: </strong>
              <span>
                {[
                  ngayTotXau.tamNuong ? 'Ngày Tam Nương' : '',
                  ngayTotXau.nguyetKy ? 'Ngày Nguyệt Kỵ' : '',
                  ngayTotXau.duongCongKy ? 'Ngày Dương Công Kỵ' : '',
                  ngayTotXau.satChu ? 'Ngày Sát Chủ' : '',
                  ngayTotXau.thoTu ? 'Ngày Thọ Tử' : ''
                ].filter(Boolean).join(', ')}
                . Nên tránh khởi công các việc đại sự nếu không thật sự cấp bách.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Khối 4: Vận Thế 12 Con Giáp Ngày Này (Tử Vi Hàng Ngày) */}
      <div className="heritage-card p-5 sm:p-6 bg-white border border-[#e5d5c5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#8b1818] font-serif font-bold text-lg mb-4 pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Tử Vi Vận Mệnh 12 Con Giáp Hôm Nay</span>
          </div>
          <span className="text-xs font-sans font-normal text-stone-500">
            Dự báo cát hung theo Can Chi & Ngũ Hành ngày
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {get12ZodiacDailySummary(currentDate).map((z) => (
            <div
              key={z.index}
              className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center justify-between ${
                z.score >= 80
                  ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400'
                  : z.score >= 65
                  ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400'
                  : 'bg-rose-50/40 border-rose-200 hover:border-rose-400'
              }`}
            >
              <span className="text-2xl mb-1">{z.symbol}</span>
              <div className="font-serif font-bold text-xs text-stone-800">
                Tuổi {z.name} ({z.chiName})
              </div>
              <div className="text-[10px] text-stone-500 font-medium truncate max-w-full my-0.5">
                {z.relationType.split('(')[0].trim()}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs text-amber-700">
                  {z.score}đ
                </span>
                <span
                  className={`text-[8px] px-1.5 py-0.2 rounded-full font-bold ${
                    z.score >= 80
                      ? 'bg-emerald-100 text-emerald-800'
                      : z.score >= 65
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {z.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CalendarDayDetail({ currentDate, onDateChange }: CalendarDayDetailProps) {
  return (
    <div className="space-y-6">
      <DayHeroCard currentDate={currentDate} onDateChange={onDateChange} />
      <DayDetailedPanels currentDate={currentDate} />
    </div>
  );
}
