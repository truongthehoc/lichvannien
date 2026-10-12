'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, User, Calendar, Clock, Award, Heart, DollarSign, ShieldAlert, CheckCircle, Printer } from 'lucide-react';
import { lapLaSoTuVi, LaSoTuVi, CungTuVi } from '@/utils/tuvi';
import { GIO_12 } from '@/utils/amlich';

export default function TuViViewer() {
  const [hoTen, setHoTen] = useState<string>('Nguyễn Văn An');
  const [gioiTinh, setGioiTinh] = useState<'Nam' | 'Nữ'>('Nam');
  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(8);
  const [year, setYear] = useState<number>(1995);
  const [hourChiIndex, setHourChiIndex] = useState<number>(6); // Giờ Ngọ

  const [laSo, setLaSo] = useState<LaSoTuVi | null>(() => {
    return lapLaSoTuVi('Nguyễn Văn An', 'Nam', 15, 8, 1995, 6);
  });

  const handleLapLaSo = (e: React.FormEvent) => {
    e.preventDefault();
    const result = lapLaSoTuVi(hoTen, gioiTinh, day, month, year, hourChiIndex);
    setLaSo(result);
  };

  // Map 12 cung vào layout truyền thống 4x4 (12 ô viền xung quanh)
  // Grid 4x4:
  // Hàng 0: Tỵ (5), Ngọ (6), Mùi (7), Thân (8)
  // Hàng 1: Thìn (4), [Thiên Bàn], [Thiên Bàn], Dậu (9)
  // Hàng 2: Mão (3), [Thiên Bàn], [Thiên Bàn], Tuất (10)
  // Hàng 3: Dần (2), Sửu (1), Tý (0), Hợi (11)

  const getCungByChiIndex = (chiIdx: number): CungTuVi | undefined => {
    return laSo?.cungs.find(c => c.index === chiIdx);
  };

  const renderCungCell = (chiIdx: number) => {
    const cung = getCungByChiIndex(chiIdx);
    if (!cung) return null;

    const isMenh = cung.cungName === 'Mệnh';
    const isQuan = cung.cungName === 'Quan Lộc';
    const isTai = cung.cungName === 'Tài Bạch';

    return (
      <div className={`p-2.5 sm:p-3 border rounded-xl flex flex-col justify-between transition-all relative min-h-[140px] sm:min-h-[170px] ${
        isMenh 
          ? 'bg-amber-100/90 border-red-600 ring-2 ring-red-500 shadow-md' 
          : isQuan || isTai 
          ? 'bg-amber-50/70 border-amber-400' 
          : 'bg-white border-stone-300 shadow-xs'
      }`}>
        {/* Top Header of Cung */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-1">
          <div className="flex items-center gap-1">
            <span className={`text-xs sm:text-sm font-serif font-bold ${
              isMenh ? 'text-red-800 text-base font-extrabold' : 'text-stone-800'
            }`}>
              {cung.cungName}
            </span>
            {cung.isThan && (
              <span className="bg-red-700 text-white text-[10px] font-bold px-1 py-0.2 rounded">
                THÂN
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-stone-500">
            {cung.canCung} {cung.chiName}
          </span>
        </div>

        {/* Stars in Palace */}
        <div className="my-1.5 space-y-1 text-xs">
          {/* Chính tinh */}
          <div className="space-y-0.5">
            {cung.chinhTinh.map((s, sIdx) => (
              <div key={sIdx} className="font-bold text-red-700 flex items-center justify-between text-[11px] sm:text-xs">
                <span>★ {s.name}</span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded">{s.dacTinh}</span>
              </div>
            ))}
          </div>

          {/* Cát tinh */}
          <div className="flex flex-wrap gap-1 text-[10px] text-emerald-700">
            {cung.phuTinhCat.map((s, sIdx) => (
              <span key={sIdx} className="bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200" title={s.description}>
                {s.name}
              </span>
            ))}
          </div>

          {/* Hung tinh */}
          <div className="flex flex-wrap gap-1 text-[10px] text-stone-600">
            {cung.phuTinhHung.map((s, sIdx) => (
              <span key={sIdx} className="bg-stone-100 px-1 py-0.5 rounded border border-stone-300" title={s.description}>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Đại vận age footer */}
        <div className="text-right border-t border-stone-100 pt-0.5 text-[10px] text-stone-400 font-medium">
          Đại hạn: {cung.daiHan}t
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b1818] flex items-center justify-center gap-2">
          <BookOpen className="w-7 h-7 text-amber-600" />
          <span>Lập & Luận Giải Lá Số Tử Vi Trọn Đời</span>
        </h2>
        <p className="text-sm text-stone-600">
          Khám phá Bản Mệnh, Cung Quan Lộc, Tài Bạch, Phu Thê, Đại Vận và xu hướng cuộc đời
        </p>
      </div>

      {/* Input Form */}
      <div className="heritage-card p-6 bg-white border border-[#ebdccb]">
        <form onSubmit={handleLapLaSo} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Họ tên */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Họ và Tên</label>
              <input
                type="text"
                required
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                placeholder="Nhập họ và tên..."
                className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              />
            </div>

            {/* Giới tính */}
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

            {/* Ngày tháng năm sinh (Dương lịch) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Ngày Sinh (Dương Lịch)</label>
              <div className="grid grid-cols-3 gap-1.5">
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={day}
                  onChange={(e) => setDay(parseInt(e.target.value) || 1)}
                  placeholder="Ngày"
                  className="w-full p-2 border border-stone-300 rounded-lg text-center text-xs font-semibold"
                />
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value) || 1)}
                  placeholder="Tháng"
                  className="w-full p-2 border border-stone-300 rounded-lg text-center text-xs font-semibold"
                />
                <input
                  type="number"
                  min={1920}
                  max={2030}
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || 1995)}
                  placeholder="Năm"
                  className="w-full p-2 border border-stone-300 rounded-lg text-center text-xs font-semibold"
                />
              </div>
            </div>

            {/* Giờ sinh */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Giờ Sinh</label>
              <select
                value={hourChiIndex}
                onChange={(e) => setHourChiIndex(parseInt(e.target.value))}
                className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              >
                {GIO_12.map((g, idx) => (
                  <option key={idx} value={idx}>
                    Giờ {g.name} ({g.time})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8b1818] hover:bg-[#701212] text-amber-200 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>An Sao & Lập Lá Số Tử Vi</span>
          </button>
        </form>
      </div>

      {/* Lá Số Tử Vi Bàn Cờ 12 Cung */}
      {laSo && (
        <div className="space-y-6">
          <div className="heritage-card p-4 sm:p-6 bg-[#fbf8f2] border-2 border-amber-600 shadow-xl space-y-4">
            {/* Header Lá Số */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-amber-600/40 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#8b1818]">
                  LÁ SỐ TỬ VI ĐỔNG QUAN • {laSo.hoTen.toUpperCase()}
                </h3>
                <div className="text-xs text-stone-600 mt-0.5">
                  Sinh ngày {laSo.solarDate} (Âm lịch: {laSo.lunarDate}) • {laSo.gioSinh}
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="text-xs font-bold text-red-900 bg-amber-200 hover:bg-amber-300 px-3 py-1.5 rounded-lg border border-amber-400 flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Lá Số</span>
              </button>
            </div>

            {/* Traditional 4x4 Board Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Row 1: Tỵ(5), Ngọ(6), Mùi(7), Thân(8) */}
              {renderCungCell(5)}
              {renderCungCell(6)}
              {renderCungCell(7)}
              {renderCungCell(8)}

              {/* Row 2: Thìn(4), [THIÊN BÀN CENTER], Dậu(9) */}
              {renderCungCell(4)}
              
              {/* Thiên Bàn Center Box (Chiếm 2 cột giữa trên Desktop) */}
              <div className="col-span-2 hidden md:flex flex-col justify-center items-center p-4 bg-gradient-to-br from-amber-50 to-orange-100/60 rounded-xl border-2 border-amber-500/50 shadow-inner text-center space-y-2">
                <div className="font-serif font-bold text-[#8b1818] text-lg sm:text-xl border-b border-amber-300 pb-1 w-full">
                  THIÊN BÀN TỬ VI
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs w-full text-left">
                  <div><strong>Họ tên:</strong> {laSo.hoTen}</div>
                  <div><strong>Giới tính:</strong> {laSo.gioiTinh} ({laSo.amDuongNamNu})</div>
                  <div><strong>Bản Mệnh:</strong> {laSo.menh}</div>
                  <div><strong>Cục:</strong> {laSo.cuc}</div>
                  <div><strong>Chủ Mệnh:</strong> {laSo.chuMenh}</div>
                  <div><strong>Chủ Thân:</strong> {laSo.chuThan}</div>
                  <div><strong>Mệnh Cư:</strong> {laSo.cungMenhChi}</div>
                  <div><strong>Thân Cư:</strong> {laSo.cungThanChi}</div>
                </div>
              </div>

              {renderCungCell(9)}

              {/* Row 3: Mão(3), [Mobile Info hoặc Space], Tuất(10) */}
              {renderCungCell(3)}
              
              <div className="col-span-2 hidden md:flex items-center justify-center p-3 bg-white/60 rounded-xl border border-dashed border-amber-300 text-stone-500 text-xs text-center italic">
                &ldquo;Đức năng thắng số - Tâm tạo vạn duyên. Vận mệnh do trời nhưng phúc đức do người tạo dựng.&rdquo;
              </div>

              {renderCungCell(10)}

              {/* Row 4: Dần(2), Sửu(1), Tý(0), Hợi(11) */}
              {renderCungCell(2)}
              {renderCungCell(1)}
              {renderCungCell(0)}
              {renderCungCell(11)}
            </div>
          </div>

          {/* Luận Giải Chi Tiết */}
          <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-6">
            <h4 className="text-xl font-serif font-bold text-[#8b1818] flex items-center gap-2 pb-3 border-b border-amber-100">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Luận Giải Tử Vi Toàn Thư</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* Tổng quan bản mệnh */}
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <User className="w-4 h-4 text-amber-700" />
                  <span>1. Tổng Quan Bản Mệnh & Tính Cách</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {laSo.luanGiai.tongQuan}
                </p>
              </div>

              {/* Công danh sự nghiệp */}
              <div className="p-4 bg-red-50/40 rounded-xl border border-red-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-900">
                  <Award className="w-4 h-4 text-red-700" />
                  <span>2. Công Danh & Sự Nghiệp (Cung Quan Lộc)</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {laSo.luanGiai.congDanh}
                </p>
              </div>

              {/* Tài vận */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>3. Tài Vận & Tiền Bạc (Cung Tài Bạch)</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {laSo.luanGiai.taiLoc}
                </p>
              </div>

              {/* Tình duyên */}
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>4. Tình Duyên & Gia Đạo (Cung Phu Thê)</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {laSo.luanGiai.tinhDuyen}
                </p>
              </div>

              {/* Sức khỏe */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <ShieldAlert className="w-4 h-4 text-blue-700" />
                  <span>5. Sức Khỏe & Thể Trạng (Cung Tật Ách)</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {laSo.luanGiai.sucKhoe}
                </p>
              </div>

              {/* Lời khuyên */}
              <div className="p-4 bg-gradient-to-br from-amber-100/70 to-orange-100/70 rounded-xl border border-amber-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#8b1818]">
                  <CheckCircle className="w-4 h-4 text-amber-700" />
                  <span>6. Lời Khuyên Tu Thân Tích Đức</span>
                </div>
                <p className="text-stone-800 leading-relaxed text-xs sm:text-sm italic">
                  {laSo.luanGiai.loiKhuyen}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
