'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  RefreshCw, 
  Compass, 
  BookOpen, 
  Star, 
  Sparkles, 
  Ruler, 
  Sun, 
  ChevronDown,
  Layers,
  Sparkle,
  Heart
} from 'lucide-react';
import { AppConfig, DEFAULT_APP_CONFIG, getStoredConfig } from '@/utils/adminConfig';
import TopAnnouncementBanner from '@/components/TopAnnouncementBanner';

export type ActiveTab = 'calendar' | 'tuvihangngay' | 'convert' | 'ngaytot' | 'tuvi' | 'saohan' | 'gieoque' | 'thuocloban' | 'thansohoc' | 'about' | 'admin';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

interface DropdownItem {
  id: ActiveTab;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
}

interface NavGroup {
  type: 'single' | 'dropdown';
  id?: ActiveTab;
  label: string;
  icon: React.ReactNode;
  children?: DropdownItem[];
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load and listen for config updates
  useEffect(() => {
    setConfig(getStoredConfig());
    setMounted(true);
    const handleConfigUpdate = () => {
      setConfig(getStoredConfig());
    };
    window.addEventListener('app-config-updated', handleConfigUpdate);
    return () => window.removeEventListener('app-config-updated', handleConfigUpdate);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Filter navigation based on active feature toggles
  const rawNavGroups: NavGroup[] = [
    ...(config.features.calendar ? [{
      type: 'single' as const,
      id: 'calendar' as ActiveTab,
      label: 'Lịch Vạn Niên',
      icon: <Calendar className="w-4 h-4 shrink-0" />,
    }] : []),
    ...(config.features.ngaytot ? [{
      type: 'single' as const,
      id: 'ngaytot' as ActiveTab,
      label: 'Xem Ngày Tốt Xấu',
      icon: <Compass className="w-4 h-4 shrink-0" />,
    }] : []),
    ...(config.features.convert ? [{
      type: 'single' as const,
      id: 'convert' as ActiveTab,
      label: 'Đổi Ngày Âm Dương',
      icon: <RefreshCw className="w-4 h-4 shrink-0" />,
    }] : []),
    {
      type: 'dropdown' as const,
      label: 'Tử Vi & Vận Số',
      icon: <Sun className="w-4 h-4 shrink-0 text-amber-300" />,
      children: [
        ...(config.features.tuvihangngay ? [{
          id: 'tuvihangngay' as ActiveTab,
          label: 'Tử Vi Mỗi Ngày',
          sublabel: 'Dự đoán 12 Con Giáp & cát hung hôm nay',
          icon: <Sun className="w-4 h-4 text-amber-500" />,
        }] : []),
        ...(config.features.tuvi ? [{
          id: 'tuvi' as ActiveTab,
          label: 'Tử Vi Trọn Đời',
          sublabel: 'Lập lá số 12 cung & luận giải bản mệnh',
          icon: <BookOpen className="w-4 h-4 text-blue-500" />,
        }] : []),
        ...(config.features.saohan ? [{
          id: 'saohan' as ActiveTab,
          label: 'Sao Hạn & Giải Hạn',
          sublabel: 'Cửu Diệu, Tam Tai, Kim Lâu & văn khấn',
          icon: <Star className="w-4 h-4 text-amber-400" />,
        }] : []),
        ...(config.features.thansohoc ? [{
          id: 'thansohoc' as ActiveTab,
          label: 'Thần Số Học Pitago',
          sublabel: 'Bản Thân, Giải mã Crush & Cặp Đôi',
          icon: <Sparkles className="w-4 h-4 text-rose-400" />,
        }] : []),
      ],
    },
    {
      type: 'dropdown' as const,
      label: 'Phong Thủy & Dịch Học',
      icon: <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />,
      children: [
        ...(config.features.gieoque ? [{
          id: 'gieoque' as ActiveTab,
          label: 'Gieo Quẻ Kinh Dịch',
          sublabel: 'Bói Dịch 3 đồng xu 64 quẻ chuẩn xác',
          icon: <Sparkles className="w-4 h-4 text-purple-500" />,
        }] : []),
        ...(config.features.thuocloban ? [{
          id: 'thuocloban' as ActiveTab,
          label: 'Thước Lỗ Ban',
          sublabel: 'Thước 52.2cm, 42.9cm, 38.8cm phong thủy',
          icon: <Ruler className="w-4 h-4 text-amber-600" />,
        }] : []),
      ],
    },
    ...(config.features.about ? [{
      type: 'single' as const,
      id: 'about' as ActiveTab,
      label: 'Về Chúng Tôi',
      icon: <Heart className="w-4 h-4 shrink-0 text-rose-300" />,
    }] : []),
  ];

  // Filter out dropdowns if they have no active children
  const navGroups = rawNavGroups.filter((g) => {
    if (g.type === 'dropdown') {
      return g.children && g.children.length > 0;
    }
    return true;
  });

  // Check if a group contains current activeTab
  const isGroupActive = (group: NavGroup) => {
    if (group.type === 'single') {
      return activeTab === group.id;
    }
    return group.children?.some((child) => child.id === activeTab);
  };

  // Flattened mobile items
  const mobileNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    ...(config.features.calendar ? [{ id: 'calendar' as ActiveTab, label: 'Lịch Tháng', icon: <Calendar className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.tuvihangngay ? [{ id: 'tuvihangngay' as ActiveTab, label: 'Tử Vi Ngày', icon: <Sun className="w-3.5 h-3.5 text-amber-300" /> }] : []),
    ...(config.features.ngaytot ? [{ id: 'ngaytot' as ActiveTab, label: 'Ngày Tốt Xấu', icon: <Compass className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.convert ? [{ id: 'convert' as ActiveTab, label: 'Đổi Ngày', icon: <RefreshCw className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.tuvi ? [{ id: 'tuvi' as ActiveTab, label: 'Tử Vi Trọn Đời', icon: <BookOpen className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.saohan ? [{ id: 'saohan' as ActiveTab, label: 'Sao Hạn', icon: <Star className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.thansohoc ? [{ id: 'thansohoc' as ActiveTab, label: 'Thần Số Học', icon: <Sparkles className="w-3.5 h-3.5 text-rose-300" /> }] : []),
    ...(config.features.gieoque ? [{ id: 'gieoque' as ActiveTab, label: 'Gieo Quẻ', icon: <Sparkles className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.thuocloban ? [{ id: 'thuocloban' as ActiveTab, label: 'Thước Lỗ Ban', icon: <Ruler className="w-3.5 h-3.5" /> }] : []),
    ...(config.features.about ? [{ id: 'about' as ActiveTab, label: 'Về Chúng Tôi', icon: <Heart className="w-3.5 h-3.5 text-rose-300" /> }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#8b1818] text-white shadow-md border-b-2 border-[#d4af37]" ref={dropdownRef} suppressHydrationWarning>
      {/* Top Announcement Banner Động & Lên lịch */}
      <TopAnnouncementBanner config={config} />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo & Brand */}
          <div 
            onClick={() => {
              setActiveTab('calendar');
              setOpenDropdown(null);
            }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            {config.branding.logoUrl ? (
              <img 
                src={config.branding.logoUrl} 
                alt={config.branding.siteName || 'Logo'} 
                className="h-9 w-auto max-w-[140px] max-h-9 object-contain group-hover:scale-105 transition-transform shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[#8b1818] font-bold text-base shadow-sm border border-amber-200 group-hover:scale-105 transition-transform shrink-0">
                {config.branding.logoText || 'ÂD'}
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className="text-base lg:text-lg font-serif font-bold tracking-wide text-amber-200 leading-tight whitespace-nowrap">
                {config.branding.siteName || 'LỊCH VẠN NIÊN'}
              </h1>
              <p className="text-[10px] text-amber-100/75 tracking-wider leading-none whitespace-nowrap">
                {config.branding.tagline || 'Đại Việt Phong Thủy & Lịch Pháp'}
              </p>
            </div>
          </div>

          {/* Desktop Nav: Clean items with Dropdowns */}
          <div className="hidden lg:flex items-center gap-2">
            <nav className={`flex items-center gap-1.5 shrink-0 transition-opacity duration-150 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              {mounted && navGroups.map((group, idx) => {
                const isActive = isGroupActive(group);

                if (group.type === 'single' && group.id) {
                  return (
                    <button
                      key={group.id}
                      onClick={() => {
                        setActiveTab(group.id as ActiveTab);
                        setOpenDropdown(null);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-amber-400 text-red-950 font-bold shadow scale-[1.02]'
                          : 'text-amber-100 hover:bg-red-900/70 hover:text-white'
                      }`}
                    >
                      {group.icon}
                      <span>{group.label}</span>
                    </button>
                  );
                }

                const isDropdownOpen = openDropdown === group.label;
                return (
                  <div 
                    key={idx} 
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(group.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setOpenDropdown(isDropdownOpen ? null : group.label);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-amber-400 text-red-950 font-bold shadow'
                          : 'text-amber-100 hover:bg-red-900/70 hover:text-white'
                      }`}
                    >
                      {group.icon}
                      <span>{group.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu Popup with invisible padding bridge */}
                    {isDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 pt-1.5 w-64 z-50 animate-fadeIn"
                        onMouseEnter={() => handleMouseEnter(group.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-[#701212] border-2 border-amber-400/50 rounded-2xl shadow-2xl overflow-hidden py-1.5 backdrop-blur-md">
                          {group.children?.map((child) => {
                            const isChildActive = activeTab === child.id;
                            return (
                              <button
                                key={child.id}
                                onClick={() => {
                                  setActiveTab(child.id);
                                  setOpenDropdown(null);
                                }}
                                className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 transition-colors ${
                                  isChildActive
                                    ? 'bg-amber-400 text-red-950 font-bold'
                                    : 'text-amber-100 hover:bg-red-900/90 hover:text-amber-200'
                                }`}
                              >
                                <div className="p-1.5 rounded-lg bg-black/20 shrink-0 mt-0.5">
                                  {child.icon}
                                </div>
                                <div>
                                  <div className="text-xs font-serif font-bold leading-tight">
                                    {child.label}
                                  </div>
                                  {child.sublabel && (
                                    <div className={`text-[10px] mt-0.5 leading-snug ${
                                      isChildActive ? 'text-red-900/80 font-normal' : 'text-amber-200/60'
                                    }`}>
                                      {child.sublabel}
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Menu Bar */}
        <div className={`lg:hidden flex items-center gap-1.5 overflow-x-auto pb-2.5 pt-0.5 scrollbar-none no-scrollbar transition-opacity duration-150 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {mounted && mobileNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-amber-400 text-red-950 font-bold shadow'
                    : 'bg-red-900/60 text-amber-100 hover:bg-red-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
