'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Heart, ShieldCheck, Coffee, Info, Sparkles } from 'lucide-react';
import { HeritageDivider } from '@/components/HeritageDecorations';
import { ActiveTab } from '@/components/Header';
import { AppConfig, DEFAULT_APP_CONFIG, getStoredConfig } from '@/utils/adminConfig';

interface FooterProps {
  onNavigateTab?: (tab: ActiveTab) => void;
}

export default function Footer({ onNavigateTab }: FooterProps) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConfig(getStoredConfig());
    setMounted(true);
    const handleUpdate = () => {
      setConfig(getStoredConfig());
    };
    window.addEventListener('app-config-updated', handleUpdate);
    return () => window.removeEventListener('app-config-updated', handleUpdate);
  }, []);

  const handleNav = (tab: ActiveTab) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeFeatures = [
    ...(config.features.calendar ? [{ id: 'calendar' as ActiveTab, label: 'Lịch Tháng & Tờ Lịch Ngày Chi Tiết' }] : []),
    ...(config.features.tuvihangngay ? [{ id: 'tuvihangngay' as ActiveTab, label: 'Tử Vi 12 Con Giáp Mỗi Ngày' }] : []),
    ...(config.features.convert ? [{ id: 'convert' as ActiveTab, label: 'Đổi Ngày Âm - Dương Cổ Truyền' }] : []),
    ...(config.features.ngaytot ? [{ id: 'ngaytot' as ActiveTab, label: 'Xem Ngày Hoàng Đạo & Thần Sát Cát Hung' }] : []),
    ...(config.features.thansohoc ? [{ id: 'thansohoc' as ActiveTab, label: 'Thần Số Học: Bản Thân, Crush & Cặp Đôi' }] : []),
    ...(config.features.tuvi ? [{ id: 'tuvi' as ActiveTab, label: 'Lập Lá Số Tử Vi 12 Cung' }] : []),
    ...(config.features.saohan ? [{ id: 'saohan' as ActiveTab, label: 'Tra Cứu Sao Hạn, Tam Tai & Kim Lâu' }] : []),
    ...(config.features.gieoque ? [{ id: 'gieoque' as ActiveTab, label: 'Gieo Quẻ Kinh Dịch Chuẩn Xác' }] : []),
    ...(config.features.thuocloban ? [{ id: 'thuocloban' as ActiveTab, label: 'Thước Lỗ Ban Phong Thủy (3 Thước)' }] : []),
    ...(config.features.about ? [{ id: 'about' as ActiveTab, label: 'Về Chúng Tôi & Đồng Hành' }] : []),
  ];

  return (
    <footer className="bg-[#240e0b] text-amber-100/80 border-t-2 border-amber-600/40 mt-auto pt-6 pb-8 relative overflow-hidden" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <HeritageDivider label="Tinh Hoa Lịch Pháp Đại Việt" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-amber-900/60">
          {/* CỘT 1: LOGO & THƯƠNG HIỆU + NÚT TIẾP THÊM ĐỘNG LỰC */}
          <div>
            <div 
              onClick={() => handleNav('calendar')}
              className="flex items-center gap-2.5 mb-3 cursor-pointer group"
            >
              {config.branding.logoUrl ? (
                <img 
                  src={config.branding.logoUrl} 
                  alt={config.footer.title || config.branding.siteName || 'Logo'} 
                  className="h-8 w-auto max-w-[120px] max-h-8 object-contain group-hover:scale-105 transition-transform shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[#8b1818] font-bold text-xs shadow-sm border border-amber-200 group-hover:scale-105 transition-transform shrink-0">
                  {config.branding.logoText || 'ÂD'}
                </div>
              )}
              <h3 className="font-serif font-bold text-amber-200 text-lg group-hover:text-white transition-colors leading-tight">
                {config.footer.title || config.branding.siteName || 'Lịch Vạn Niên Đại Việt'}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-amber-200/70 mb-4">
              {config.footer.description || 'Công cụ tra cứu Lịch Âm Dương, Hoàng Đạo, Can Chi, Tiết Khí, Tử Vi, Thần Số Học và Phong Thủy truyền thống Việt Nam với thuật toán thiên văn độ chính xác cao.'}
            </p>
            <button
              onClick={() => handleNav('about')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-red-950" />
              <span>Tiếp thêm động lực cho tôi !</span>
            </button>
          </div>

          {/* CỘT 2: TÍNH NĂNG NỔI BẬT (ĐỒNG BỘ THEO CẤU HÌNH BẬT/TẮT TỪ ADMIN) */}
          <div>
            <h4 className="font-semibold text-amber-200 mb-3 text-sm uppercase tracking-wider">Tính Năng Nổi Bật</h4>
            <ul className={`text-sm space-y-2 text-amber-200/70 transition-opacity duration-150 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              {mounted && activeFeatures.map((item) => (
                <li key={item.id}>
                  <button onClick={() => handleNav(item.id)} className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5">
                    <span className="text-amber-400/80">•</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: PHIÊN BẢN & BẢN QUYỀN (MÔ TẢ CẤU HÌNH TỪ ADMIN) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="font-semibold text-amber-200 text-sm uppercase tracking-wider">
                {config.system.version ? `Phiên bản: ${config.system.version}` : 'Chuẩn Xác & Miễn Phí'}
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-amber-200/70 mb-3">
              {config.footer.versionDescription || 'Ứng dụng áp dụng giải thuật thiên văn Hồ Ngọc Đức múi giờ chuẩn GMT+7 Việt Nam, tương thích hoàn hảo trên mọi thiết bị máy tính và điện thoại.'}
            </p>
            <div className="text-xs text-amber-400/80 mb-2">
              {config.footer.copyright || `© ${new Date().getFullYear()} Lịch Vạn Niên Đại Việt. Lưu giữ nét đẹp văn hóa Việt.`}
            </div>
            <div className="text-[11px] text-stone-400">
              Liên hệ: <span className="font-mono text-amber-300">{config.contact.email || 'contact@lichvannien.vn'}</span>
            </div>
          </div>
        </div>

        {/* DÒNG CUỐI CÙNG CỦA FOOTER (CẤU HÌNH ĐƯỢC TOÀN BỘ TRONG ADMIN) */}
        <div className="pt-6 text-center text-xs text-amber-300/60 flex items-center justify-center gap-2 flex-wrap">
          <span>{config.footer.loveMessage || 'Phát triển với tâm huyết gìn giữ tinh hoa văn hóa truyền thống'}</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          {config.footer.bottomLinkText !== '' && (
            <>
              <span>•</span>
              <button 
                onClick={() => handleNav('about')} 
                className="text-amber-400 underline hover:text-amber-200 font-medium transition-colors"
              >
                {config.footer.bottomLinkText || 'Tiếp thêm động lực cho tôi !'}
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
