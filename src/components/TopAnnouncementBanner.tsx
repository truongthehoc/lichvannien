'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Megaphone } from 'lucide-react';
import { 
  AppConfig, 
  AnnouncementEffect, 
  AnnouncementTheme,
  getStoredConfig
} from '@/utils/adminConfig';

interface TopAnnouncementBannerProps {
  config: AppConfig;
  previewMode?: boolean;
  testTrigger?: number; // Pass a number that increments to force rerun test cycle in preview
  onStatusChange?: (status: 'waiting' | 'showing' | 'hidden', countdown: number) => void;
}

export default function TopAnnouncementBanner({ 
  config: propConfig, 
  previewMode = false,
  testTrigger = 0,
  onStatusChange
}: TopAnnouncementBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [activeConfig, setActiveConfig] = useState<AppConfig>(propConfig);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with propConfig & listen to live global updates
  useEffect(() => {
    setMounted(true);
    if (!previewMode) {
      setActiveConfig(getStoredConfig());
    } else {
      setActiveConfig(propConfig);
    }

    const handleUpdate = () => {
      if (!previewMode) {
        setActiveConfig(getStoredConfig());
        setIsDismissed(false); // Reset dismiss on new config save
      }
    };

    window.addEventListener('app-config-updated', handleUpdate);
    return () => window.removeEventListener('app-config-updated', handleUpdate);
  }, [propConfig, previewMode]);

  const currentConfig = previewMode ? propConfig : activeConfig;

  const settings = currentConfig.system?.announcementSettings || {
    text: currentConfig.system?.announcement || '',
    enabled: currentConfig.system?.showAnnouncement || false,
    effect: 'slide_down' as AnnouncementEffect,
    theme: 'gold' as AnnouncementTheme,
    delaySeconds: 0,
    durationSeconds: 0,
    allowClose: true,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  // Enabled if EITHER settings.enabled is true OR system.showAnnouncement is true
  const isEnabled = previewMode 
    ? true 
    : Boolean(settings.enabled || currentConfig.system?.showAnnouncement);

  const announcementText = settings.text || currentConfig.system?.announcement || '';

  // Clear all pending timers
  const clearAllTimers = () => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    if (durationTimerRef.current) clearTimeout(durationTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  };

  // Main Effect for handling Delay, Duration, Schedule, and Visibility
  useEffect(() => {
    if (!mounted) return;
    clearAllTimers();

    if (!isEnabled || !announcementText || isDismissed) {
      setIsVisible(false);
      onStatusChange?.('hidden', 0);
      return;
    }

    // Date & Time Scheduling Check (Only on public view, not in previewMode)
    if (!previewMode) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      if (settings.startDate && settings.startDate.trim() !== '' && todayStr < settings.startDate.trim()) {
        setIsVisible(false);
        onStatusChange?.('hidden', 0);
        return;
      }
      if (settings.endDate && settings.endDate.trim() !== '' && todayStr > settings.endDate.trim()) {
        setIsVisible(false);
        onStatusChange?.('hidden', 0);
        return;
      }
      if (settings.startTime && settings.startTime.trim() !== '' && currentTimeStr < settings.startTime.trim()) {
        setIsVisible(false);
        onStatusChange?.('hidden', 0);
        return;
      }
      if (settings.endTime && settings.endTime.trim() !== '' && currentTimeStr > settings.endTime.trim()) {
        setIsVisible(false);
        onStatusChange?.('hidden', 0);
        return;
      }
    }

    const delaySec = Math.max(0, Number(settings.delaySeconds) || 0);
    const durationSec = Math.max(0, Number(settings.durationSeconds) || 0);

    const startShowingPhase = () => {
      setIsVisible(true);
      if (durationSec > 0) {
        let remaining = durationSec;
        onStatusChange?.('showing', remaining);
        countdownTimerRef.current = setInterval(() => {
          remaining -= 1;
          if (remaining >= 0) {
            onStatusChange?.('showing', remaining);
          }
        }, 1000);

        durationTimerRef.current = setTimeout(() => {
          setIsVisible(false);
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          onStatusChange?.('hidden', 0);
        }, durationSec * 1000);
      } else {
        onStatusChange?.('showing', 0);
      }
    };

    if (delaySec > 0) {
      setIsVisible(false);
      let waitCountdown = delaySec;
      onStatusChange?.('waiting', waitCountdown);

      countdownTimerRef.current = setInterval(() => {
        waitCountdown -= 1;
        if (waitCountdown > 0) {
          onStatusChange?.('waiting', waitCountdown);
        } else {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        }
      }, 1000);

      delayTimerRef.current = setTimeout(() => {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        startShowingPhase();
      }, delaySec * 1000);
    } else {
      startShowingPhase();
    }

    return () => clearAllTimers();
  }, [
    mounted,
    isEnabled,
    announcementText,
    settings.delaySeconds,
    settings.durationSeconds,
    settings.startDate,
    settings.endDate,
    settings.startTime,
    settings.endTime,
    testTrigger,
    previewMode,
    isDismissed
  ]);

  if (!mounted) return null;
  if (!isEnabled || !announcementText || isDismissed) {
    if (!previewMode) return null;
  }

  // Theme colors
  const themeClasses: Record<AnnouncementTheme, { bg: string; text: string; close: string; border: string }> = {
    gold: {
      bg: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500',
      text: 'text-red-950 font-bold',
      close: 'hover:bg-amber-600/30 text-red-950',
      border: 'border-amber-600/40',
    },
    red: {
      bg: 'bg-gradient-to-r from-[#8b1818] via-[#a82323] to-[#8b1818]',
      text: 'text-amber-100 font-bold',
      close: 'hover:bg-red-900/40 text-amber-200',
      border: 'border-amber-400/40',
    },
    emerald: {
      bg: 'bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800',
      text: 'text-emerald-50 font-bold',
      close: 'hover:bg-emerald-900/40 text-emerald-200',
      border: 'border-emerald-400/40',
    },
    purple: {
      bg: 'bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900',
      text: 'text-amber-200 font-bold',
      close: 'hover:bg-purple-950/40 text-amber-300',
      border: 'border-purple-400/40',
    },
    blue: {
      bg: 'bg-gradient-to-r from-blue-900 via-sky-700 to-blue-900',
      text: 'text-white font-bold',
      close: 'hover:bg-blue-950/40 text-sky-200',
      border: 'border-sky-400/40',
    },
  };

  const currentTheme = themeClasses[settings.theme || 'gold'] || themeClasses.gold;
  const effect = settings.effect || 'slide_down';

  return (
    <div
      className={`relative z-50 overflow-hidden transition-all duration-500 ease-in-out ${currentTheme.bg} ${
        isVisible ? 'max-h-24 opacity-100 border-b shadow-sm' : 'max-h-0 opacity-0 border-b-0 pointer-events-none'
      } ${currentTheme.border} ${effect === 'pulse' && isVisible ? 'animate-pulse' : ''}`}
    >
      {/* Hiệu ứng Shimmer quét sáng */}
      {effect === 'shimmer' && isVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep"></div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 py-1.5 flex items-center justify-between gap-3 text-xs">
        {/* Nút biểu tượng hoặc tag */}
        <div className="flex items-center gap-1.5 shrink-0 select-none">
          <Megaphone className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline font-mono font-black uppercase text-[10px] tracking-wider px-1.5 py-0.2 rounded bg-black/10">
            Thông Báo
          </span>
        </div>

        {/* Nội dung thông báo với hiệu ứng động */}
        <div className="flex-1 text-center min-w-0 overflow-hidden">
          {effect === 'marquee' && isVisible ? (
            <div className="w-full overflow-hidden whitespace-nowrap">
              <div className={`animate-marquee inline-block ${currentTheme.text} cursor-default`}>
                <span className="inline-block px-8">{announcementText}</span>
                <span className="inline-block px-8 text-amber-300/80">✦</span>
                <span className="inline-block px-8">{announcementText}</span>
              </div>
            </div>
          ) : (
            <p className={`${currentTheme.text} leading-tight truncate px-2`}>
              {announcementText}
            </p>
          )}
        </div>

        {/* Nút đóng banner [X] */}
        <div className="flex items-center gap-1 shrink-0">
          {settings.allowClose && (
            <button
              type="button"
              onClick={() => {
                setIsVisible(false);
                setIsDismissed(true);
                clearAllTimers();
                onStatusChange?.('hidden', 0);
              }}
              className={`p-1 rounded-full transition-colors ${currentTheme.close}`}
              title="Đóng thông báo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
