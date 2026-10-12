import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_APP_CONFIG, AppConfig } from '@/utils/adminConfig';

function getConfigFilePath(): string {
  if (process.env.CONFIG_FILE_PATH) {
    return process.env.CONFIG_FILE_PATH;
  }
  if (process.env.DATA_DIR) {
    return path.join(process.env.DATA_DIR, 'app-config.json');
  }
  return path.join(process.cwd(), 'data', 'app-config.json');
}

function findExistingConfigPath(): string {
  const customPath = process.env.CONFIG_FILE_PATH || (process.env.DATA_DIR ? path.join(process.env.DATA_DIR, 'app-config.json') : null);
  if (customPath && fs.existsSync(customPath)) {
    return customPath;
  }
  const defaultPath = path.join(process.cwd(), 'data', 'app-config.json');
  if (fs.existsSync(defaultPath)) {
    return defaultPath;
  }
  return customPath || defaultPath;
}

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Surrogate-Control': 'no-store',
};

// Đọc cấu hình từ file JSON trên máy chủ
function readServerConfig(): AppConfig {
  const targetPath = findExistingConfigPath();
  try {
    if (fs.existsSync(targetPath)) {
      const fileContent = fs.readFileSync(targetPath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      return {
        ...DEFAULT_APP_CONFIG,
        ...parsed,
        branding: { ...DEFAULT_APP_CONFIG.branding, ...(parsed.branding || {}) },
        aboutIntro: { ...DEFAULT_APP_CONFIG.aboutIntro, ...(parsed.aboutIntro || {}) },
        features: { ...DEFAULT_APP_CONFIG.features, ...(parsed.features || {}) },
        donation: { ...DEFAULT_APP_CONFIG.donation, ...(parsed.donation || {}) },
        contact: { ...DEFAULT_APP_CONFIG.contact, ...(parsed.contact || {}) },
        system: {
          ...DEFAULT_APP_CONFIG.system,
          ...(parsed.system || {}),
          announcementSettings: {
            ...DEFAULT_APP_CONFIG.system.announcementSettings!,
            ...(parsed.system?.announcementSettings || {}),
          },
        },
        footer: {
          ...DEFAULT_APP_CONFIG.footer,
          ...(parsed.footer || {}),
          versionDescription: parsed.footer?.versionDescription !== undefined ? parsed.footer.versionDescription : DEFAULT_APP_CONFIG.footer.versionDescription,
        },
        users: Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : DEFAULT_APP_CONFIG.users,
        isCustomized: parsed.isCustomized ?? Boolean(parsed.branding?.logoUrl || (parsed.donation?.accountNumber && parsed.donation?.accountNumber !== DEFAULT_APP_CONFIG.donation.accountNumber)),
        lastModified: parsed.lastModified || 0,
      };
    }
  } catch (error) {
    console.error('Lỗi khi đọc file app-config.json trên server:', error);
  }
  return DEFAULT_APP_CONFIG;
}

// Ghi cấu hình vào file JSON trên máy chủ
function writeServerConfig(config: AppConfig): boolean {
  try {
    const targetPath = getConfigFilePath();
    const dataDir = path.dirname(targetPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(targetPath, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Lỗi khi ghi file app-config.json trên server:', error);
    return false;
  }
}

// GET: Lấy cấu hình mới nhất từ server (loại bỏ hoàn toàn cache)
export async function GET(request: NextRequest) {
  const config = readServerConfig();
  return NextResponse.json(
    { success: true, config, timestamp: Date.now() },
    { headers: NO_CACHE_HEADERS }
  );
}

// POST: Lưu cấu hình từ admin lên server
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Dữ liệu không hợp lệ' },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    const current = readServerConfig();
    const updatedConfig: AppConfig = {
      ...current,
      ...body,
      isCustomized: true,
      lastModified: body.lastModified || Date.now(),
      branding: {
        ...current.branding,
        ...(body.branding || {}),
      },
      donation: {
        ...current.donation,
        ...(body.donation || {}),
      },
      footer: {
        ...current.footer,
        ...(body.footer || {}),
        versionDescription: body.footer?.versionDescription !== undefined ? body.footer.versionDescription : current.footer?.versionDescription,
      },
      system: {
        ...current.system,
        ...(body.system || {}),
        announcementSettings: {
          ...current.system.announcementSettings!,
          ...(body.system?.announcementSettings || {}),
        },
      },
    };

    const saved = writeServerConfig(updatedConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: 'Không thể ghi cấu hình vào file trên server' },
        { status: 500, headers: NO_CACHE_HEADERS }
      );
    }

    return NextResponse.json(
      { success: true, config: updatedConfig, timestamp: Date.now() },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi xử lý server' },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
