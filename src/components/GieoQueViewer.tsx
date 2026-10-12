'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw, HelpCircle, Award, Heart, DollarSign, ShieldAlert, Compass, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QueKinhDich, getQueFromCoins } from '@/utils/gieoque';

// Component render 1 đồng tiền cổ Càn Long chuẩn phong thủy kích thước lớn
function AncientCoin({ isYang, isFlipping }: { isYang: boolean; isFlipping: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full relative transition-all duration-300 shadow-2xl select-none ${
          isFlipping ? 'animate-spin scale-105' : 'hover:scale-105'
        }`}
      >
        {isYang ? (
          /* ===== MẶT DƯƠNG (MẶT NGỬA - TIỀN ĐỒNG VÀNG CÀN LONG THÔNG BẢO) ===== */
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 border-4 border-amber-100 flex items-center justify-center relative shadow-inner ring-4 ring-amber-700/60">
            {/* Vành gờ đồng xu đúc nổi */}
            <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-amber-900/30 pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-amber-800/20 pointer-events-none" />

            {/* Lỗ vuông rỗng ở tâm đồng xu (Trời tròn Đất vuông chuẩn truyền thống) */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border-2 border-amber-900 bg-[#701515] rounded-xs flex items-center justify-center shadow-inner z-10">
              <div className="w-4 h-4 bg-[#500c0c] border border-amber-900/50 rounded-xs" />
            </div>

            {/* 4 Chữ Hán cổ đúc nổi xung quanh 4 phía lỗ vuông */}
            {/* Trên: Càn 乾 */}
            <span className="absolute top-2 sm:top-2.5 font-serif font-black text-sm sm:text-base md:text-lg text-amber-950 drop-shadow-sm">
              乾
            </span>
            {/* Dưới: Long 隆 */}
            <span className="absolute bottom-2 sm:bottom-2.5 font-serif font-black text-sm sm:text-base md:text-lg text-amber-950 drop-shadow-sm">
              隆
            </span>
            {/* Trái: Bảo 寶 */}
            <span className="absolute left-2.5 sm:left-3 font-serif font-black text-sm sm:text-base md:text-lg text-amber-950 drop-shadow-sm">
              寶
            </span>
            {/* Phải: Thông 通 */}
            <span className="absolute right-2.5 sm:right-3 font-serif font-black text-sm sm:text-base md:text-lg text-amber-950 drop-shadow-sm">
              通
            </span>
          </div>
        ) : (
          /* ===== MẶT ÂM (MẶT SẤP - ĐỒNG TRẦM THÁI CỰC LƯỠNG NGHI) ===== */
          <div className="w-full h-full rounded-full bg-gradient-to-br from-stone-600 via-amber-950 to-stone-900 border-4 border-stone-400 flex items-center justify-center relative shadow-inner ring-4 ring-stone-900/70">
            {/* Vành gờ đồng xu */}
            <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-amber-300/30 pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-amber-200/20 pointer-events-none" />

            {/* Lỗ vuông ở tâm đồng xu */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border-2 border-amber-400/80 bg-stone-950 rounded-xs flex items-center justify-center shadow-inner z-10">
              <div className="w-4 h-4 bg-black border border-stone-700 rounded-xs" />
            </div>

            {/* Họa tiết Lưỡng Nghi Thái Cực 4 góc */}
            <div className="absolute top-2 sm:top-2.5 text-[10px] sm:text-xs font-bold text-amber-200 uppercase tracking-widest font-serif">
              ✦ THÁI CỰC ✦
            </div>
            <div className="absolute bottom-2 sm:bottom-2.5 text-[10px] sm:text-xs font-bold text-amber-200 uppercase tracking-widest font-serif">
              ✦ LƯỠNG NGHI ✦
            </div>
            <div className="absolute left-2.5 text-xs text-amber-300 opacity-80">
              ☯
            </div>
            <div className="absolute right-2.5 text-xs text-amber-300 opacity-80">
              ☯
            </div>
          </div>
        )}
      </div>

      {/* Nhãn hiển thị bên dưới */}
      <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-sm transition-colors ${
        isYang 
          ? 'bg-amber-100 text-amber-950 border border-amber-300' 
          : 'bg-stone-200 text-stone-800 border border-stone-400'
      }`}>
        {isYang ? 'Mặt Dương (Ngửa)' : 'Mặt Âm (Sấp)'}
      </span>
    </div>
  );
}

export default function GieoQueViewer() {
  const [question, setQuestion] = useState<string>('');
  const [tossHistory, setTossHistory] = useState<boolean[][]>([]);
  const [isTossing, setIsTossing] = useState<boolean>(false);
  const [currentCoins, setCurrentCoins] = useState<boolean[]>([true, false, true]);
  const [queResult, setQueResult] = useState<QueKinhDich | null>(null);

  const tossCoinsOnce = () => {
    if (isTossing || tossHistory.length >= 6) return;

    setIsTossing(true);
    let flips = 0;
    const interval = setInterval(() => {
      setCurrentCoins([Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5]);
      flips++;
      if (flips > 8) {
        clearInterval(interval);
        const finalCoins = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5];
        setCurrentCoins(finalCoins);
        const newHistory = [...tossHistory, finalCoins];
        setTossHistory(newHistory);
        setIsTossing(false);

        if (newHistory.length === 6) {
          const result = getQueFromCoins(newHistory);
          setQueResult(result);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }, 90);
  };

  const resetAll = () => {
    setTossHistory([]);
    setQueResult(null);
    setIsTossing(false);
  };

  const autoGieo = () => {
    if (isTossing) return;
    const history: boolean[][] = [];
    for (let i = 0; i < 6; i++) {
      history.push([Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5]);
    }
    setTossHistory(history);
    const result = getQueFromCoins(history);
    setQueResult(result);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b1818] flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-amber-600" />
          <span>Gieo Quẻ Kinh Dịch & Khổng Minh Thần Quẻ</span>
        </h2>
        <p className="text-sm text-stone-600">
          Tập trung tâm ý, gieo 3 đồng tiền cổ 6 lần để khai mở quẻ dịch hanh thông mưu sự
        </p>
      </div>

      {/* Input question & Tossing Arena */}
      <div className="heritage-card p-6 sm:p-8 bg-white border border-[#ebdccb] space-y-6">
        {/* Question box */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Việc Bạn Muốn Cầu Hỏi Quẻ:</span>
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ví dụ: Cầu công việc sắp tới, Cầu tình duyên, Cầu tài lộc tháng này..."
            className="w-full p-3 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
          />
        </div>

        {/* 3 Đồng Tiền Cổ Hiển Thị (To & Rõ Ràng) */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center space-y-6 shadow-inner">
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
            {currentCoins.map((isYang, idx) => (
              <AncientCoin key={idx} isYang={isYang} isFlipping={isTossing} />
            ))}
          </div>

          {/* Progress: 6 Hào */}
          <div className="w-full max-w-md space-y-2.5">
            <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
              <span>Tiến trình gieo: <strong className="text-[#8b1818] font-bold text-sm">{tossHistory.length}/6 hào</strong></span>
              <span>{tossHistory.length === 6 ? '✅ Đã hoàn tất quẻ dịch!' : 'Cần gieo thêm ' + (6 - tossHistory.length) + ' lần'}</span>
            </div>
            
            {/* Visual Hào Lines (Từ Hào 1 dưới cùng đến Hào 6 trên cùng) */}
            <div className="flex flex-col-reverse gap-2 p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs">
              {Array.from({ length: 6 }, (_, idx) => {
                const toss = tossHistory[idx];
                if (!toss) {
                  return (
                    <div key={idx} className="h-5 border border-dashed border-stone-200 rounded flex items-center justify-center text-[10px] text-stone-400 font-medium">
                      Hào {idx + 1}
                    </div>
                  );
                }
                const isYang = toss.filter(Boolean).length >= 2;
                return (
                  <div key={idx} className="h-5 flex items-center justify-center gap-2">
                    {isYang ? (
                      // Hào Dương: Liền nét
                      <div className="w-full h-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-full shadow-xs" title={`Hào ${idx + 1}: Hào Dương (Liền nét)`} />
                    ) : (
                      // Hào Âm: Đứt nét
                      <div className="w-full flex items-center gap-3">
                        <div className="w-1/2 h-3 bg-gradient-to-r from-stone-600 to-stone-700 rounded-full shadow-xs" title={`Hào ${idx + 1}: Hào Âm (Đứt nét)`} />
                        <div className="w-1/2 h-3 bg-gradient-to-r from-stone-700 to-stone-600 rounded-full shadow-xs" title={`Hào ${idx + 1}: Hào Âm (Đứt nét)`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tossHistory.length < 6 ? (
              <>
                <button
                  onClick={tossCoinsOnce}
                  disabled={isTossing}
                  className="px-6 py-3 bg-[#8b1818] hover:bg-[#701212] text-amber-200 font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 text-sm sm:text-base cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Gieo Lần Thứ {tossHistory.length + 1}</span>
                </button>
                <button
                  onClick={autoGieo}
                  disabled={isTossing}
                  className="px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-950 font-semibold rounded-xl border border-amber-300 transition-all text-sm cursor-pointer"
                >
                  Gieo Tự Động 6 Hào
                </button>
              </>
            ) : (
              <button
                onClick={resetAll}
                className="px-6 py-3 bg-stone-700 hover:bg-stone-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Gieo Quẻ Mới</span>
              </button>
            )}
          </div>
        </div>

        {/* Display Hexagram Result */}
        {queResult && (
          <div className="space-y-6 pt-4 border-t-2 border-amber-300">
            {/* Quẻ Header */}
            <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-800 text-white p-6 rounded-2xl shadow-xl text-center space-y-2 border border-amber-400/40">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">KẾT QUẢ QUẺ DỊCH THÀNH</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                Quẻ Số {queResult.number}: {queResult.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 italic max-w-2xl mx-auto font-serif">
                &ldquo;{queResult.judgment}&rdquo;
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
                <span className="bg-white/15 px-3 py-1 rounded-full text-white">Quẻ Thượng: <strong>{queResult.upperTrigram}</strong></span>
                <span className="bg-white/15 px-3 py-1 rounded-full text-white">Quẻ Hạ: <strong>{queResult.lowerTrigram}</strong></span>
                <span className="bg-amber-400 text-red-950 font-bold px-3 py-1 rounded-full">Ngũ Hành: <strong>{queResult.element}</strong></span>
              </div>
            </div>

            {/* Chi Tiết Luận Giải Các Mặt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Ý Nghĩa & Tượng Quẻ</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{queResult.meaning}</p>
                <div className="text-xs text-stone-500 font-medium">Hình tượng: {queResult.symbol}</div>
              </div>

              <div className="p-4 bg-red-50/60 rounded-xl border border-red-200 space-y-1.5">
                <div className="font-bold text-red-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-red-700" />
                  <span>Công Danh & Sự Nghiệp</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{queResult.career}</p>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>Tài Lộc & Kinh Doanh</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{queResult.wealth}</p>
              </div>

              <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1.5">
                <div className="font-bold text-rose-900 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-700" />
                  <span>Tình Cảm & Gia Đạo</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{queResult.love}</p>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1.5">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-blue-700" />
                  <span>Sức Khỏe & Thể Chất</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{queResult.health}</p>
              </div>

              <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200 space-y-1.5">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-700" />
                  <span>Xuất Hành & Giao Dịch</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{queResult.travel}</p>
              </div>
            </div>

            {/* Lời Khuyên */}
            <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border border-amber-300 flex items-start gap-3 text-xs sm:text-sm">
              <CheckCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-950 font-bold block mb-0.5">Lời Khuyên Của Quẻ:</strong>
                <span className="text-stone-800 italic font-serif">{queResult.advice}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
