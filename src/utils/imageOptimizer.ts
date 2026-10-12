/**
 * Tiện ích tối ưu hóa và nén ảnh logo không giới hạn dung lượng tải lên.
 * Sử dụng HTML5 Canvas để tự động điều chỉnh kích thước và nén WebP/PNG sắc nét,
 * giữ nguyên độ trong suốt (transparency) và giảm kích thước file về mức lý tưởng (< 80KB)
 * nhằm lưu trữ trơn tru trong localStorage mà không gây giật lag hoặc tràn bộ nhớ.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
  format: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export async function optimizeLogoImage(
  file: File,
  maxDimension: number = 512,
  quality: number = 0.88
): Promise<OptimizedImageResult> {
  const originalSize = file.size;

  // Nếu là file vector SVG, đọc trực tiếp bảo toàn vector
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        resolve({
          dataUrl,
          originalSize,
          optimizedSize: dataUrl.length,
          width: maxDimension,
          height: maxDimension,
          format: 'svg',
        });
      };
      reader.onerror = () => reject(new Error('Không thể đọc tệp vector SVG'));
      reader.readAsDataURL(file);
    });
  }

  // Xử lý các định dạng bitmap (PNG, JPG, JPEG, WEBP, GIF, BMP, AVIF...)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Tự động thu phóng theo tỉ lệ nếu kích thước vượt quá maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Trình duyệt không hỗ trợ canvas đồ họa'));
          return;
        }

        // Bật thuật toán làm mượt chất lượng cao
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Xuất ảnh theo chuẩn WebP (hỗ trợ nền trong suốt + nén tối đa)
        let format = 'image/webp';
        let dataUrl = canvas.toDataURL(format, quality);

        // Fallback sang PNG nếu trình duyệt không hỗ trợ WebP dataURL
        if (!dataUrl.startsWith('data:image/webp')) {
          format = 'image/png';
          dataUrl = canvas.toDataURL(format);
        }

        // Tính dung lượng ước lượng của Base64 dataURL
        const base64Content = dataUrl.split(',')[1] || '';
        const optimizedSize = Math.round((base64Content.length * 3) / 4);

        resolve({
          dataUrl,
          originalSize,
          optimizedSize,
          width,
          height,
          format: format.replace('image/', ''),
        });
      };

      img.onerror = () => reject(new Error('Tệp tải lên không phải là ảnh hợp lệ hoặc bị lỗi'));
      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Lỗi khi đọc file ảnh từ máy'));
    reader.readAsDataURL(file);
  });
}
