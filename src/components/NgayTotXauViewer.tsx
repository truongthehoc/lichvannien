'use client';

import React, { useState } from 'react';
import { Compass, Filter, Sparkles, CheckCircle2, Calendar, Star, ChevronRight, Clock } from 'lucide-react';
import { convertSolar2Lunar, getCanChiYear, getCanChiDay, jdn, getFullDateDetails } from '@/utils/amlich';
import { getNgayTotXau, NgayTotXauInfo } from '@/utils/ngaytotxau';

interface EventTypeOption {
  id: string;
  name: string;
  icon: string;
  keywords: string[];
}

const EVENT_TYPES: EventTypeOption[] = [
  { id: 'all_good', name: 'Tất cả Ngày Hoàng Đạo & Cát Nhật', icon: '🌟', keywords: [] },
  { id: 'wedding', name: 'Cưới hỏi, Đính hôn, Lễ dạm ngõ', icon: '💍', keywords: ['Cưới hỏi', 'Đính hôn'] },
  { id: 'opening', name: 'Khai trương, Mở tiệm, Ký hợp đồng', icon: '🎉', keywords: ['Khai trương', 'Ký hợp đồng', 'Giao dịch', 'Mở cửa hàng'] },
  { id: 'house', name: 'Động thổ, Làm nhà, Nhập trạch (Về nhà mới)', icon: '🏡', keywords: ['Nhập trạch', 'Làm nhà', 'Khởi công'] },
  { id: 'travel', name: 'Xuất hành, Đi xa, Bắt đầu chuyến đi', icon: '✈️', keywords: ['Xuất hành'] },
  { id: 'purchase', name: 'Mua xe, Mua đất đai, Giao dịch lớn', icon: '🚗', keywords: ['Giao dịch', 'Mua sắm tài sản'] },
  { id: 'prayer', name: 'Cầu phúc, Đi chùa, Cúng lễ tạ', icon: '🙏', keywords: ['Cúng tế', 'Cầu phúc', 'Làm việc thiện'] },
];

export default function NgayTotXauViewer({ onSelectDate }: { onSelectDate?: (d: Date) => void }) {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<string>('all_good');

  // Tính toán danh sách ngày tốt trong tháng được chọn
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const currentEvent = EVENT_TYPES.find(e => e.id === selectedEvent) || EVENT_TYPES[0];

  const goodDaysList = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(selectedYear, selectedMonth - 1, day);
    const jd = jdn(day, selectedMonth, selectedYear);
    const [lunarD, lunarM, lunarY, isLeap] = convertSolar2Lunar(day, selectedMonth, selectedYear, 7);
    const full = getFullDateDetails(dateObj);
    const info: NgayTotXauInfo = getNgayTotXau(jd, lunarD, lunarM, full.canDay, full.chiDay);

    // Lọc theo sự kiện
    let isMatch = false;
    if (selectedEvent === 'all_good') {
      isMatch = info.score >= 60 && full.isHoangDao;
    } else {
      isMatch = currentEvent.keywords.some(kw => 
        info.recommendedActivities.some(act => act.toLowerCase().includes(kw.toLowerCase())) ||
        info.truc.shouldDo.some(act => act.toLowerCase().includes(kw.toLowerCase()))
      ) && !info.avoidActivities.some(act => currentEvent.keywords.some(kw => act.toLowerCase().includes(kw.toLowerCase())))
        && !info.tamNuong && !info.nguyetKy && !info.duongCongKy;
    }

    if (isMatch) {
      goodDaysList.push({
        day,
        dateObj,
        solarText: `${day}/${selectedMonth}/${selectedYear}`,
        dayOfWeek: full.dayOfWeekName,
        lunarText: `${lunarD}/${lunarM} (${full.canChiDay})`,
        info,
        full
      });
    }
  }

  // Sắp xếp ngày điểm cao nhất lên đầu
  goodDaysList.sort((a, b) => b.info.score - a.info.score);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b1818] flex items-center justify-center gap-2">
          <Compass className="w-7 h-7 text-amber-600" />
          <span>Tra Cứu Ngày Lành Tháng Tốt Theo Việc</span>
        </h2>
        <p className="text-sm text-stone-600">
          Chọn ngày đại cát theo Thập Nhị Trực, Nhị Thập Bát Tú, Tránh ngày Bách Kỵ (Tam Nương, Nguyệt Kỵ, Sát Chủ)
        </p>
      </div>

      {/* Filter Box */}
      <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Chọn việc */}
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>Mục Đích Công Việc</span>
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            >
              {EVENT_TYPES.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.icon} {evt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn tháng */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Tháng Dương Lịch</span>
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn năm */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Năm Tra Cứu</span>
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            >
              {Array.from({ length: 20 }, (_, i) => 2024 + i).map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info bar */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
          <span>Tìm thấy <strong className="text-red-700 font-bold text-sm">{goodDaysList.length}</strong> ngày cát lợi phù hợp trong Tháng {selectedMonth}/{selectedYear}</span>
          <span className="text-amber-700 font-medium">✨ Ưu tiên ngày Hoàng Đạo & Cát Tinh chiếu mệnh</span>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {goodDaysList.length === 0 ? (
          <div className="heritage-card p-8 text-center text-stone-500 bg-white">
            <p className="text-base font-medium">Không tìm thấy ngày thực sự đại cát cho công việc này trong tháng {selectedMonth}/{selectedYear}.</p>
            <p className="text-xs text-stone-400 mt-1">Bạn có thể chuyển sang tra cứu tháng tiếp theo hoặc xem tất cả ngày Hoàng đạo.</p>
          </div>
        ) : (
          goodDaysList.map((item, idx) => (
            <div
              key={idx}
              className="heritage-card p-5 bg-white border border-[#ebdccb] hover:border-amber-400 transition-all hover:shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-4">
                  {/* Fixed Calendar Badge - Chuẩn xác, không bao giờ lệch hay tràn chữ */}
                  <div className="w-[72px] sm:w-[80px] rounded-xl overflow-hidden shadow-md border border-red-700 shrink-0 text-center bg-white flex flex-col">
                    <div className="bg-[#8b1818] text-amber-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1 px-1 truncate whitespace-nowrap">
                      {item.dayOfWeek}
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold font-serif text-[#8b1818] py-1 leading-none bg-gradient-to-b from-amber-50 to-orange-50/60">
                      {item.day}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#8b1818]">
                        Dương lịch: {item.solarText}
                      </h4>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        item.info.rating === 'Đại Cát' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {item.info.rating} ({item.info.score}đ)
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-0.5">
                      Âm lịch: <strong className="text-stone-800">{item.lunarText}</strong> • Hoàng đạo: <strong className="text-amber-700">{item.full.hoangDaoType}</strong>
                    </div>
                  </div>
                </div>

                {onSelectDate && (
                  <button
                    onClick={() => onSelectDate(item.dateObj)}
                    className="self-start sm:self-auto text-xs font-bold text-red-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Xem chi tiết ngày</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Badges & Stars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
                  <span className="text-stone-500 block">Thập Nhị Trực & Sao:</span>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    Trực {item.info.truc.name} • Sao {item.info.nhiThapBatTu.name} ({item.info.nhiThapBatTu.quality})
                  </div>
                </div>

                <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-stone-500 block">Cát Tinh Hội Tụ:</span>
                  <div className="font-semibold text-emerald-800 mt-0.5 truncate">
                    {item.info.saoTot.map(s => s.name).join(', ') || 'Nhiều sao tốt'}
                  </div>
                </div>

                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Hướng Xuất Hành:</span>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    Hỷ Thần: {item.info.huongXuatHanh.hyThan} • Tài Thần: {item.info.huongXuatHanh.taiThan}
                  </div>
                </div>
              </div>

              {/* Giờ Hoàng Đạo trong ngày này */}
              <div className="text-xs pt-1 flex flex-wrap items-center gap-1.5 text-stone-600">
                <span className="font-semibold text-amber-900 flex items-center gap-1 mr-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Giờ tốt:</span>
                </span>
                {item.full.gioHoangDao.filter(g => g.isHoangDao).map((g, gIdx) => (
                  <span key={gIdx} className="bg-amber-100/80 text-amber-950 px-2 py-0.5 rounded border border-amber-300 font-medium">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
