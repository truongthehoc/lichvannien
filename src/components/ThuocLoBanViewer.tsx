'use client';

import React, { useState } from 'react';
import { Ruler, CheckCircle2, XCircle, Sparkles, Home, Layers, Landmark } from 'lucide-react';
import { checkLoBan522, checkLoBan429, checkLoBan388 } from '@/utils/thuocloban';

export default function ThuocLoBanViewer() {
  const [cm, setCm] = useState<number>(215);

  const res522 = checkLoBan522(cm);
  const res429 = checkLoBan429(cm);
  const res388 = checkLoBan388(cm);

  const presets = [
    { label: 'Cửa Chính (Thông thủy)', val: 215 },
    { label: 'Cửa Phòng Ngủ', val: 81 },
    { label: 'Cửa Sổ', val: 125 },
    { label: 'Chiều Cao Bếp', val: 81 },
    { label: 'Bàn Thờ (Chiều ngang)', val: 127 },
    { label: 'Bàn Thờ (Chiều sâu)', val: 61 },
    { label: 'Bàn Thờ (Chiều cao)', val: 127 },
    { label: 'Giường Ngủ', val: 180 },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b1818] flex items-center justify-center gap-2">
          <Ruler className="w-7 h-7 text-amber-600" />
          <span>Thước Lỗ Ban Phong Thủy Trực Tuyến</span>
        </h2>
        <p className="text-sm text-stone-600">
          Tra cứu cung Đỏ (Cát Lành) & cung Đen (Hung Họa) trên 3 loại thước Lỗ Ban tiêu chuẩn xây dựng
        </p>
      </div>

      {/* Main Measurement Controller */}
      <div className="heritage-card p-6 sm:p-8 bg-white border border-[#ebdccb] space-y-6">
        {/* Input measurement */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/60 p-4 sm:p-6 rounded-2xl border border-amber-200">
          <div className="space-y-1 text-center sm:text-left">
            <label className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              KÍCH THƯỚC ĐANG ĐO (Centimet - cm):
            </label>
            <div className="text-xs text-stone-500">
              Tương đương: <strong>{(cm * 10).toFixed(0)} mm</strong> • <strong>{(cm / 100).toFixed(2)} m</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              min="1"
              max="1000"
              value={cm}
              onChange={(e) => setCm(parseFloat(e.target.value) || 0)}
              className="w-36 sm:w-44 text-center p-3 text-2xl sm:text-3xl font-serif font-bold text-red-900 bg-white border-2 border-amber-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 shadow-inner"
            />
            <span className="font-bold text-stone-700 text-lg">cm</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="10"
            max="400"
            step="0.5"
            value={cm}
            onChange={(e) => setCm(parseFloat(e.target.value))}
            className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#8b1818]"
          />
          <div className="flex justify-between text-xs text-stone-400 font-medium">
            <span>10 cm</span>
            <span>100 cm (1m)</span>
            <span>200 cm (2m)</span>
            <span>300 cm (3m)</span>
            <span>400 cm (4m)</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-xs font-bold text-stone-600 uppercase block mb-2">Gợi ý kích thước phong thủy chuẩn:</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCm(p.val)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  cm === p.val
                    ? 'bg-amber-500 text-red-950 font-bold border-amber-600 shadow-sm'
                    : 'bg-stone-50 hover:bg-amber-100 text-stone-700 border-stone-200'
                }`}
              >
                {p.label} ({p.val}cm)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Thước Results */}
      <div className="space-y-6">
        {/* 1. Thước 52.2cm: Thông Thủy (Cửa, Cổng) */}
        <div className={`heritage-card p-6 border-2 transition-all ${
          res522.isTot ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-red-400 shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                  1. Thước 52.2cm (Thông Thủy)
                </h3>
                <p className="text-xs text-stone-500">
                  Đo lọt lòng các loại cửa đi, cửa sổ, chiều cao tầng, ô thoáng khí
                </p>
              </div>
            </div>

            <span className={`self-start sm:self-auto text-xs sm:text-sm px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
              res522.isTot ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'
            }`}>
              {res522.isTot ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              <span>{res522.isTot ? 'CUNG ĐỎ (ĐẠI CÁT)' : 'CUNG ĐEN (HUNG HẠI)'}</span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Cung Lớn:</span>
              <strong className={`text-base font-serif ${res522.isTot ? 'text-emerald-700' : 'text-red-700'}`}>
                {res522.name}
              </strong>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Cung Phụ:</span>
              <strong className="text-stone-800">{res522.subCung}</strong>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Ý Nghĩa Phong Thủy:</span>
              <span className="text-stone-700">{res522.meaning}</span>
            </div>
          </div>
        </div>

        {/* 2. Thước 42.9cm: Dương Trạch (Bếp, bậc cầu thang, khối xây dựng) */}
        <div className={`heritage-card p-6 border-2 transition-all ${
          res429.isTot ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-red-400 shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                  2. Thước 42.9cm (Dương Trạch)
                </h3>
                <p className="text-xs text-stone-500">
                  Đo khối xây dựng phủ bì: Bếp đun, bệ bếp, bậc cầu thang, giường ngủ, bàn ghế
                </p>
              </div>
            </div>

            <span className={`self-start sm:self-auto text-xs sm:text-sm px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
              res429.isTot ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'
            }`}>
              {res429.isTot ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              <span>{res429.isTot ? 'CUNG ĐỎ (ĐẠI CÁT)' : 'CUNG ĐEN (HUNG HẠI)'}</span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Cung Lớn:</span>
              <strong className={`text-base font-serif ${res429.isTot ? 'text-emerald-700' : 'text-red-700'}`}>
                {res429.name}
              </strong>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Cung Phụ:</span>
              <strong className="text-stone-800">{res429.subCung}</strong>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Ý Nghĩa Phong Thủy:</span>
              <span className="text-stone-700">{res429.meaning}</span>
            </div>
          </div>
        </div>

        {/* 3. Thước 38.8cm: Âm Phần (Bàn Thờ, Mồ Mả) */}
        <div className={`heritage-card p-6 border-2 transition-all ${
          res388.isTot ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-red-400 shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                  3. Thước 38.8cm (Âm Phần & Đồ Thờ Cúng)
                </h3>
                <p className="text-xs text-stone-500">
                  Đo kích thước bàn thờ gia tiên, sập thờ, tiểu quách, bia mộ, đồ thờ tự
                </p>
              </div>
            </div>

            <span className={`self-start sm:self-auto text-xs sm:text-sm px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
              res388.isTot ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'
            }`}>
              {res388.isTot ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              <span>{res388.isTot ? 'CUNG ĐỎ (ĐẠI CÁT)' : 'CUNG ĐEN (HUNG HẠI)'}</span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Cung Lớn:</span>
              <strong className={`text-base font-serif ${res388.isTot ? 'text-emerald-700' : 'text-red-700'}`}>
                {res388.name}
              </strong>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Cung Phụ:</span>
              <strong className="text-stone-800">{res388.subCung}</strong>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-stone-500 text-xs block">Ý Nghĩa Phong Thủy:</span>
              <span className="text-stone-700">{res388.meaning}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
