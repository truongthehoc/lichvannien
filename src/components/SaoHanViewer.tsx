'use client';

import React, { useState } from 'react';
import { Star, ShieldAlert, AlertTriangle, CheckCircle2, Flame, Compass, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { tinhSaoHan, KetQuaSaoHan } from '@/utils/saohan';

export default function SaoHanViewer() {
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [targetYear, setTargetYear] = useState<number>(currentYear);
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>('Nam');

  const [result, setResult] = useState<KetQuaSaoHan>(() => {
    return tinhSaoHan(1990, currentYear, 'Nam');
  });

  const handleXemSaoHan = (e: React.FormEvent) => {
    e.preventDefault();
    const res = tinhSaoHan(birthYear, targetYear, gioiTinh);
    setResult(res);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b1818] flex items-center justify-center gap-2">
          <Star className="w-7 h-7 text-amber-600" />
          <span>Tra Cứu Sao Hạn, Tam Tai, Kim Lâu & Cách Giải Hạn</span>
        </h2>
        <p className="text-sm text-stone-600">
          Xem chi tiết Cửu Diệu Niên Hạn, Hạn Niên, Hoang Ốc và Nghi thức dâng sao nghênh phúc
        </p>
      </div>

      {/* Input Form */}
      <div className="heritage-card p-6 bg-white border border-[#ebdccb]">
        <form onSubmit={handleXemSaoHan} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Năm Sinh (Dương Lịch)</label>
            <input
              type="number"
              min={1920}
              max={2030}
              value={birthYear}
              onChange={(e) => setBirthYear(parseInt(e.target.value) || 1990)}
              className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Năm Cần Xem Hạn</label>
            <input
              type="number"
              min={1950}
              max={2050}
              value={targetYear}
              onChange={(e) => setTargetYear(parseInt(e.target.value) || currentYear)}
              className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Giới Tính</label>
            <select
              value={gioiTinh}
              onChange={(e) => setGioiTinh(e.target.value as 'Nam' | 'Nữ')}
              className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            >
              <option value="Nam">Nam Mạng</option>
              <option value="Nữ">Nữ Mạng</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#8b1818] hover:bg-[#701212] text-amber-200 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 text-sm h-[42px]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Xem Vận Hạn</span>
          </button>
        </form>
      </div>

      {/* Main Result Cards */}
      {result && (
        <div className="space-y-6">
          {/* Tổng kết năm */}
          <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-800 text-white p-6 rounded-2xl shadow-xl border border-amber-400/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-400/30 pb-4">
              <div>
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">TỔNG QUAN VẬN HẠN NĂM {result.namXem}</span>
                <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                  Tuổi {result.canChiNamSinh} ({result.tuoiMu} Tuổi Mụ)
                </h3>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-center">
                <div className="text-xs text-amber-200">Năm xem:</div>
                <div className="text-lg font-bold text-white">{result.canChiNamXem} ({result.namXem})</div>
              </div>
            </div>

            <p className="text-sm text-amber-100/90 mt-4 leading-relaxed italic">
              {result.tongKet}
            </p>
          </div>

          {/* 4 Khối Chi Tiết: Sao Chiếu, Hạn Niên, Tam Tai & Kim Lâu, Hoang Ốc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Sao Chiếu Mệnh */}
            <div className="heritage-card p-5 bg-white border border-[#ebdccb] space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#8b1818]">
                  <Star className="w-5 h-5 text-amber-600" />
                  <span>Sao Chiếu Mệnh: Sao {result.sao.name}</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  result.sao.type.includes('Tốt') ? 'bg-emerald-100 text-emerald-900' :
                  result.sao.type.includes('Xấu') ? 'bg-red-100 text-red-900' : 'bg-stone-100 text-stone-800'
                }`}>
                  {result.sao.type}
                </span>
              </div>

              <div className="text-xs text-amber-800 font-semibold italic bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                &ldquo;{result.sao.thoThoat}&rdquo;
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {result.sao.description}
              </p>
            </div>

            {/* 2. Hạn Niên */}
            <div className="heritage-card p-5 bg-white border border-[#ebdccb] space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#8b1818]">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span>Hạn Niên: Hạn {result.han.name}</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  result.han.type === 'Đại hạn' ? 'bg-red-100 text-red-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {result.han.type}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {result.han.description}
              </p>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
                <strong className="text-stone-800 block mb-1">Cách Hóa Giải & Phòng Tránh:</strong>
                {result.han.loiKhuyen}
              </div>
            </div>

            {/* 3. Tam Tai & Kim Lâu */}
            <div className="heritage-card p-5 bg-white border border-[#ebdccb] space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#8b1818] border-b border-amber-100 pb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Hạn Tam Tai & Kim Lâu</span>
              </div>

              {/* Tam Tai */}
              <div className={`p-3 rounded-lg border text-xs sm:text-sm ${
                result.tamTai.isTamTai ? 'bg-red-50/70 border-red-200 text-red-950' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}>
                <div className="font-bold mb-0.5">
                  {result.tamTai.isTamTai ? '⚠️ Phạm Tam Tai' : '✅ Không Phạm Tam Tai'}
                </div>
                <p className="text-xs text-stone-600">{result.tamTai.description}</p>
              </div>

              {/* Kim Lâu */}
              <div className={`p-3 rounded-lg border text-xs sm:text-sm ${
                result.kimLau.isKimLau ? 'bg-red-50/70 border-red-200 text-red-950' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}>
                <div className="font-bold mb-0.5">
                  {result.kimLau.isKimLau ? `⚠️ Phạm ${result.kimLau.type}` : '✅ Không Phạm Kim Lâu'}
                </div>
                <p className="text-xs text-stone-600">{result.kimLau.description}</p>
              </div>
            </div>

            {/* 4. Hoang Ốc (Làm Nhà) */}
            <div className="heritage-card p-5 bg-white border border-[#ebdccb] space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#8b1818] border-b border-amber-100 pb-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <span>Hạn Hoang Ốc (Động Thổ Xây Dựng)</span>
              </div>

              <div className={`p-3.5 rounded-lg border text-xs sm:text-sm ${
                result.hoangOc.isTot ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-amber-50/70 border-amber-200 text-amber-950'
              }`}>
                <div className="font-bold text-base mb-1">
                  Cung {result.hoangOc.name}
                </div>
                <p className="text-stone-700 leading-relaxed text-xs">
                  {result.hoangOc.description}
                </p>
              </div>

              <div className="text-xs text-stone-500 italic">
                * Nếu muốn làm nhà khi phạm Hoang Ốc / Kim Lâu, gia chủ có thể áp dụng thủ tục mượn tuổi người hợp mệnh.
              </div>
            </div>
          </div>

          {/* Hướng Dẫn Nghi Lễ Cúng Dâng Sao Giải Hạn Chi Tiết */}
          <div className="heritage-card p-6 bg-white border-2 border-amber-400 space-y-5">
            <div className="flex items-center gap-2 text-xl font-serif font-bold text-[#8b1818] border-b border-amber-200 pb-3">
              <Flame className="w-6 h-6 text-amber-600" />
              <span>Nghi Thức Dâng Sao Nghênh Phúc / Giải Hạn Sao {result.sao.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                <div className="text-stone-500 font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Thời Gian Cúng:</span>
                </div>
                <strong className="text-stone-900">{result.sao.ngayCung}</strong>
              </div>

              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                <div className="text-stone-500 font-semibold mb-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Hướng Lạy / Bàn Thờ:</span>
                </div>
                <strong className="text-stone-900">{result.sao.huongCung}</strong>
              </div>

              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                <div className="text-stone-500 font-semibold mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  <span>Số Lượng Đèn / Nến:</span>
                </div>
                <strong className="text-stone-900">{result.sao.soNen} ngọn nến</strong>
              </div>

              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                <div className="text-stone-500 font-semibold mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Bài Vị (Màu Giấy):</span>
                </div>
                <strong className="text-stone-900">{result.sao.baiViColor}</strong>
              </div>
            </div>

            {/* Bài vị */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-1">
              <span className="text-xs text-stone-500 uppercase font-semibold">Chữ Viết Trên Bài Vị:</span>
              <div className="text-lg sm:text-xl font-serif font-bold text-[#8b1818] tracking-wide">
                &ldquo;{result.sao.baiViText}&rdquo;
              </div>
            </div>

            {/* Văn khấn */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase block">Văn Khấn Cúng Sao Chuẩn Truyền Thống:</span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic bg-white p-3.5 rounded-lg border border-amber-200 shadow-inner">
                {result.sao.vanKhan}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
