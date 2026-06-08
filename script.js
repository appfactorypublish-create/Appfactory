const canvas = document.querySelector("#network-canvas");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let width = 0;
let height = 0;
let dpr = 1;
let points = [];
let animationFrame = 0;

const palette = [
  "rgba(55, 229, 255, 0.9)",
  "rgba(79, 141, 255, 0.85)",
  "rgba(154, 108, 255, 0.78)",
  "rgba(255, 114, 210, 0.58)",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createNetwork();
}

function createNetwork() {
  const count = Math.max(30, Math.min(76, Math.floor(width / 18)));
  points = Array.from({ length: count }, (_, index) => {
    const sideBias = index % 3 === 0 ? randomBetween(0.48, 0.98) : Math.random();
    return {
      x: width * sideBias,
      y: randomBetween(height * 0.08, height * 0.9),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.15, 0.15),
      radius: randomBetween(1.2, 2.8),
      color: palette[index % palette.length],
      pulse: randomBetween(0, Math.PI * 2),
    };
  });
}

function drawGradientField() {
  const leftGlow = ctx.createRadialGradient(width * 0.22, height * 0.46, 0, width * 0.22, height * 0.46, width * 0.54);
  leftGlow.addColorStop(0, "rgba(55, 229, 255, 0.12)");
  leftGlow.addColorStop(1, "rgba(55, 229, 255, 0)");
  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, 0, width, height);

  const rightGlow = ctx.createRadialGradient(width * 0.78, height * 0.38, 0, width * 0.78, height * 0.38, width * 0.46);
  rightGlow.addColorStop(0, "rgba(154, 108, 255, 0.15)");
  rightGlow.addColorStop(1, "rgba(154, 108, 255, 0)");
  ctx.fillStyle = rightGlow;
  ctx.fillRect(0, 0, width, height);
}

function drawConnections() {
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const first = points[i];
      const second = points[j];
      const dx = first.x - second.x;
      const dy = first.y - second.y;
      const distance = Math.hypot(dx, dy);
      const maxDistance = width < 620 ? 96 : 138;

      if (distance < maxDistance) {
        const alpha = (1 - distance / maxDistance) * 0.28;
        ctx.strokeStyle = `rgba(117, 213, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.stroke();
      }
    }
  }
}

function drawPoints(time) {
  points.forEach((point) => {
    const pulse = reduceMotion.matches ? 0.6 : Math.sin(time / 700 + point.pulse) * 0.45 + 0.7;
    ctx.beginPath();
    ctx.fillStyle = point.color;
    ctx.shadowColor = point.color;
    ctx.shadowBlur = 18 * pulse;
    ctx.arc(point.x, point.y, point.radius * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function updatePoints() {
  if (reduceMotion.matches) {
    return;
  }

  points.forEach((point) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < width * 0.06 || point.x > width * 0.98) {
      point.vx *= -1;
    }

    if (point.y < height * 0.08 || point.y > height * 0.92) {
      point.vy *= -1;
    }
  });
}

function render(time = 0) {
  ctx.clearRect(0, 0, width, height);
  drawGradientField();
  drawConnections();
  drawPoints(time);
  updatePoints();

  animationFrame = window.requestAnimationFrame(render);
}

function restartAnimation() {
  window.cancelAnimationFrame(animationFrame);
  render();
}

resizeCanvas();
restartAnimation();

window.addEventListener("resize", resizeCanvas, { passive: true });
reduceMotion.addEventListener("change", restartAnimation);

/* ------------------------------------------------------------------ *
 * Multilingual content: Korean / English / Japanese / Vietnamese.
 * Every element carrying a data-i18n key is swapped in setLanguage().
 * ------------------------------------------------------------------ */
const translations = {
  ko: {
    skip: "본문으로 이동",
    nav_about: "회사소개",
    nav_services: "서비스",
    nav_projects: "프로젝트",
    nav_cta: "문의하기",

    hero_eyebrow: "AppFactory · H2H 테크놀로지",
    hero_lead1: "사람과 사람을 이어주는 앱을 만듭니다.",
    hero_lead2: "아이디어에서 글로벌 앱 서비스까지.",
    hero_secondary: "더 알아보기",
    signal_languages: "지원 언어",
    signal_philosophy: "철학",
    signal_connections: "연결",

    about_eyebrow: "회사소개",
    about_h2: "사람과 시장을 잇는 앱을 만듭니다.",
    about_intro:
      "AppFactory는 앱 개발을 통해 사람과 사람, 서비스와 아이디어, 그리고 글로벌 시장을 연결합니다.",
    about_c1_tag: "사람과 커뮤니티",
    about_c1_h3: "흩어진 사람을 잇다",
    about_c1_p: "흩어져 있던 사람과 커뮤니티를 더 가깝고 자연스럽게 연결합니다.",
    about_c2_tag: "서비스와 아이디어",
    about_c2_h3: "아이디어를 제품으로",
    about_c2_p: "서비스와 아이디어를 실제로 작동하는 제품과 경험으로 만듭니다.",
    about_c3_tag: "글로벌 시장",
    about_c3_h3: "국경을 넘는 확장",
    about_c3_p: "국경을 넘어 더 많은 사용자와 글로벌 시장으로 서비스를 확장합니다.",

    services_eyebrow: "서비스",
    services_h2: "기획부터 글로벌 출시까지.",
    services_intro: "아이디어를 사람에게 닿는 앱으로 만드는 전 과정을 함께합니다.",
    svc1_h3: "앱 기획",
    svc1_p: "시장과 사용자를 분석해 실행 가능한 앱 전략과 로드맵을 설계합니다.",
    svc2_h3: "UI/UX 디자인",
    svc2_p: "프리미엄 감성과 사용성을 동시에 담은 화면 경험을 디자인합니다.",
    svc3_h3: "앱 개발",
    svc3_p: "웹앱과 모바일앱을 안정적이고 확장 가능한 구조로 구현합니다.",
    svc4_h3: "글로벌 출시 지원",
    svc4_p: "다국어와 현지화를 포함한 글로벌 시장 출시와 운영을 지원합니다.",

    h2h_eyebrow: "H2H 철학",
    h2h_h2: "기술은 사람을 대체하지 않습니다.",
    h2h_p:
      "H2H는 Human to Human입니다. 우리는 기술이 사람을 대체하는 것이 아니라, 사람과 사람 사이의 거리를 좁히기 위해 존재한다고 믿습니다.",

    projects_eyebrow: "프로젝트 분야",
    projects_h2: "연결을 만드는 디지털 서비스.",
    cat1_h3: "매칭 앱",
    cat1_p: "사람과 사람, 수요와 공급을 연결하는 스마트 매칭 서비스.",
    cat2_h3: "커뮤니티 플랫폼",
    cat2_p: "관심사를 중심으로 모이는 커뮤니티와 멤버십 플랫폼.",
    cat3_h3: "비즈니스 앱",
    cat3_p: "업무와 운영을 더 똑똑하게 만드는 비즈니스 도구.",
    cat4_h3: "AI 기반 서비스",
    cat4_p: "AI로 더 빠르고 개인화된 경험을 제공하는 서비스.",
    cat5_h3: "글로벌 모바일 서비스",
    cat5_p: "여러 국가와 언어를 아우르는 글로벌 모바일 서비스.",

    cta_eyebrow: "AppFactory와 함께",
    cta_h2: "당신의 아이디어를 글로벌 앱 서비스로.",
    cta_lead: "지금 프로젝트를 들려주세요. 빠르게 회신드리겠습니다.",
    cta_primary: "프로젝트 문의하기",

    footer_copy: "사람과 사람을 이어주는 앱을 만듭니다.",
    footer_rights: "© 2026 AppFactory. 모든 권리 보유.",
  },

  en: {
    skip: "Skip to content",
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_cta: "Contact",

    hero_eyebrow: "AppFactory · H2H Technology",
    hero_lead1: "We build apps that connect humans.",
    hero_lead2: "From idea to global app service.",
    hero_secondary: "Learn more",
    signal_languages: "Languages",
    signal_philosophy: "Philosophy",
    signal_connections: "Connections",

    about_eyebrow: "About",
    about_h2: "We connect people, services, ideas, and markets.",
    about_intro:
      "AppFactory connects people, services, ideas, and global markets through thoughtful app development.",
    about_c1_tag: "People & Communities",
    about_c1_h3: "Closer connections",
    about_c1_p: "We bring people and communities closer with experiences that feel personal.",
    about_c2_tag: "Services & Ideas",
    about_c2_h3: "Ideas into products",
    about_c2_p: "We turn services and ideas into products people actually use.",
    about_c3_tag: "Global Markets",
    about_c3_h3: "Reach across borders",
    about_c3_p: "We help products reach users across borders and global markets.",

    services_eyebrow: "Services",
    services_h2: "From planning to global launch.",
    services_intro: "An end-to-end partner from first concept to a worldwide launch.",
    svc1_h3: "App Planning",
    svc1_p: "We define the product strategy, user flows, and a clear roadmap.",
    svc2_h3: "UI/UX Design",
    svc2_p: "We craft premium interfaces that feel intuitive and human.",
    svc3_h3: "App Development",
    svc3_p: "We build reliable web and mobile apps that scale with you.",
    svc4_h3: "Global Launch Support",
    svc4_p: "We support localization and launch across global markets.",

    h2h_eyebrow: "H2H Philosophy",
    h2h_h2: "Technology should not replace people.",
    h2h_p:
      "H2H means Human to Human. We believe technology exists not to replace people, but to reduce the distance between them.",

    projects_eyebrow: "Project Categories",
    projects_h2: "Digital products that create connection.",
    cat1_h3: "Matching Apps",
    cat1_p: "Connecting people, demand, and supply through smart matching.",
    cat2_h3: "Community Platforms",
    cat2_p: "Spaces where communities, members, and creators gather.",
    cat3_h3: "Business Apps",
    cat3_p: "Tools that make teams and operations smarter.",
    cat4_h3: "AI-powered Services",
    cat4_p: "Faster, more personal experiences powered by AI.",
    cat5_h3: "Global Mobile Services",
    cat5_p: "Mobile services built for many countries and languages.",

    cta_eyebrow: "Start with AppFactory",
    cta_h2: "Turn your idea into a global app service.",
    cta_lead: "Tell us about your project — we’ll get back to you quickly.",
    cta_primary: "Start a Project",

    footer_copy: "We build apps that connect humans.",
    footer_rights: "© 2026 AppFactory. All rights reserved.",
  },

  ja: {
    skip: "本文へスキップ",
    nav_about: "会社概要",
    nav_services: "サービス",
    nav_projects: "プロジェクト",
    nav_cta: "お問い合わせ",

    hero_eyebrow: "AppFactory · H2H テクノロジー",
    hero_lead1: "人と人をつなぐアプリをつくります。",
    hero_lead2: "アイデアからグローバルアプリサービスへ。",
    hero_secondary: "詳しく見る",
    signal_languages: "対応言語",
    signal_philosophy: "哲学",
    signal_connections: "つながり",

    about_eyebrow: "会社概要",
    about_h2: "人と市場をつなぐアプリをつくります。",
    about_intro:
      "AppFactoryはアプリ開発を通じて、人と人、サービスとアイデア、そしてグローバル市場をつなぎます。",
    about_c1_tag: "人とコミュニティ",
    about_c1_h3: "人と人をつなぐ",
    about_c1_p: "離れていた人とコミュニティを、より身近に自然につなぎます。",
    about_c2_tag: "サービスとアイデア",
    about_c2_h3: "アイデアを形に",
    about_c2_p: "サービスとアイデアを、実際に使えるプロダクトと体験へ。",
    about_c3_tag: "グローバル市場",
    about_c3_h3: "国境を越えて",
    about_c3_p: "国境を越えて、サービスをより多くのユーザーとグローバル市場へ広げます。",

    services_eyebrow: "サービス",
    services_h2: "企画からグローバル展開まで。",
    services_intro: "アイデアを人に届くアプリへ。最初から最後まで伴走します。",
    svc1_h3: "アプリ企画",
    svc1_p: "市場とユーザーを分析し、実行可能なアプリ戦略とロードマップを設計します。",
    svc2_h3: "UI/UXデザイン",
    svc2_p: "プレミアムな質感と使いやすさを両立した画面体験を設計します。",
    svc3_h3: "アプリ開発",
    svc3_p: "Web・モバイルアプリを安定し拡張しやすい構造で開発します。",
    svc4_h3: "グローバル展開支援",
    svc4_p: "多言語・ローカライズを含むグローバル市場への展開を支援します。",

    h2h_eyebrow: "H2H フィロソフィー",
    h2h_h2: "テクノロジーは人を置き換えない。",
    h2h_p:
      "H2HはHuman to Human。テクノロジーは人を置き換えるためではなく、人と人との距離を縮めるためにあると信じています。",

    projects_eyebrow: "プロジェクト分野",
    projects_h2: "つながりを生むデジタルサービス。",
    cat1_h3: "マッチングアプリ",
    cat1_p: "人と人、需要と供給をつなぐスマートなマッチングサービス。",
    cat2_h3: "コミュニティプラットフォーム",
    cat2_p: "関心でつながるコミュニティ・会員制プラットフォーム。",
    cat3_h3: "ビジネスアプリ",
    cat3_p: "業務と運営をよりスマートにするビジネスツール。",
    cat4_h3: "AI活用サービス",
    cat4_p: "AIで、より速く個別最適化された体験を届けます。",
    cat5_h3: "グローバルモバイルサービス",
    cat5_p: "多言語・多国対応のグローバルモバイルサービス。",

    cta_eyebrow: "AppFactoryと一緒に",
    cta_h2: "あなたのアイデアを、グローバルなアプリサービスへ。",
    cta_lead: "プロジェクトについてお聞かせください。すぐにご連絡します。",
    cta_primary: "プロジェクトを相談する",

    footer_copy: "人と人をつなぐアプリをつくります。",
    footer_rights: "© 2026 AppFactory. 無断転載を禁じます。",
  },

  vi: {
    skip: "Chuyển đến nội dung",
    nav_about: "Giới thiệu",
    nav_services: "Dịch vụ",
    nav_projects: "Dự án",
    nav_cta: "Liên hệ",

    hero_eyebrow: "AppFactory · Công nghệ H2H",
    hero_lead1: "Chúng tôi tạo ra những ứng dụng kết nối con người với con người.",
    hero_lead2: "Từ ý tưởng đến dịch vụ ứng dụng toàn cầu.",
    hero_secondary: "Tìm hiểu thêm",
    signal_languages: "Ngôn ngữ",
    signal_philosophy: "Triết lý",
    signal_connections: "Kết nối",

    about_eyebrow: "Giới thiệu",
    about_h2: "Chúng tôi tạo ra ứng dụng kết nối con người và thị trường.",
    about_intro:
      "AppFactory kết nối con người, dịch vụ, ý tưởng và thị trường toàn cầu thông qua việc phát triển ứng dụng tận tâm.",
    about_c1_tag: "Con người & Cộng đồng",
    about_c1_h3: "Kết nối gần hơn",
    about_c1_p: "Chúng tôi đưa con người và cộng đồng đến gần nhau hơn bằng những trải nghiệm thân thuộc.",
    about_c2_tag: "Dịch vụ & Ý tưởng",
    about_c2_h3: "Biến ý tưởng thành sản phẩm",
    about_c2_p: "Chúng tôi biến dịch vụ và ý tưởng thành sản phẩm và trải nghiệm mà mọi người thực sự sử dụng.",
    about_c3_tag: "Thị trường toàn cầu",
    about_c3_h3: "Vươn ra toàn cầu",
    about_c3_p: "Chúng tôi giúp sản phẩm tiếp cận người dùng vượt qua biên giới và thị trường toàn cầu.",

    services_eyebrow: "Dịch vụ",
    services_h2: "Từ lên kế hoạch đến ra mắt toàn cầu.",
    services_intro: "Đồng hành trọn vẹn hành trình biến ý tưởng thành ứng dụng chạm đến mọi người.",
    svc1_h3: "Lập kế hoạch ứng dụng",
    svc1_p: "Chúng tôi phân tích thị trường và người dùng để xây dựng chiến lược và lộ trình ứng dụng khả thi.",
    svc2_h3: "Thiết kế UI/UX",
    svc2_p: "Chúng tôi thiết kế giao diện cao cấp, trực quan và gần gũi với con người.",
    svc3_h3: "Phát triển ứng dụng",
    svc3_p: "Chúng tôi xây dựng ứng dụng web và di động ổn định, có khả năng mở rộng cùng bạn.",
    svc4_h3: "Hỗ trợ ra mắt toàn cầu",
    svc4_p: "Chúng tôi hỗ trợ bản địa hóa và ra mắt trên các thị trường toàn cầu.",

    h2h_eyebrow: "Triết lý H2H",
    h2h_h2: "Công nghệ không thay thế con người.",
    h2h_p:
      "H2H nghĩa là Human to Human. Chúng tôi tin rằng công nghệ tồn tại không phải để thay thế con người, mà để rút ngắn khoảng cách giữa con người với nhau.",

    projects_eyebrow: "Lĩnh vực dự án",
    projects_h2: "Sản phẩm số tạo nên sự kết nối.",
    cat1_h3: "Ứng dụng kết nối",
    cat1_p: "Dịch vụ kết nối thông minh giữa con người, cung và cầu.",
    cat2_h3: "Nền tảng cộng đồng",
    cat2_p: "Không gian nơi cộng đồng, thành viên và nhà sáng tạo gặp gỡ.",
    cat3_h3: "Ứng dụng doanh nghiệp",
    cat3_p: "Công cụ giúp đội ngũ và vận hành trở nên thông minh hơn.",
    cat4_h3: "Dịch vụ ứng dụng AI",
    cat4_p: "Trải nghiệm nhanh hơn và cá nhân hóa hơn nhờ AI.",
    cat5_h3: "Dịch vụ di động toàn cầu",
    cat5_p: "Dịch vụ di động dành cho nhiều quốc gia và ngôn ngữ.",

    cta_eyebrow: "Cùng AppFactory",
    cta_h2: "Biến ý tưởng của bạn thành dịch vụ ứng dụng toàn cầu.",
    cta_lead: "Hãy chia sẻ dự án của bạn — chúng tôi sẽ phản hồi nhanh chóng.",
    cta_primary: "Bắt đầu dự án",

    footer_copy: "Chúng tôi tạo ra những ứng dụng kết nối con người với con người.",
    footer_rights: "© 2026 AppFactory. Bảo lưu mọi quyền.",
  },
};

(function initLanguage() {
  const STORAGE_KEY = "appfactory-lang";
  const supported = Object.keys(translations); // ["ko", "en", "ja", "vi"]
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));
  const nodes = Array.from(document.querySelectorAll("[data-i18n]"));

  function readStored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function writeStored(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Storage may be unavailable (private mode); language still applies for the session.
    }
  }

  function setLanguage(lang) {
    if (!supported.includes(lang)) {
      return;
    }

    const dict = translations[lang];

    // Swap every translatable node without reloading the page.
    nodes.forEach((node) => {
      const value = dict[node.dataset.i18n];
      if (typeof value === "string") {
        node.textContent = value;
      }
    });

    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });

    writeStored(lang);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  // Restore the last choice, otherwise fall back to the browser language, then Korean.
  const stored = readStored();
  const browser = (navigator.language || "").slice(0, 2).toLowerCase();
  const initial = supported.includes(stored)
    ? stored
    : supported.includes(browser)
      ? browser
      : "ko";

  setLanguage(initial);

  // Expose for quick manual testing / programmatic use.
  window.setLanguage = setLanguage;
})();
