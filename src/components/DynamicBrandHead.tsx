'use client';

import { useEffect } from 'react';
import { getStoredConfig, syncConfigFromServer } from '@/utils/adminConfig';

export default function DynamicBrandHead() {
  useEffect(() => {
    const updateFaviconAndMeta = () => {
      try {
        const config = getStoredConfig();

        // 1. Dynamic Favicon
        const faviconHref = config.branding?.logoUrl || '/favicon.ico';
        
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = faviconHref;

        let shortcutLink: HTMLLinkElement | null = document.querySelector("link[rel='shortcut icon']");
        if (!shortcutLink) {
          shortcutLink = document.createElement('link');
          shortcutLink.rel = 'shortcut icon';
          document.head.appendChild(shortcutLink);
        }
        shortcutLink.href = faviconHref;

        let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
        if (!appleLink) {
          appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          document.head.appendChild(appleLink);
        }
        appleLink.href = faviconHref;

        // 2. Dynamic Title
        if (config.branding?.siteName) {
          const suffix = config.branding.tagline ? ` - ${config.branding.tagline}` : ' - Lịch Vạn Niên Đại Việt';
          document.title = `${config.branding.siteName}${suffix}`;
        }
      } catch (e) {
        console.error('Lỗi khi cập nhật favicon động:', e);
      }
    };

    // 1. Cập nhật ngay từ cache local
    updateFaviconAndMeta();

    // 2. Luôn đồng bộ ngay lập tức cấu hình mới nhất từ server khi mở trang
    syncConfigFromServer().then(() => updateFaviconAndMeta());

    // 3. Tự động kiểm tra cấu hình mới khi người dùng quay lại tab/app trên mobile
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncConfigFromServer();
      }
    };

    window.addEventListener('app-config-updated', updateFaviconAndMeta);
    window.addEventListener('focus', handleVisibilityChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Định kỳ kiểm tra mỗi 30 giây để cập nhật đồng bộ xuyên suốt
    const intervalId = setInterval(() => {
      syncConfigFromServer();
    }, 30000);

    return () => {
      window.removeEventListener('app-config-updated', updateFaviconAndMeta);
      window.removeEventListener('focus', handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);

  return null;
}
