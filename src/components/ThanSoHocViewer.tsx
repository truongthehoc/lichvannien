'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Heart, 
  Users, 
  Compass, 
  Gift, 
  ShieldAlert, 
  MessageCircle, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Lightbulb, 
  Flame, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  ArrowRight,
  Smile,
  Zap,
  Target
} from 'lucide-react';
import { 
  calculateLifePathNumber, 
  calculateDestinyNumber, 
  calculateSoulUrgeNumber, 
  calculatePersonalityNumber, 
  calculatePersonalYear, 
  calculateAttitudeNumber, 
  calculateBirthChart, 
  LIFE_PATH_DATA, 
  decodeCrush, 
  calculateCoupleCompatibility, 
  BirthChartResult,
  LifePathInterpretation
} from '@/utils/thansohoc';
import { HeritageCornerPattern, HeritageDivider } from './HeritageDecorations';

type ActiveNumerologyTab = 'self' | 'crush' | 'couple';

export default function ThanSoHocViewer() {
  const [activeTab, setActiveTab] = useState<ActiveNumerologyTab>('self');

  // State cho Tab 1: Bản Thân
  const [selfName, setSelfName] = useState('Nguyễn Văn An');
  const [selfDay, setSelfDay] = useState(15);
  const [selfMonth, setSelfMonth] = useState(8);
  const [selfYear, setSelfYear] = useState(1995);

  // State cho Tab 2: Crush
  const [crushName, setCrushName] = useState('Trần Thị Mai');
  const [crushDay, setCrushDay] = useState(20);
  const [crushMonth, setCrushMonth] = useState(10);
  const [crushYear, setCrushYear] = useState(1998);

  // State cho Tab 3: Cặp Đôi
  const [p1Name, setP1Name] = useState('Nguyễn Văn An');
  const [p1Day, setP1Day] = useState(15);
  const [p1Month, setP1Month] = useState(8);
  const [p1Year, setP1Year] = useState(1995);

  const [p2Name, setP2Name] = useState('Trần Thị Mai');
  const [p2Day, setP2Day] = useState(20);
  const [p2Month, setP2Month] = useState(10);
  const [p2Year, setP2Year] = useState(1998);

  // Tính toán Bản thân
  const selfLifePath = calculateLifePathNumber(selfDay, selfMonth, selfYear);
  const selfDestiny = calculateDestinyNumber(selfName);
  const selfSoulUrge = calculateSoulUrgeNumber(selfName);
  const selfPersonality = calculatePersonalityNumber(selfName);
  const selfPersonalYear = calculatePersonalYear(selfDay, selfMonth, 2026);
  const selfAttitude = calculateAttitudeNumber(selfDay, selfMonth);
  const selfBirthChart: BirthChartResult = calculateBirthChart(selfDay, selfMonth, selfYear);
  const selfLifePathInfo: LifePathInterpretation = LIFE_PATH_DATA[selfLifePath] || LIFE_PATH_DATA[2];

  // Tính toán Crush
  const crushResult = decodeCrush(crushName, crushDay, crushMonth, crushYear);

  // Tính toán Cặp đôi
  const coupleResult = calculateCoupleCompatibility(
    p1Name, p1Day, p1Month, p1Year,
    p2Name, p2Day, p2Month, p2Year
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] rounded-2xl p-5 sm:p-7 text-white shadow-xl border-2 border-amber-500/40 relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-4 -bottom-6 text-amber-200/[0.08] text-9xl font-serif font-black select-none pointer-events-none">
          ∞
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-red-950 font-bold text-xs shadow">
                ✨ Thần Số Học Pitago
              </span>
              <span className="text-xs text-amber-200">
                Giải mã cuộc đời qua các con số
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 flex items-center gap-2">
              Tra Cứu Thần Số Học
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl">
              Khám phá mật mã số mệnh của Bản Thân, giải mã tâm lý và cách cưa đổ Crush, xem độ hòa hợp tình duyên Cặp Đôi chuẩn xác theo trường phái Pythagoras.
            </p>
          </div>

          {/* Top Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-red-950/60 p-1.5 rounded-xl border border-amber-400/30 self-stretch md:self-auto justify-between sm:justify-start">
            <button
              onClick={() => setActiveTab('self')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'self'
                  ? 'bg-amber-400 text-red-950 shadow-md scale-[1.02]'
                  : 'text-amber-200 hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Bản Thân</span>
            </button>

            <button
              onClick={() => setActiveTab('crush')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'crush'
                  ? 'bg-amber-400 text-red-950 shadow-md scale-[1.02]'
                  : 'text-amber-200 hover:bg-white/10'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>Crush</span>
            </button>

            <button
              onClick={() => setActiveTab('couple')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'couple'
                  ? 'bg-amber-400 text-red-950 shadow-md scale-[1.02]'
                  : 'text-amber-200 hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4 text-purple-300" />
              <span>Cặp Đôi</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: THẦN SỐ HỌC BẢN THÂN */}
      {/* ========================================================================= */}
      {activeTab === 'self' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Input Form */}
          <div className="heritage-card p-5 sm:p-6 bg-white border border-[#ebdccb]">
            <div className="text-sm font-serif font-bold text-[#8b1818] mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>Nhập Thông Tin Tra Cứu Bản Thân:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Họ và Tên</label>
                <input
                  type="text"
                  value={selfName}
                  onChange={(e) => setSelfName(e.target.value)}
                  placeholder="Nhập họ và tên..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Ngày sinh</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={selfDay}
                  onChange={(e) => setSelfDay(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tháng sinh</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={selfMonth}
                  onChange={(e) => setSelfMonth(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Năm sinh</label>
                <input
                  type="number"
                  min="1920"
                  max="2030"
                  value={selfYear}
                  onChange={(e) => setSelfYear(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Hero Life Path Banner */}
          <div className="heritage-card p-6 bg-gradient-to-br from-[#fefbf6] via-white to-[#fcf5e8] border-2 border-amber-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-5 border-b border-amber-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-red-700 text-white font-serif font-black text-3xl sm:text-4xl flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-amber-400/30">
                  {selfLifePath}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                      Con Số Chủ Đạo
                    </span>
                    <span className="text-xs text-stone-500">
                      Hành {selfLifePathInfo.element}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#8b1818] mt-0.5">
                    {selfLifePathInfo.title}
                  </h3>
                  <p className="text-xs text-amber-800 font-medium">
                    Từ khóa: {selfLifePathInfo.keyword}
                  </p>
                </div>
              </div>

              {/* Core numbers grid */}
              <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-center shadow-xs">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Sứ Mệnh</div>
                  <div className="text-xl font-serif font-bold text-amber-700">{selfDestiny}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-center shadow-xs">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Linh Hồn</div>
                  <div className="text-xl font-serif font-bold text-rose-700">{selfSoulUrge}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-center shadow-xs">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Nhân Cách</div>
                  <div className="text-xl font-serif font-bold text-blue-700">{selfPersonality}</div>
                </div>
              </div>
            </div>

            {/* Quick Summary Traits */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selfLifePathInfo.traits.map((trait, i) => (
                <span key={i} className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-semibold rounded-lg border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{trait}</span>
                </span>
              ))}
              <span className="px-3 py-1 bg-purple-50 text-purple-900 text-xs font-semibold rounded-lg border border-purple-200">
                Năm cá nhân 2026: <strong>Số {selfPersonalYear}</strong>
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-lg border border-emerald-200">
                Thái độ: <strong>Số {selfAttitude}</strong>
              </span>
            </div>
          </div>

          {/* 2 Columns: Detailed Pillars & Birth Chart 3x3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Strengths, Weaknesses, Careers (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="heritage-card p-5 bg-white border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-base mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Ưu Điểm & Thế Mạnh Thiên Bẩm</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {selfLifePathInfo.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="heritage-card p-5 bg-white border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base mb-3">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span>Hạn Chế & Bài Học Rèn Luyện</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {selfLifePathInfo.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Career & Love Advice */}
              <div className="heritage-card p-5 sm:p-6 bg-white border border-amber-200 space-y-4">
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-base mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Ngành Nghề & Lĩnh Vực Tỏa Sáng Nhất</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selfLifePathInfo.careerPaths.map((c, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-900 font-medium text-xs rounded-xl border border-blue-200">
                        💼 {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <h4 className="font-serif font-bold text-stone-800 text-base mb-1.5 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <span>Lời Khuyên Trong Tình Yêu & Hôn Nhân</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selfLifePathInfo.loveAdvice}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <h4 className="font-serif font-bold text-stone-800 text-base mb-1.5 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Định Hướng Phát Triển Cuộc Đời</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selfLifePathInfo.generalAdvice}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Pythagorean 3x3 Birth Chart Grid (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="heritage-card p-5 bg-white border border-amber-200">
                <h4 className="font-serif font-bold text-stone-800 text-base mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>Biểu Đồ Ngày Sinh (3x3)</span>
                </h4>

                {/* 3x3 Grid */}
                {/* Row 1: 3, 6, 9 (Trí tuệ) */}
                {/* Row 2: 2, 5, 8 (Tâm hồn) */}
                {/* Row 3: 1, 4, 7 (Thể chất) */}
                <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center font-serif">
                  {/* Row 1 */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">3 (Trí)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[3] > 0 ? '3'.repeat(selfBirthChart.grid[3]) : '—'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">6 (Sáng tạo)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[6] > 0 ? '6'.repeat(selfBirthChart.grid[6]) : '—'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">9 (Lý tưởng)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[9] > 0 ? '9'.repeat(selfBirthChart.grid[9]) : '—'}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">2 (Trực giác)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[2] > 0 ? '2'.repeat(selfBirthChart.grid[2]) : '—'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">5 (Tự do)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[5] > 0 ? '5'.repeat(selfBirthChart.grid[5]) : '—'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">8 (Trí tuệ)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[8] > 0 ? '8'.repeat(selfBirthChart.grid[8]) : '—'}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">1 (Cái tôi)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[1] > 0 ? '1'.repeat(selfBirthChart.grid[1]) : '—'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">4 (Thực tế)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[4] > 0 ? '4'.repeat(selfBirthChart.grid[4]) : '—'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <div className="text-[10px] text-stone-400 font-mono">7 (Trải nghiệm)</div>
                    <div className="text-lg font-bold text-amber-700 h-6 flex items-center justify-center">
                      {selfBirthChart.grid[7] > 0 ? '7'.repeat(selfBirthChart.grid[7]) : '—'}
                    </div>
                  </div>
                </div>

                {/* Arrows of Individuality */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-bold text-stone-700 uppercase">Mũi Tên Sức Mạnh:</div>
                  {selfBirthChart.arrows.length > 0 ? (
                    selfBirthChart.arrows.map((arrow, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-xs ${
                          arrow.type === 'strength'
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/60 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <span>{arrow.type === 'strength' ? '⚡' : '⚠️'}</span>
                          <span>{arrow.name}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">{arrow.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-stone-500 italic">
                      Biểu đồ cân bằng tự nhiên, không có mũi tên trống hay đột biến.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GIẢI MÃ CRUSH (CƯA ĐỔ NGƯỜI ẤY) */}
      {/* ========================================================================= */}
      {activeTab === 'crush' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Input Form */}
          <div className="heritage-card p-5 sm:p-6 bg-white border border-rose-200">
            <div className="text-sm font-serif font-bold text-rose-800 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Nhập Thông Tin Của Crush (Người Ấy):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tên Crush</label>
                <input
                  type="text"
                  value={crushName}
                  onChange={(e) => setCrushName(e.target.value)}
                  placeholder="Nhập tên crush..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Ngày sinh</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={crushDay}
                  onChange={(e) => setCrushDay(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tháng sinh</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={crushMonth}
                  onChange={(e) => setCrushMonth(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Năm sinh</label>
                <input
                  type="number"
                  min="1920"
                  max="2030"
                  value={crushYear}
                  onChange={(e) => setCrushYear(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Hero Crush Personality Card */}
          <div className="heritage-card p-6 bg-gradient-to-br from-rose-50 via-white to-amber-50 border-2 border-rose-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-5 border-b border-rose-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 text-white font-serif font-black text-3xl sm:text-4xl flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-rose-400/30">
                  {crushResult.lifePath}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300">
                      Bản Tính Của {crushName}
                    </span>
                    <span className="text-xs text-stone-500">
                      Linh hồn số {crushResult.soulUrge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-950 mt-0.5">
                    {crushResult.crushType}
                  </h3>
                </div>
              </div>

              {/* Initial compatibility score */}
              <div className="bg-white px-5 py-3 rounded-2xl border border-rose-200 shadow-sm text-center">
                <div className="text-[10px] text-stone-500 uppercase font-semibold">Độ hợp ban đầu</div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-rose-600">
                  {crushResult.compatibilityScore}%
                </div>
              </div>
            </div>

            {/* Secret Fears & Ideal Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Nỗi Sợ & Điểm Yếu Thầm Kín:
                </div>
                <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                  {crushResult.secretFear}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-600" /> Gu / Mẫu Người Lý Tưởng Của Crush:
                </div>
                <p className="text-xs sm:text-sm text-rose-900 font-bold leading-relaxed">
                  {crushResult.idealType}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Pillars To Win Crush's Heart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Approach Tips */}
            <div className="heritage-card p-5 bg-white border border-rose-200">
              <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base mb-3">
                <Flame className="w-5 h-5 text-rose-600" />
                <span>Chiến Lược Tiếp Cận & Nhắn Tin Ghi Điểm</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {crushResult.approachTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">👉</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Conversation Topics */}
            <div className="heritage-card p-5 bg-white border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base mb-3">
                <MessageCircle className="w-5 h-5 text-amber-600" />
                <span>Chủ Đề Nói Chuyện Crush Say Mê</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {crushResult.conversationTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">💬</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Gift Ideas */}
            <div className="heritage-card p-5 bg-white border border-purple-200">
              <div className="flex items-center gap-2 text-purple-900 font-serif font-bold text-base mb-3">
                <Gift className="w-5 h-5 text-purple-600" />
                <span>Gợi Ý Quà Tặng Đốn Tim Crush</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {crushResult.giftIdeas.map((gift, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🎁</span>
                    <span>{gift}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Taboos / Don'ts */}
            <div className="heritage-card p-5 bg-white border border-red-200">
              <div className="flex items-center gap-2 text-red-900 font-serif font-bold text-base mb-3">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>Những Điều Cấm Kỵ Tuyệt Đối Tránh</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {crushResult.taboos.map((taboo, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">🚫</span>
                    <span>{taboo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Golden Secret Banner */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 rounded-2xl text-white shadow-md flex items-start gap-3.5">
            <span className="text-2xl">🔑</span>
            <div>
              <div className="font-serif font-bold text-base text-amber-100">
                Bí Mật Vàng Chinh Phục Trái Tim Crush:
              </div>
              <p className="text-xs sm:text-sm text-white/95 mt-0.5 leading-relaxed font-medium">
                {crushResult.goldenSecret}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TRA CỨU CẶP ĐÔI (BÓI TÌNH YÊU & TƯƠNG HỢP) */}
      {/* ========================================================================= */}
      {activeTab === 'couple' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Dual Inputs Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Person 1 */}
            <div className="heritage-card p-5 bg-white border border-blue-200">
              <div className="text-sm font-serif font-bold text-blue-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Thông Tin Của Bạn (Người 1):</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Họ và Tên</label>
                  <input
                    type="text"
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-xs font-medium"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500">Ngày</label>
                    <input
                      type="number"
                      value={p1Day}
                      onChange={(e) => setP1Day(Number(e.target.value))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500">Tháng</label>
                    <input
                      type="number"
                      value={p1Month}
                      onChange={(e) => setP1Month(Number(e.target.value))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500">Năm</label>
                    <input
                      type="number"
                      value={p1Year}
                      onChange={(e) => setP1Year(Number(e.target.value))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Person 2 */}
            <div className="heritage-card p-5 bg-white border border-rose-200">
              <div className="text-sm font-serif font-bold text-rose-900 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Thông Tin Đối Phương (Người 2):</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Họ và Tên</label>
                  <input
                    type="text"
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-xs font-medium"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500">Ngày</label>
                    <input
                      type="number"
                      value={p2Day}
                      onChange={(e) => setP2Day(Number(e.target.value))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500">Tháng</label>
                    <input
                      type="number"
                      value={p2Month}
                      onChange={(e) => setP2Month(Number(e.target.value))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500">Năm</label>
                    <input
                      type="number"
                      value={p2Year}
                      onChange={(e) => setP2Year(Number(e.target.value))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Compatibility Score Card */}
          <div className="heritage-card p-6 bg-gradient-to-br from-[#fffdfa] via-white to-[#fcf4e8] border-2 border-amber-300 text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-base text-blue-900">{coupleResult.person1.name}</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                  #{coupleResult.person1.lifePath}
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-md text-lg">
                ❤️
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                  #{coupleResult.person2.lifePath}
                </span>
                <span className="font-serif font-bold text-base text-rose-900">{coupleResult.person2.name}</span>
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-serif font-black text-amber-600 drop-shadow-sm">
                {coupleResult.totalScore}%
              </div>
              <div className="inline-block mt-1 px-4 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-sm border border-amber-300">
                Đánh Giá: {coupleResult.rating}
              </div>
            </div>
          </div>

          {/* 3 Pillars of Compatibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Life path match */}
            <div className="heritage-card p-5 bg-white border border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-xs uppercase text-stone-500">Đường Đời (45%)</h4>
                <span className="font-serif font-bold text-sm text-amber-700">{coupleResult.lifePathMatch.score}%</span>
              </div>
              <div className="font-serif font-bold text-stone-800 text-sm mb-1">{coupleResult.lifePathMatch.title}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{coupleResult.lifePathMatch.analysis}</p>
            </div>

            {/* Soul match */}
            <div className="heritage-card p-5 bg-white border border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-xs uppercase text-stone-500">Linh Hồn (35%)</h4>
                <span className="font-serif font-bold text-sm text-rose-700">{coupleResult.soulMatch.score}%</span>
              </div>
              <div className="font-serif font-bold text-stone-800 text-sm mb-1">{coupleResult.soulMatch.title}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{coupleResult.soulMatch.analysis}</p>
            </div>

            {/* Destiny match */}
            <div className="heritage-card p-5 bg-white border border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-xs uppercase text-stone-500">Sứ Mệnh (20%)</h4>
                <span className="font-serif font-bold text-sm text-purple-700">{coupleResult.destinyMatch.score}%</span>
              </div>
              <div className="font-serif font-bold text-stone-800 text-sm mb-1">{coupleResult.destinyMatch.title}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{coupleResult.destinyMatch.analysis}</p>
            </div>
          </div>

          {/* Strengths & Secret to Happiness */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="heritage-card p-5 bg-white border border-emerald-200">
              <h4 className="font-serif font-bold text-emerald-800 text-base mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Điểm Mạnh & Sự Gắn Kết Bền Chặt</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {coupleResult.strengths.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="heritage-card p-5 bg-white border border-amber-200">
              <h4 className="font-serif font-bold text-amber-900 text-base mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Bí Quyết Giữ Lửa Hạnh Phúc Lâu Dài</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
                {coupleResult.secretToHappiness}
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                💡 <strong>Lời khuyên:</strong> Hãy luôn duy trì sự lắng nghe chân thành và tôn trọng thế giới quan của nhau mỗi ngày!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
