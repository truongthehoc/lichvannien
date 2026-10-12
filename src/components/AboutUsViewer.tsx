'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Landmark, 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Check, 
  Mail, 
  Compass, 
  Download, 
  History, 
  GitBranch, 
  CheckCircle2, 
  Calendar,
  Phone,
  Layers,
  ChevronRight
} from 'lucide-react';
import { HeritageCornerPattern, HeritageDivider } from './HeritageDecorations';
import { 
  AppConfig, 
  DEFAULT_APP_CONFIG, 
  getStoredConfig, 
  getVietQrUrl, 
  VIETNAM_BANKS, 
  getLatest3Versions 
} from '@/utils/adminConfig';

export default function AboutUsViewer() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [qrImgError, setQrImgError] = useState(false);

  useEffect(() => {
    setConfig(getStoredConfig());
    const handleUpdate = () => {
      setConfig(getStoredConfig());
    };
    window.addEventListener('app-config-updated', handleUpdate);
    return () => window.removeEventListener('app-config-updated', handleUpdate);
  }, []);

  const bankInfo = {
    bankName: config.donation.bankName || 'Ngân hàng Quân Đội (MB Bank)',
    accountNumber: config.donation.accountNumber || '0399888999',
    accountHolder: config.donation.accountHolder || 'NGUYEN VAN ADMIN (LICH VAN NIEN)',
    branch: config.donation.branch || 'Chi nhánh Hà Nội',
    content: config.donation.content || 'Ủng hộ dự án Lịch Vạn Niên Đại Việt',
  };

  const copyToClipboard = (text: string, type: 'bank' | 'content') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  const currentBank = VIETNAM_BANKS.find(
    (b) => b.code.toUpperCase() === (config.donation.bankCode || 'MB').toUpperCase()
  ) || {
    code: config.donation.bankCode || 'MB',
    name: config.donation.bankName || 'Ngân hàng Quân Đội (MB Bank)',
    shortName: config.donation.bankCode || 'MBBANK',
  };

  // QR thuần chuẩn hóa
  const vietQrUrl = getVietQrUrl(
    config.donation.bankCode || 'MB',
    bankInfo.accountNumber,
    config.donation.qrTemplate || 'compact2',
    undefined,
    bankInfo.content,
    bankInfo.accountHolder
  );

  // Tự động lấy 3 phiên bản gần nhất (đồng bộ với cấu hình deploy hệ thống)
  const versionList = getLatest3Versions(config);

  const intro = {
    badge: config.aboutIntro?.badge || 'Tinh Hoa Văn Hóa Việt',
    title: config.aboutIntro?.title || config.branding.siteName || 'LỊCH VẠN NIÊN',
    description: config.aboutIntro?.description || 'Dự án phi lợi nhuận với tâm nguyện gìn giữ, chuẩn hóa và số hóa kho tàng Lịch Pháp, Phong Thủy và Chiêm Tinh cổ truyền Việt Nam trên nền tảng công nghệ hiện đại. Áp dụng giải thuật thiên văn chuẩn xác của nhà nghiên cứu Hồ Ngọc Đức (múi giờ GMT+7 Việt Nam).',
    quote: config.aboutIntro?.quote || 'Văn hóa là hồn cốt của Dân tộc, còn văn hóa là còn dân tộc.',
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* KHUNG BỐ CỤC CHÍNH: TRÁI RỘNG THOÁNG (8 PHẦN) - PHẢI TINH TẾ THU GỌN (4 PHẦN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ========================================================================= */}
        {/* CỘT BÊN TRÁI: KHUNG THÔNG TIN MÀU ĐỎ & LỊCH SỬ 3 PHIÊN BẢN (8 CỘT RỘNG RÃI) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 flex flex-col gap-5 h-full justify-between">
          {/* 1. KHUNG THÔNG TIN MÀU ĐỎ TRUYỀN THỐNG (ĐƯỢC CẤU HÌNH TỪ ADMIN) */}
          <div className="bg-gradient-to-br from-[#8b1818] via-[#7a1515] to-[#5a0d0d] rounded-2xl p-5 sm:p-6 text-white shadow-lg border-2 border-amber-400/60 relative overflow-hidden space-y-3">
            {/* Dong Son Drum Background Watermark */}
            <div className="absolute right-[-30px] -bottom-10 w-64 h-64 opacity-10 pointer-events-none select-none">
              <svg viewBox="0 0 400 400" fill="currentColor">
                <circle cx="200" cy="200" r="18" />
                <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" fill="none" />
                <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-red-950 font-bold text-xs shadow-xs">
                <Landmark className="w-3.5 h-3.5" />
                <span>{intro.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-wide">
                {intro.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                {intro.description}
              </p>
            </div>

            {/* Trích dẫn */}
            {intro.quote && (
              <div className="relative z-10 p-2.5 bg-amber-400/10 rounded-xl border border-amber-400/30 text-center">
                <p className="font-serif italic text-xs text-amber-200 font-medium">
                  "{intro.quote}"
                </p>
              </div>
            )}
          </div>

          {/* 2. LỊCH SỬ PHIÊN BẢN (CHỈ HIỂN THỊ 3 PHIÊN BẢN GẦN NHẤT) */}
          <div className="heritage-card p-5 sm:p-6 bg-white border border-[#ebdccb] rounded-2xl space-y-4 shadow-xs relative overflow-hidden flex-1 flex flex-col justify-between">
            <HeritageCornerPattern className="absolute top-2 left-2 w-5 h-5 text-amber-700/30 pointer-events-none" />
            <HeritageCornerPattern className="absolute top-2 right-2 w-5 h-5 text-amber-700/30 pointer-events-none rotate-90" />

            <div className="border-b border-amber-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#8b1818]">
                  Lịch Sử Cập Nhật & Phiên Bản
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {config.system.version || 'v2.5.0'}
              </span>
            </div>

            {/* Danh sách 3 Timeline gần nhất */}
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              {versionList.map((ver, idx) => (
                <div key={idx} className="relative pl-5 pb-2.5 border-l-2 border-amber-200 last:border-l-0 last:pb-0">
                  {/* Dot */}
                  <div className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs ${
                    idx === 0 ? 'bg-amber-600' : 'bg-slate-400'
                  }`}></div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                        {ver.version}
                      </span>
                      <span className={`text-[9px] px-2 py-0.2 rounded-full font-bold shadow-2xs ${ver.badgeColor}`}>
                        {ver.badge}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">
                        ({ver.date})
                      </span>
                    </div>

                    <ul className="text-[11px] text-stone-600 space-y-0.5 pt-0.5">
                      {ver.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CỘT BÊN PHẢI: KHUNG DONATE & MÃ VIETQR (4 CỘT TINH TẾ, GỌN GÀNG) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 h-full">
          <div className="heritage-card p-4 sm:p-5 bg-gradient-to-br from-white via-[#fffdfa] to-[#faf3e6] border-2 border-amber-400 rounded-2xl shadow-md flex flex-col justify-between h-full space-y-3.5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold text-[11px] border border-rose-200">
                <Heart className="w-3 h-3 text-rose-600 fill-current" />
                <span>Chung Tay Nuôi Dưỡng Dự Án</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#8b1818] pt-0.5">
                Ủng Hộ & Đồng Hành
              </h3>
              <p className="text-[11px] text-stone-600 leading-tight">
                Quét mã VietQR bằng mọi ứng dụng ngân hàng
              </p>
            </div>

            {/* KHUNG HIỂN THỊ MÃ VIETQR TINH TẾ */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-amber-300 shadow-2xs text-center space-y-1.5">
              <div className="relative p-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-inner w-full max-w-[165px] flex items-center justify-center">
                <div className="bg-white p-1 rounded-lg w-full flex items-center justify-center min-h-[150px]">
                  {vietQrUrl && !qrImgError ? (
                    <img
                      src={vietQrUrl}
                      alt={`VietQR ${bankInfo.bankName}`}
                      className="w-full h-auto object-contain rounded-md hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(vietQrUrl, '_blank')}
                      onError={() => setQrImgError(true)}
                      title="Bấm để mở ảnh QR lớn"
                    />
                  ) : (
                    <div className="p-3 text-center space-y-1">
                      <QrCode className="w-12 h-12 text-stone-800 mx-auto opacity-70" />
                      <div className="text-[11px] font-mono text-stone-600 font-bold">{bankInfo.accountNumber}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[10px] text-stone-700 font-bold flex items-center justify-center gap-1">
                  <span>Quét mã</span>
                  <span className="text-red-700 font-black">VietQR</span>
                  <span>tự động nhận diện</span>
                </div>
                {vietQrUrl && !qrImgError && (
                  <button
                    type="button"
                    onClick={() => window.open(vietQrUrl, '_blank')}
                    className="text-[10px] text-amber-800 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-2.5 h-2.5" />
                    <span>Tải / Mở ảnh QR lớn</span>
                  </button>
                )}
              </div>
            </div>

            {/* Chi tiết thông tin chuyển khoản (Thu gọn & Tối giản trong 1 khung) */}
            <div className="bg-white rounded-xl p-2.5 border border-amber-200/80 shadow-2xs space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-stone-600">
                <span className="text-stone-500 text-[10px]">Ngân hàng:</span>
                <div className="font-bold text-stone-800 flex items-center gap-1 text-right">
                  <span className="truncate max-w-[130px]">{bankInfo.bankName}</span>
                  <span className="px-1 py-0.2 rounded bg-blue-50 text-blue-800 text-[9px] font-mono font-bold border border-blue-200 shrink-0">
                    {currentBank.shortName}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 pt-1">
                <span className="text-stone-500 text-[10px]">Số TK:</span>
                <div className="flex items-center gap-1">
                  <span className="font-mono font-bold text-xs text-[#8b1818] tracking-wider">{bankInfo.accountNumber}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(bankInfo.accountNumber, 'bank')}
                    className="p-0.5 hover:bg-amber-100 text-amber-900 rounded transition-colors flex items-center gap-0.5"
                    title="Sao chép số tài khoản"
                  >
                    {copiedBank ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span className="text-[9px] font-sans font-bold text-amber-800">{copiedBank ? 'Đã chép' : 'Chép'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 pt-1">
                <span className="text-stone-500 text-[10px]">Chủ TK:</span>
                <span className="font-bold text-stone-800 uppercase tracking-wide text-right text-[10px]">{bankInfo.accountHolder}</span>
              </div>

              {bankInfo.content && (
                <div className="flex items-center justify-between border-t border-stone-100 pt-1">
                  <span className="text-stone-500 text-[10px]">Nội dung:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] text-stone-700 bg-stone-50 px-1 py-0.2 rounded truncate max-w-[120px]">
                      {bankInfo.content}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(bankInfo.content, 'content')}
                      className="p-0.5 hover:bg-stone-200 text-stone-600 rounded transition-colors shrink-0"
                      title="Sao chép nội dung"
                    >
                      {copiedContent ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cam kết minh bạch */}
            <div className="p-2 bg-emerald-50/80 border border-emerald-300/80 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <div className="text-[10px] text-emerald-950 leading-tight">
                <strong>100% Minh bạch:</strong> Kinh phí duy trì Cloud Server & tên miền phi lợi nhuận.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TIẾP THEO LÀ HÒM THƯ GÓP Ý & HỢP TÁC (FULL WIDTH) */}
      {/* ========================================================================= */}
      <div className="heritage-card p-5 sm:p-6 bg-white border border-[#ebdccb] rounded-2xl shadow-xs text-center space-y-3">
        <div className="max-w-2xl mx-auto space-y-1.5">
          <h4 className="font-serif font-bold text-base sm:text-lg text-[#8b1818] flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-amber-600" />
            <span>Hòm Thư Góp Ý & Hợp Tác Văn Hóa</span>
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Mọi ý kiến đóng góp về thuật toán phong thủy, tư liệu lịch pháp cổ truyền hoặc đề xuất tính năng mới, xin vui lòng gửi về:
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${config.contact.email || 'contact@lichvannien.vn'}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-300 font-mono text-xs sm:text-sm font-bold text-[#8b1818] transition-colors shadow-2xs"
          >
            <Mail className="w-4 h-4 text-amber-700" />
            <span>{config.contact.email || 'contact@lichvannien.vn'}</span>
          </a>

          {config.contact.hotline && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-stone-700">
              <Phone className="w-4 h-4 text-slate-500" />
              <span>Hotline: {config.contact.hotline}</span>
            </div>
          )}
        </div>

        <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100 max-w-xl mx-auto">
          Xin chân thành cảm ơn và kính chúc Quý độc giả Vạn Sự Như Ý - Cát Tường Như Nguyện! 🙏
        </div>
      </div>
    </div>
  );
}
