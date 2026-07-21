export const languages = {
  vi: "Tiếng Việt",
  en: "English",
};

export const defaultLang = "vi";

export const ui = {
  vi: {
    "nav.blog": "Blog",
    "nav.projects": "Dự án",
    "nav.about": "Giới thiệu",
    "nav.search": "Tìm kiếm",
    "home.intro.cta": "Đọc bài viết",
    "home.recent": "Bài viết gần đây",
    "home.projects": "Dự án nổi bật",
    "blog.readMore": "Đọc tiếp",
    "blog.minRead": "phút đọc",
    "blog.publishedOn": "Đăng ngày",
    "blog.tableOfContents": "Mục lục",
    "blog.comments": "Bình luận",
    "blog.backToBlog": "Quay lại danh sách bài viết",
    "projects.viewLive": "Xem trực tiếp",
    "projects.viewRepo": "Mã nguồn",
    "footer.rights": "Đã giữ mọi quyền.",
    "newsletter.title": "Đăng ký nhận bài viết mới",
    "newsletter.description": "Thỉnh thoảng mình gửi email khi có bài viết mới, không spam.",
    "newsletter.placeholder": "Email của bạn",
    "newsletter.submit": "Đăng ký",
    "search.placeholder": "Tìm bài viết... (⌘K)",
    "consent.message": "Mình dùng cookie để đo lường truy cập và cải thiện nội dung.",
    "consent.accept": "Đồng ý",
    "consent.decline": "Từ chối",
  },
  en: {
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.search": "Search",
    "home.intro.cta": "Read the blog",
    "home.recent": "Recent posts",
    "home.projects": "Featured projects",
    "blog.readMore": "Read more",
    "blog.minRead": "min read",
    "blog.publishedOn": "Published on",
    "blog.tableOfContents": "Table of contents",
    "blog.comments": "Comments",
    "blog.backToBlog": "Back to all posts",
    "projects.viewLive": "View live",
    "projects.viewRepo": "Source",
    "footer.rights": "All rights reserved.",
    "newsletter.title": "Subscribe for new posts",
    "newsletter.description": "Occasional emails when there's something new to read. No spam.",
    "newsletter.placeholder": "Your email",
    "newsletter.submit": "Subscribe",
    "search.placeholder": "Search posts... (⌘K)",
    "consent.message": "We use cookies to measure traffic and improve content.",
    "consent.accept": "Accept",
    "consent.decline": "Decline",
  },
} as const;

export type Lang = keyof typeof ui;
export type UiKey = keyof (typeof ui)["vi"];
