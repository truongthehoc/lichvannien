'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Calendar, ArrowRightLeft, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { convertSolar2Lunar, convertLunar2Solar, getCanChiYear, getCanChiMonth, getCanChiDay, jdn, getFullDateDetails } from '@/utils/amlich';

export default function ConvertDateTool() {
  const today = new Date();
  
  // Tab chuyển đổi: 'solar-to-lunar' | 'lunar-to-solar'
  const [mode, setMode] = useState<'solar-to-lunar' | 'lunar-to-solar'>('solar-to-lunar');

  // Input states - Dương Lịch
  const [sDay, setSDay] = useState<number>(today.getDate());
  const [sMonth, setSMonth] = useState<number>(today.getMonth() + 1);
  const [sYear, setSYear] = useState<number>(today.getFullYear());

  // Input states - Âm Lịch
  const [lDay, setLDay] = useState<number>(1);
  const [lMonth, setLMonth] = useState<number>(1);
  const [lYear, setLYear] = useState<number>(today.getFullYear());
  const [isLeapMonth, setIsLeapMonth] = useState<boolean>(false);

  // Validation Error State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state
  const [resultText, setResultText] = useState<{
    solar: string;
    lunar: string;
    canChiYear: string;
    canChiMonth: string;
    canChiDay: string;
    tietKhi: string;
    napAm: string;
  } | null>(null);

  // Countdown to next Tet (Ngày, Giờ, Phút, Giây)
  const [tetCountdown, setTetCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    year: number;
    canChi: string;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    year: today.getFullYear(),
    canChi: ''
  });

  // Số ngày tối đa của tháng Dương lịch
  const getMaxSolarDays = (month: number, year: number): number => {
    if (isNaN(month) || isNaN(year)) return 31;
    return new Date(year, month, 0).getDate();
  };

  // Chuyển đổi Dương -> Âm
  const handleConvertSolarToLunar = (d = sDay, m = sMonth, y = sYear) => {
    setErrorMessage(null);

    // Validate Năm
    if (isNaN(y) || y < 1800 || y > 2199) {
      setErrorMessage('Năm Dương lịch phải nằm trong khoảng từ 1800 đến 2199.');
      return;
    }

    // Validate Tháng
    if (isNaN(m) || m < 1 || m > 12) {
      setErrorMessage('Tháng Dương lịch không hợp lệ (Chỉ được nhập từ 1 đến 12).');
      return;
    }

    // Validate Ngày theo tháng thực tế
    const maxDays = getMaxSolarDays(m, y);
    if (isNaN(d) || d < 1 || d > maxDays) {
      setErrorMessage(`Ngày Dương lịch không hợp lệ! Tháng ${m}/${y} chỉ có tối đa ${maxDays} ngày.`);
      return;
    }

    const [lunarD, lunarM, lunarY, isLeap] = convertSolar2Lunar(d, m, y, 7);
    const jd = jdn(d, m, y);
    const canChiYear = getCanChiYear(lunarY).fullName;
    const canChiMonth = getCanChiMonth(lunarM, lunarY).fullName;
    const canChiDay = getCanChiDay(jd).fullName;
    const full = getFullDateDetails(new Date(y, m - 1, d));

    setResultText({
      solar: `Ngày ${d} tháng ${m} năm ${y}`,
      lunar: `Ngày ${lunarD} tháng ${lunarM}${isLeap ? ' (Nhuận)' : ''} năm ${lunarY}`,
      canChiYear,
      canChiMonth,
      canChiDay,
      tietKhi: full.tietKhi,
      napAm: full.napAmDay
    });
  };

  // Chuyển đổi Âm -> Dương
  const handleConvertLunarToSolar = (d = lDay, m = lMonth, y = lYear, isLeap = isLeapMonth) => {
    setErrorMessage(null);

    // Validate Năm Âm
    if (isNaN(y) || y < 1800 || y > 2199) {
      setErrorMessage('Năm Âm lịch phải nằm trong khoảng từ 1800 đến 2199.');
      return;
    }

    // Validate Tháng Âm
    if (isNaN(m) || m < 1 || m > 12) {
      setErrorMessage('Tháng Âm lịch không hợp lệ (Chỉ được nhập từ 1 đến 12).');
      return;
    }

    // Validate Ngày Âm
    if (isNaN(d) || d < 1 || d > 30) {
      setErrorMessage('Ngày Âm lịch không hợp lệ (Tháng Âm lịch chỉ có từ 1 đến 30 ngày).');
      return;
    }

    const [solarD, solarM, solarY] = convertLunar2Solar(d, m, y, isLeap, 7);
    if (solarD === 0 || isNaN(solarD)) {
      setErrorMessage(`Năm Âm lịch ${y} không có tháng ${m} nhuận hoặc ngày không tồn tại!`);
      return;
    }

    const jd = jdn(solarD, solarM, solarY);
    const canChiYear = getCanChiYear(y).fullName;
    const canChiMonth = getCanChiMonth(m, y).fullName;
    const canChiDay = getCanChiDay(jd).fullName;
    const full = getFullDateDetails(new Date(solarY, solarM - 1, solarD));

    setResultText({
      solar: `Ngày ${solarD} tháng ${solarM} năm ${solarY}`,
      lunar: `Ngày ${d} tháng ${m}${isLeap ? ' (Nhuận)' : ''} năm ${y}`,
      canChiYear,
      canChiMonth,
      canChiDay,
      tietKhi: full.tietKhi,
      napAm: full.napAmDay
    });
  };

  // Calculate Tet Countdown with REAL-TIME SECONDS TICKING
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let nextTetYear = now.getFullYear();
      let [tD, tM, tY] = convertLunar2Solar(1, 1, nextTetYear, false, 7);
      let tetDate = new Date(tY, tM - 1, tD, 0, 0, 0);

      if (tetDate.getTime() <= now.getTime()) {
        nextTetYear += 1;
        [tD, tM, tY] = convertLunar2Solar(1, 1, nextTetYear, false, 7);
        tetDate = new Date(tY, tM - 1, tD, 0, 0, 0);
      }

      const diffMs = Math.max(0, tetDate.getTime() - now.getTime());
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      const canChiTet = getCanChiYear(nextTetYear).fullName;

      setTetCountdown({
        days,
        hours,
        minutes,
        seconds,
        year: nextTetYear,
        canChi: canChiTet
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initial conversion
  useEffect(() => {
    handleConvertSolarToLunar(today.getDate(), today.getMonth() + 1, today.getFullYear());
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b1818] flex items-center justify-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-amber-600" />
          <span>Công Cụ Đổi Ngày Âm Dương Chuẩn Xác</span>
        </h2>
        <p className="text-sm text-stone-600">
          Chuyển đổi tức thì giữa Dương Lịch và Âm Lịch Việt Nam theo chu kỳ thiên văn GMT+7
        </p>
      </div>

      {/* Countdown To Tet Widget - Đầy đủ Ngày, Giờ, Phút, Giây */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-amber-700 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="text-center lg:text-left">
            <div className="text-amber-300 font-medium text-xs uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ĐẾM NGƯỢC ĐẾN TẾT NGUYÊN ĐÁN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Tết {tetCountdown.canChi} ({tetCountdown.year})
            </h3>
            <p className="text-xs text-amber-100/80 mt-1">
              Thời khắc thiêng liêng rước lộc đầu xuân, vạn sự hanh thông như ý
            </p>
          </div>

          {/* 4 Ô: NGÀY - GIỜ - PHÚT - GIÂY */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="bg-black/35 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-amber-400/30 text-center min-w-[62px] sm:min-w-[72px]">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-300 tabular-nums">
                {tetCountdown.days}
              </div>
              <div className="text-[10px] text-amber-100 uppercase tracking-wider">Ngày</div>
            </div>

            <div className="bg-black/35 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-amber-400/30 text-center min-w-[62px] sm:min-w-[72px]">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-300 tabular-nums">
                {String(tetCountdown.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-amber-100 uppercase tracking-wider">Giờ</div>
            </div>

            <div className="bg-black/35 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-amber-400/30 text-center min-w-[62px] sm:min-w-[72px]">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-300 tabular-nums">
                {String(tetCountdown.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-amber-100 uppercase tracking-wider">Phút</div>
            </div>

            <div className="bg-black/35 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-amber-400/30 text-center min-w-[62px] sm:min-w-[72px]">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-yellow-300 tabular-nums animate-pulse">
                {String(tetCountdown.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-yellow-200 uppercase tracking-wider font-semibold">Giây</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-stone-200/80 rounded-xl">
          <button
            onClick={() => { setMode('solar-to-lunar'); setErrorMessage(null); }}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              mode === 'solar-to-lunar'
                ? 'bg-[#8b1818] text-white shadow-md font-bold'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Dương Lịch ➔ Âm Lịch
          </button>
          <button
            onClick={() => { setMode('lunar-to-solar'); setErrorMessage(null); }}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              mode === 'lunar-to-solar'
                ? 'bg-[#8b1818] text-white shadow-md font-bold'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Âm Lịch ➔ Dương Lịch
          </button>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="heritage-card p-6 sm:p-8 bg-white border border-[#ebdccb] space-y-6">
        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-300 text-red-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {mode === 'solar-to-lunar' ? (
          /* FORM DƯƠNG -> ÂM */
          <div className="space-y-4">
            <h4 className="font-bold text-[#8b1818] text-base sm:text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>Nhập ngày Dương Lịch cần tra cứu:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Ngày (1 - {getMaxSolarDays(sMonth, sYear)})
                </label>
                <input
                  type="number"
                  min={1}
                  max={getMaxSolarDays(sMonth, sYear)}
                  value={sDay || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSDay(val);
                  }}
                  placeholder="Ví dụ: 12"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Tháng (1 - 12)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={sMonth || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSMonth(val);
                  }}
                  placeholder="Ví dụ: 5"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Năm (1800 - 2199)</label>
                <input
                  type="number"
                  min={1800}
                  max={2199}
                  value={sYear || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSYear(val);
                  }}
                  placeholder="Ví dụ: 1993"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => handleConvertSolarToLunar()}
              className="w-full py-3 bg-[#8b1818] hover:bg-[#721313] text-amber-200 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chuyển Đổi Sang Ngày Âm Lịch</span>
            </button>
          </div>
        ) : (
          /* FORM ÂM -> DƯƠNG */
          <div className="space-y-4">
            <h4 className="font-bold text-[#8b1818] text-base sm:text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>Nhập ngày Âm Lịch cần tra cứu:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Ngày Âm (1 - 30)</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={lDay || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setLDay(val);
                  }}
                  placeholder="Ví dụ: 21"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Tháng Âm (1 - 12)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={lMonth || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setLMonth(val);
                  }}
                  placeholder="Ví dụ: 4"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Năm Âm (1800 - 2199)</label>
                <input
                  type="number"
                  min={1800}
                  max={2199}
                  value={lYear || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setLYear(val);
                  }}
                  placeholder="Ví dụ: 1993"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLeap"
                checked={isLeapMonth}
                onChange={(e) => setIsLeapMonth(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-amber-500"
              />
              <label htmlFor="isLeap" className="text-sm text-stone-700 font-medium cursor-pointer">
                Là Tháng Nhuận (Nếu năm đó có tháng nhuận)
              </label>
            </div>

            <button
              onClick={() => handleConvertLunarToSolar()}
              className="w-full py-3 bg-[#8b1818] hover:bg-[#721313] text-amber-200 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chuyển Đổi Sang Ngày Dương Lịch</span>
            </button>
          </div>
        )}

        {/* Display Conversion Result */}
        {resultText && (
          <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-300 space-y-4">
            <div className="text-center font-serif text-lg sm:text-xl font-bold text-[#8b1818]">
              KẾT QUẢ CHUYỂN ĐỔI CHI TIẾT
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 uppercase font-semibold block">Dương Lịch</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1 block">
                  {resultText.solar}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 uppercase font-semibold block">Âm Lịch</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-[#8b1818] mt-1 block">
                  {resultText.lunar}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="bg-white/80 p-3 rounded-lg border border-amber-100 text-center">
                <div className="text-stone-500 text-xs">Can Chi Năm</div>
                <div className="font-bold text-stone-800 mt-0.5">{resultText.canChiYear}</div>
              </div>
              <div className="bg-white/80 p-3 rounded-lg border border-amber-100 text-center">
                <div className="text-stone-500 text-xs">Can Chi Tháng</div>
                <div className="font-bold text-stone-800 mt-0.5">{resultText.canChiMonth}</div>
              </div>
              <div className="bg-white/80 p-3 rounded-lg border border-amber-100 text-center">
                <div className="text-stone-500 text-xs">Can Chi Ngày</div>
                <div className="font-bold text-stone-800 mt-0.5">{resultText.canChiDay}</div>
              </div>
              <div className="bg-white/80 p-3 rounded-lg border border-amber-100 text-center">
                <div className="text-stone-500 text-xs">Tiết Khí</div>
                <div className="font-bold text-stone-800 mt-0.5">{resultText.tietKhi}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
