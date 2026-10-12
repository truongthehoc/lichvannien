import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-[#fdfbf7]">
      <h2 className="text-3xl font-serif font-bold text-[#8b1818] mb-2">404 - Không tìm thấy trang</h2>
      <p className="text-stone-600 mb-6 text-sm">Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đổi.</p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#8b1818] text-amber-200 font-bold rounded-xl shadow-md hover:bg-[#701212] transition-all text-sm"
      >
        Trở về Trang Chủ
      </Link>
    </div>
  );
}
