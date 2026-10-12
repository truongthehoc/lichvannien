'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { convertSolar2Lunar, getCanChiYear, getCanChiMonth, getHoangDaoDay, getCanChiDay, jdn, VIETNAMESE_HOLIDAYS, LUNAR_HOLIDAYS } from '@/utils/amlich';
import { HeritageCornerPattern } from '@/components/HeritageDecorations';

interface CalendarMonthProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export default function CalendarMonth({ selectedDate, onSelectDate }: CalendarMonthProps) {
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const jumpToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    onSelectDate(today);
  };

  // Tính số ngày trong tháng
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Ngày đầu tiên của tháng là thứ mấy (0: CN, 1: T2... 6: T7)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  // Chuyển sang chuẩn T2 = 0, CN = 6
  const startDayOffset = (firstDayOfWeek + 6) % 7;

  // Lấy can chi năm và tháng âm lịch hiện tại
  const [midLunarDay, midLunarMonth, midLunarYear] = convertSolar2Lunar(15, currentMonth + 1, currentYear, 7);
  const canChiYear = getCanChiYear(midLunarYear).fullName;
  const canChiMonth = getCanChiMonth(midLunarMonth, midLunarYear).fullName;

  // Render grid items
  const calendarCells = [];

  // Ô trống đầu tháng
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(
      <div key={`empty-start-${i}`} className="min-h-[64px] sm:h-24 bg-stone-50/40 rounded-lg border border-stone-100/60 opacity-40"></div>
    );
  }

  // Các ngày trong tháng
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(currentYear, currentMonth, day);
    const dayOfWeek = dateObj.getDay(); // 0: CN, 6: T7
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const jd = jdn(day, currentMonth + 1, currentYear);
    const [lunarDay, lunarMonth, lunarYear, isLeap] = convertSolar2Lunar(day, currentMonth + 1, currentYear, 7);
    const canChiDayObj = getCanChiDay(jd);
    const hoangDaoInfo = getHoangDaoDay(lunarMonth, canChiDayObj.chiIndex);

    const solarHoliday = VIETNAMESE_HOLIDAYS[`${day}-${currentMonth + 1}`];
    const lunarHoliday = LUNAR_HOLIDAYS[`${lunarDay}-${lunarMonth}`];

    const isSelected = 
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;

    const isToday = 
      new Date().getDate() === day &&
      new Date().getMonth() === currentMonth &&
      new Date().getFullYear() === currentYear;

    const isRamOrMung1 = lunarDay === 1 || lunarDay === 15;

    calendarCells.push(
      <div
        key={`day-${day}`}
        onClick={() => onSelectDate(dateObj)}
        className={`min-h-[64px] sm:h-24 p-1 sm:p-2 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between relative group border ${
          isSelected
            ? 'bg-amber-100 border-amber-600 ring-2 ring-amber-500 shadow-md z-10'
            : isToday
            ? 'bg-red-50/70 border-red-400 font-medium'
            : 'bg-white hover:bg-amber-50/60 border-stone-200/80 hover:border-amber-300 shadow-sm'
        }`}
      >
        {/* Top: Solar day & Indicators */}
        <div className="flex items-center justify-between">
          <span
            className={`text-sm sm:text-xl font-bold font-serif ${
              isWeekend ? 'text-red-600' : 'text-stone-800'
            } ${isSelected ? 'text-red-900' : ''}`}
          >
            {day}
          </span>

          <div className="flex items-center gap-0.5 sm:gap-1">
            {/* Hoàng Đạo dot */}
            {hoangDaoInfo.isHoangDao && (
              <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 ring-1 ring-amber-300 shadow-xs" title="Ngày Hoàng Đạo" />
            )}
            {/* Holiday star */}
            {(solarHoliday || lunarHoliday) && (
              <span className="text-[9px] sm:text-[10px] text-red-500">★</span>
            )}
          </div>
        </div>

        {/* Middle: Lunar day / month */}
        <div className="text-right">
          <div className={`text-[11px] sm:text-sm font-medium ${
            isRamOrMung1 
              ? 'text-red-700 font-bold bg-amber-200/60 px-1 py-0.5 rounded inline-block text-[10px] sm:text-xs' 
              : 'text-stone-500'
          }`}>
            {lunarDay === 1 ? `${lunarDay}/${lunarMonth}` : lunarDay}
          </div>
        </div>

        {/* Bottom: Can chi mini note or holiday badge */}
        <div className="truncate text-[9px] sm:text-[10px] text-stone-400 group-hover:text-amber-800 transition-colors">
          {solarHoliday ? (
            <span className="text-red-600 font-medium truncate block">{solarHoliday}</span>
          ) : lunarHoliday ? (
            <span className="text-amber-700 font-medium truncate block">{lunarHoliday}</span>
          ) : (
            <span className="hidden xs:inline sm:inline">{canChiDayObj.fullName}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="heritage-card p-3 sm:p-6 bg-white border border-[#ebdccb] space-y-3 sm:space-y-4 relative overflow-hidden">
      {/* 4 Góc hoa văn truyền thống */}
      <div className="absolute top-1.5 left-1.5 pointer-events-none opacity-40">
        <HeritageCornerPattern className="w-5 h-5 text-amber-700" />
      </div>
      <div className="absolute top-1.5 right-1.5 pointer-events-none opacity-40 rotate-90">
        <HeritageCornerPattern className="w-5 h-5 text-amber-700" />
      </div>
      <div className="absolute bottom-1.5 left-1.5 pointer-events-none opacity-40 -rotate-90">
        <HeritageCornerPattern className="w-5 h-5 text-amber-700" />
      </div>
      <div className="absolute bottom-1.5 right-1.5 pointer-events-none opacity-40 rotate-180">
        <HeritageCornerPattern className="w-5 h-5 text-amber-700" />
      </div>

      {/* Month & Year Navigator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-amber-100 relative z-10">
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={prevMonth}
            className="p-1.5 sm:p-2 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-red-900 transition-colors"
            title="Tháng trước"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-2xl font-serif font-bold text-[#8b1818]">
              Tháng {currentMonth + 1} / {currentYear}
            </h2>
            <div className="text-[11px] sm:text-xs text-stone-500">
              Tháng {canChiMonth} • Năm {canChiYear}
            </div>
          </div>

          <button
            onClick={nextMonth}
            className="p-1.5 sm:p-2 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-red-900 transition-colors"
            title="Tháng sau"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Fast Selectors */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            className="flex-1 sm:flex-none text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg px-2 sm:px-2.5 py-1.5 font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                Tháng {i + 1}
              </option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="flex-1 sm:flex-none text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg px-2 sm:px-2.5 py-1.5 font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {Array.from({ length: 100 }, (_, i) => 1970 + i).map((y) => (
              <option key={y} value={y}>
                Năm {y}
              </option>
            ))}
          </select>

          <button
            onClick={jumpToToday}
            className="text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-red-950 font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            Hôm Nay
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs sm:text-sm font-bold text-stone-600">
        {WEEK_DAYS.map((w, idx) => (
          <div
            key={w}
            className={`py-2 rounded-md ${
              idx >= 5 ? 'bg-red-50 text-red-700' : 'bg-stone-50 text-stone-700'
            }`}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {calendarCells}
      </div>

      {/* Legend Footer */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Ngày Hoàng Đạo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-200 border border-amber-400" />
            <span>Mùng 1 / Ngày Rằm (15)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">★</span>
            <span>Ngày Lễ / Tết</span>
          </div>
        </div>
        <div className="text-stone-400 text-[11px]">
          Chạm vào ngày bất kỳ để xem chi tiết Tử vi & Giờ lành
        </div>
      </div>
    </div>
  );
}
