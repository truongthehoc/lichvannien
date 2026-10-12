import React from 'react';

/**
 * Các họa tiết hoa văn dân tộc Việt Nam (Trống Đồng Đông Sơn, Vân Mây, Hoa Sen, Hồi Văn)
 */

export function DongSonBackgroundWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Góc trên bên trái: Trống Đồng Đông Sơn lớn */}
      <svg
        className="absolute -top-32 -left-32 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] text-amber-800/[0.035] dark:text-amber-500/[0.03] transition-all"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Mặt trời 14 tia sáng ở tâm */}
        <circle cx="200" cy="200" r="18" fill="currentColor" />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i * 360) / 14;
          return (
            <polygon
              key={i}
              points="196,178 204,178 200,140"
              fill="currentColor"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
        {/* Vòng tròn đồng tâm */}
        <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="115" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 3" />
        <circle cx="200" cy="200" r="145" stroke="currentColor" strokeWidth="2" />
        {/* Họa tiết răng cưa */}
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="2" />
        <circle cx="200" cy="200" r="195" stroke="currentColor" strokeWidth="3.5" />
      </svg>

      {/* Góc dưới bên phải: Trống Đồng Đông Sơn lớn đối xứng */}
      <svg
        className="absolute -bottom-36 -right-36 w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] text-red-900/[0.035] dark:text-red-500/[0.03] transition-all"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="18" fill="currentColor" />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i * 360) / 14;
          return (
            <polygon
              key={i}
              points="196,178 204,178 200,140"
              fill="currentColor"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
        <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="115" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 3" />
        <circle cx="200" cy="200" r="145" stroke="currentColor" strokeWidth="2" />
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="2" />
        <circle cx="200" cy="200" r="195" stroke="currentColor" strokeWidth="3.5" />
      </svg>

      {/* Vân mây cổ truyền lơ lửng ở 2 bên mép màn hình */}
      <div className="absolute top-1/3 -left-12 opacity-30 text-amber-700/10">
        <VietnameseCloudPattern className="w-64 h-32" />
      </div>
      <div className="absolute top-2/3 -right-12 opacity-30 text-amber-700/10 rotate-180">
        <VietnameseCloudPattern className="w-64 h-32" />
      </div>
    </div>
  );
}

/**
 * Họa tiết Vân Mây cổ truyền Việt Nam dạng SVG
 */
export function VietnameseCloudPattern({ className = 'w-48 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 80" fill="currentColor" className={className}>
      <path d="M20,60 C10,60 0,50 0,40 C0,30 10,20 25,20 C30,10 45,0 65,0 C90,0 105,15 110,30 C120,25 135,28 140,38 C155,40 160,52 150,62 C140,72 125,70 120,65 C110,75 95,80 80,75 C65,80 50,75 40,68 C35,72 25,70 20,60 Z" fillOpacity="0.6"/>
      <path d="M40,50 C30,50 25,45 28,38 C32,30 45,28 55,35 C65,25 80,25 90,32 C98,28 108,32 108,40 C118,42 120,50 115,55" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Hoa văn góc truyền thống (Chữ Vạn / Góc Hồi Văn)
 */
export function HeritageCornerPattern({ className = 'w-6 h-6 text-amber-600/60' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <path d="M2 2 H38 V8 H8 V38 H2 V2 Z" />
      <path d="M12 12 H28 V16 H16 V28 H12 V12 Z" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}

/**
 * Dải phân cách hoa văn họa tiết truyền thống
 */
export function HeritageDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-6 text-amber-700/60 select-none">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-amber-600/80 flex-1 max-w-[120px] sm:max-w-[200px]" />
      <div className="flex items-center gap-2">
        <span className="text-xs">❖</span>
        {label ? (
          <span className="font-serif text-xs font-bold text-amber-900 tracking-wider uppercase px-2">
            {label}
          </span>
        ) : (
          <span className="w-2.5 h-2.5 rotate-45 border-2 border-amber-600/70 bg-amber-100" />
        )}
        <span className="text-xs">❖</span>
      </div>
      <div className="h-[1px] bg-gradient-to-l from-transparent via-amber-400/60 to-amber-600/80 flex-1 max-w-[120px] sm:max-w-[200px]" />
    </div>
  );
}
