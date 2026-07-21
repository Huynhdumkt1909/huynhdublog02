export const siteConfig = {
  name: 'Huynh Du',
  wordmark: 'HD',
  avatar: '/avatar.svg', // thay bằng ảnh thật của bạn, vd '/avatar.jpg', đặt file trong thư mục public/
  url: 'https://huynhdu.info',
  description: {
    vi: 'Blog cá nhân & portfolio của Huynh Du — viết về công nghệ, sản phẩm và những gì học được dọc đường.',
    en: 'Personal blog & portfolio of Huynh Du — writing about tech, products, and lessons along the way.',
  },
  bio: {
    vi: 'Xin chào, mình là Huynh Du. Đây là nơi mình chia sẻ bài viết và các dự án đang làm.',
    en: "Hi, I'm Huynh Du. This is where I share writing and projects I'm working on.",
  },
  social: {
    github: 'https://github.com/Huynhdumkt1909',
    twitter: '',
    linkedin: '',
    email: 'huynhdumkt@gmail.com',
  },
  gtmId: '', // GTM-XXXXXXX — set once GTM container is created
  buttondownUsername: '', // username Buttondown, vd 'huynhdu' — set khi tạo tài khoản
  remark42: {
    host: '', // URL nơi tự host Remark42, vd: 'https://remark42.huynhdu.info'
    siteId: '', // site_id khai báo khi chạy container Remark42, vd: 'huynhdu-info'
  },
  // Cloudflare Web Analytics: lấy token trong dashboard Cloudflare > Analytics > Web Analytics
  // sau khi thêm site. Không cần consent gate vì không dùng cookie/localStorage (theo Cloudflare).
  cloudflareAnalyticsToken: '',
  // Cloudflare Turnstile site key (public, khác secret key) — dùng cho form newsletter chống spam bot.
  // Lấy trong dashboard Cloudflare > Turnstile > Add site.
  cloudflareTurnstileSiteKey: '',
} as const;

export type SiteConfig = typeof siteConfig;
