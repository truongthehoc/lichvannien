'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  DollarSign, 
  ShieldAlert, 
  Clock, 
  Compass, 
  Award, 
  Calendar as CalendarIcon, 
  ChevronRight,
  UserCheck,
  Flame,
  ArrowRightLeft
} from 'lucide-react';
import { 
  ZODIAC_LIST, 
  calculateDailyHoroscope, 
  get12ZodiacDailySummary, 
  getPopularBirthYears,
  PopularBirthYear
} from '@/utils/tuvihangngay';

interface TuViHangNgayViewerProps {
  onSelectDateDirectly?: (date: Date) => void;
}

export default function TuViHangNgayViewer({ onSelectDateDirectly }: TuViHangNgayViewerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedChiIndex, setSelectedChiIndex] = useState<number>(0); // 0: Tý
  const [activeSubTab, setActiveSubTab] = useState<'detail' | 'rankings'>('detail');
  const [selectedBirthYear, setSelectedBirthYear] = useState<number | ''>('');

  const popularYears = getPopularBirthYears();

  // Helper date changes
  const setQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setSelectedDate(d);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const parts = e.target.value.split('-');
      if (parts.length === 3) {
        const newD = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        setSelectedDate(newD);
      }
    }
  };

  const handleSelectBirthYear = (yearNum: number) => {
    setSelectedBirthYear(yearNum);
    const found = popularYears.find(y => y.year === yearNum);
    if (found) {
      setSelectedChiIndex(found.chiIndex);
    }
  };

  const currentHoroscope = calculateDailyHoroscope(selectedChiIndex, selectedDate);
  const zodiacSummaryList = get12ZodiacDailySummary(selectedDate);
  // Sort for rankings tab (highest score first)
  const rankedZodiacs = [...zodiacSummaryList].sort((a, b) => b.score - a.score);

  // Helper render rating stars
  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`text-sm ${
              s <= count ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDateInputValue = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const isToday = (d: Date) => {
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Date Controller */}
      <div className="bg-gradient-to-r from-[#8b1818] via-[#a32222] to-[#8b1818] rounded-2xl p-4 sm:p-6 text-white shadow-lg border border-amber-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-red-950 font-bold text-xs shadow">
                ✨ Luận Giải Hàng Ngày
              </span>
              <span className="text-xs text-amber-200">
                12 Con Giáp & Phong Thủy Ngày
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
              Tử Vi 12 Con Giáp Hôm Nay
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-0.5">
              Dự đoán công danh sự nghiệp, tài lộc tiền bạc, tình duyên gia đạo & phong thủy cát tường mỗi ngày
            </p>
          </div>

          {/* Quick Date Selectors */}
          <div className="flex flex-wrap items-center gap-2 bg-red-950/50 p-2 rounded-xl border border-amber-400/20">
            <button
              onClick={() => setQuickDate(-1)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors text-amber-100"
            >
              Hôm qua
            </button>
            <button
              onClick={() => setQuickDate(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isToday(selectedDate)
                  ? 'bg-amber-400 text-red-950 shadow'
                  : 'bg-red-900/60 text-amber-200 hover:bg-red-800'
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setQuickDate(1)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors text-amber-100"
            >
              Ngày mai
            </button>
            <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <input
                type="date"
                value={formatDateInputValue(selectedDate)}
                onChange={handleDateInputChange}
                className="bg-transparent text-amber-100 text-xs font-medium focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Date Info Bar */}
        <div className="mt-4 pt-3 border-t border-red-800/60 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200/90">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">🗓️ {currentHoroscope.solarDate}</span>
            <span>•</span>
            <span>Âm Lịch: <strong className="text-amber-300">{currentHoroscope.lunarDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Ngũ Hành Ngày: <strong className="text-white">{currentHoroscope.menhDay}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Tabs: Xem Chi Tiết vs Bảng Xếp Hạng May Mắn */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('detail')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'detail'
                ? 'bg-[#8b1818] text-amber-200 shadow-md scale-[1.02]'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Luận Giải Từng Tuổi</span>
          </button>
          <button
            onClick={() => setActiveSubTab('rankings')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'rankings'
                ? 'bg-[#8b1818] text-amber-200 shadow-md scale-[1.02]'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Bảng Xếp Hạng 12 Con Giáp</span>
          </button>
        </div>

        {/* Quick Year Selector Dropdown */}
        <div className="hidden sm:flex items-center gap-2">
          <label className="text-xs text-stone-500 font-medium">Chọn theo năm sinh:</label>
          <select
            value={selectedBirthYear}
            onChange={(e) => handleSelectBirthYear(Number(e.target.value))}
            className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">-- Chọn năm sinh --</option>
            {popularYears.map((py) => (
              <option key={py.year} value={py.year}>
                {py.year} - {py.canChi} ({py.menh.split('(')[0].trim()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. 12 Zodiac Animal Grid Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-2.5">
        {ZODIAC_LIST.map((z) => {
          const isSelected = selectedChiIndex === z.index;
          const summary = zodiacSummaryList.find(s => s.index === z.index);
          const score = summary?.score || 70;

          return (
            <button
              key={z.index}
              onClick={() => {
                setSelectedChiIndex(z.index);
                setActiveSubTab('detail');
              }}
              className={`p-2.5 rounded-xl border transition-all text-center flex flex-col items-center justify-between relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#8b1818] to-[#6d1313] text-white border-amber-400 shadow-md scale-105 ring-2 ring-amber-400/50'
                  : 'bg-white hover:bg-amber-50/50 text-stone-700 border-stone-200 hover:border-amber-300 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform">
                {z.symbol}
              </span>
              <div className="font-serif font-bold text-xs sm:text-sm leading-tight">
                {z.name}
              </div>
              <div className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                {z.chiName} • {z.element}
              </div>

              {/* Score indicator badge */}
              <div
                className={`mt-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  score >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : score >= 65
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {score}đ
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. MAIN CONTENT AREA */}
      {activeSubTab === 'detail' ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Overall Fortune Card */}
          <div className="heritage-card p-5 sm:p-6 bg-gradient-to-br from-white via-[#fffdf9] to-[#fcf7ed] border border-amber-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-amber-100">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl shadow-md border-2 border-white text-red-950">
                  {currentHoroscope.zodiac.symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#8b1818]">
                      Tử Vi Tuổi {currentHoroscope.zodiac.name} ({currentHoroscope.zodiac.chiName})
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                      Hành {currentHoroscope.zodiac.element}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {currentHoroscope.zodiac.personality} • {currentHoroscope.solarDate}
                  </p>
                </div>
              </div>

              {/* Overall Score Badge */}
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-amber-200 shadow-sm self-stretch sm:self-auto justify-between sm:justify-start">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                    Chỉ số cát vận
                  </div>
                  <div className="text-xs font-bold text-[#8b1818]">
                    {currentHoroscope.overallRating}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-amber-600">
                  {currentHoroscope.overallScore}<span className="text-sm font-normal text-stone-400">/100</span>
                </div>
              </div>
            </div>

            {/* Relation highlight & Overview text */}
            <div className="mt-4 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Cục diện ngày: {currentHoroscope.relationType}</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                {currentHoroscope.overviewText}
              </p>
            </div>
          </div>

          {/* 4 Pillars: Career, Wealth, Love, Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 1. Career */}
            <div className="heritage-card p-5 border border-amber-200/80 hover:border-amber-400 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                      Công Danh & Sự Nghiệp
                    </h4>
                    <p className="text-[11px] text-stone-500">Công việc, học tập, đàm phán</p>
                  </div>
                </div>
                {renderStars(currentHoroscope.stars.career)}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentHoroscope.careerText}
              </p>
            </div>

            {/* 2. Wealth */}
            <div className="heritage-card p-5 border border-amber-200/80 hover:border-amber-400 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                      Tài Lộc & Tiền Bạc
                    </h4>
                    <p className="text-[11px] text-stone-500">Thu chi, kinh doanh, đầu tư</p>
                  </div>
                </div>
                {renderStars(currentHoroscope.stars.wealth)}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentHoroscope.wealthText}
              </p>
            </div>

            {/* 3. Love */}
            <div className="heritage-card p-5 border border-amber-200/80 hover:border-amber-400 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                      Tình Cảm & Gia Đạo
                    </h4>
                    <p className="text-[11px] text-stone-500">Đào hoa, hòa khí gia đình</p>
                  </div>
                </div>
                {renderStars(currentHoroscope.stars.love)}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentHoroscope.loveText}
              </p>
            </div>

            {/* 4. Health */}
            <div className="heritage-card p-5 border border-amber-200/80 hover:border-amber-400 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                      Sức Khỏe & Tinh Thần
                    </h4>
                    <p className="text-[11px] text-stone-500">Thể lực, năng lượng, an toàn</p>
                  </div>
                </div>
                {renderStars(currentHoroscope.stars.health)}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentHoroscope.healthText}
              </p>
            </div>
          </div>

          {/* 5. Feng Shui & Lucky Highlights */}
          <div className="heritage-card p-5 sm:p-6 bg-amber-50/40 border border-amber-200">
            <h4 className="font-serif font-bold text-stone-800 text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Phong Thủy Cát Lành & Khai Vận Hôm Nay</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Lucky Numbers */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <span>🔢</span> Con số may mắn:
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {currentHoroscope.fengshui.luckyNumbers.map((n, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-sm flex items-center justify-center shadow-sm"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lucky Colors */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <span>🎨</span> Màu sắc vượng vận:
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentHoroscope.fengshui.luckyColors.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Noble Men (Quý nhân) */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Quý nhân phù trợ:
                </div>
                <div className="text-xs font-bold text-emerald-800">
                  {currentHoroscope.fengshui.nobleMen.join(', ')}
                </div>
              </div>

              {/* Unlucky Tuoi (Tiểu nhân / Tuổi xung) */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Tuổi kỵ / Đề phòng xung:
                </div>
                <div className="text-xs font-bold text-rose-700">
                  {currentHoroscope.fengshui.unluckyTuoi.join(', ')}
                </div>
              </div>

              {/* Best Hours (Giờ Hoàng Đạo) */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Giờ hoàng đạo đại cát:
                </div>
                <div className="text-xs font-semibold text-stone-700 leading-tight">
                  {currentHoroscope.fengshui.bestHours.join(' • ')}
                </div>
              </div>

              {/* Travel Directions */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-purple-600" /> Hướng xuất hành tốt:
                </div>
                <div className="text-xs text-stone-700">
                  Hỷ Thần: <strong className="text-purple-700">{currentHoroscope.fengshui.direction.hyThan}</strong> | 
                  Tài Thần: <strong className="text-amber-700">{currentHoroscope.fengshui.direction.taiThan}</strong>
                </div>
              </div>
            </div>

            {/* Golden Advice */}
            <div className="mt-4 p-3.5 bg-white rounded-xl border border-amber-300 flex items-start gap-2.5">
              <span className="text-amber-600 text-base leading-none">💡</span>
              <div className="text-xs text-stone-800 leading-relaxed">
                <strong className="text-[#8b1818] font-serif">Lời khuyên vàng trong ngày: </strong>
                {currentHoroscope.fengshui.goldenAdvice}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 5. RANKINGS & MATRIX COMPARISON VIEW FOR ALL 12 ZODIACS */
        <div className="heritage-card p-5 sm:p-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#8b1818]">
                Bảng Xếp Hạng Vận Thế 12 Con Giáp
              </h3>
              <p className="text-xs text-stone-500">
                {currentHoroscope.solarDate} ({currentHoroscope.canChiDay})
              </p>
            </div>
            <div className="text-xs text-stone-500 italic">
              * Nhấn vào con giáp để xem luận giải chi tiết
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rankedZodiacs.map((item, index) => {
              const isTop3 = index < 3;
              return (
                <div
                  key={item.index}
                  onClick={() => {
                    setSelectedChiIndex(item.index);
                    setActiveSubTab('detail');
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-md flex items-center justify-between ${
                    isTop3
                      ? 'bg-gradient-to-r from-amber-50 to-amber-100/40 border-amber-300'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-700">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div className="text-2xl">{item.symbol}</div>
                    <div>
                      <div className="font-serif font-bold text-sm text-stone-800 flex items-center gap-1.5">
                        <span>Tuổi {item.name}</span>
                        <span className="text-[11px] font-normal text-stone-500">({item.chiName})</span>
                      </div>
                      <div className="text-[11px] text-stone-500 truncate max-w-[130px]">
                        {item.relationType.split('(')[0].trim()}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-serif font-bold text-amber-700">
                      {item.score}đ
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold inline-block ${
                        item.score >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.score >= 65
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.rating}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
