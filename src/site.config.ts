export const siteConfig = {
  name: 'Huỳnh Dự',
  wordmark: 'HD',
  avatar: '/avatar.jpg',
  url: 'https://huynhdu.info',
  description: {
    vi: 'Marketing & Event Operations Manager tại TP.HCM — 15+ năm kinh nghiệm sản xuất sự kiện quy mô lớn và chiến dịch thương hiệu. Blog ghi lại các case-study từ công việc.',
    en: 'Marketing & Event Operations Manager based in Ho Chi Minh City — 15+ years producing large-scale events and brand campaigns. Blog documenting case studies from the field.',
  },
  bio: {
    vi: 'Xin chào, mình là Huỳnh Dự — làm Marketing và sản xuất sự kiện tại TP.HCM hơn 15 năm. Đây là nơi mình ghi lại các case-study từ công việc.',
    en: "Hi, I'm Huỳnh Dự (Huynh Du) — I've been doing marketing and event production in Ho Chi Minh City for 15+ years. This is where I write up case studies from the field.",
  },
  social: {
    github: 'https://github.com/Huynhdumkt1909',
    facebook: 'https://www.facebook.com/share/18tmSx1diK/',
    linkedin: 'https://www.linkedin.com/in/huynhdumkt',
    twitter: '',
    email: 'huynhdu@huynhdu.info',
  },
  gtmId: 'GTM-KW8DD4JP',
  buttondownUsername: 'huynhdumkt',
  remark42: {
    host: '', // URL nơi tự host Remark42, vd: 'https://remark42.huynhdu.info'
    siteId: '', // site_id khai báo khi chạy container Remark42, vd: 'huynhdu-info'
  },
  // Cloudflare Web Analytics: lấy token trong dashboard Cloudflare > Analytics > Web Analytics
  // sau khi thêm site. Không cần consent gate vì không dùng cookie/localStorage (theo Cloudflare).
  cloudflareAnalyticsToken: '',
  // Cloudflare Turnstile site key (public, khác secret key) — dùng cho form newsletter chống spam bot.
  cloudflareTurnstileSiteKey: '0x4AAAAAAD62dq8PDe6qQDsQ',
} as const;

export type SiteConfig = typeof siteConfig;
