'use client';

import { useEffect } from 'react';
import { getStoredConfig } from '@/utils/adminConfig';

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

    updateFaviconAndMeta();
    window.addEventListener('app-config-updated', updateFaviconAndMeta);
    return () => window.removeEventListener('app-config-updated', updateFaviconAndMeta);
  }, []);

  return null;
}
