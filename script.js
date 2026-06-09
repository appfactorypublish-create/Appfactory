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
    nav_projects: "H2H 서비스",
    nav_contact: "문의",
    nav_cta: "문의하기",

    hero_eyebrow: "H2H 앱 서비스",
    hero_lead1: "사람과 사람을 이어주는 H2H 앱 서비스를 만듭니다.",
    hero_lead2: "우리는 H2H 앱을 직접 기획하고, 개발하고, 운영합니다.",
    hero_primary: "AppFactory 알아보기",
    hero_secondary: "H2H 철학 보기",
    signal_languages: "지원 언어",
    signal_philosophy: "철학",
    signal_connections: "연결",

    about_eyebrow: "회사소개",
    about_h2: "우리는 H2H 앱 서비스를 직접 만듭니다.",
    about_intro:
      "AppFactory는 H2H 앱 서비스를 직접 기획하고, 개발하고, 운영합니다. 우리는 앱을 납품하는 회사가 아니라, 앱을 통해 사람과 사람을 연결하는 서비스를 만듭니다. 관계·매칭·커뮤니티·소통·글로벌 연결을 중심으로 서비스를 넓혀가며, 그 중심에는 언제나 사람이 있습니다.",
    about_c1_tag: "사람과 커뮤니티",
    about_c1_h3: "멀리 있어도, 가깝게",
    about_c1_p: "우리 앱은 흩어져 있던 사람과 커뮤니티를 더 가깝고 자연스럽게 이어줍니다.",
    about_c2_tag: "직접 만들고 운영",
    about_c2_h3: "기획부터 운영까지",
    about_c2_p: "외주가 아니라 우리 서비스입니다. 직접 기획하고 개발하고, 출시 후에도 끝까지 운영합니다.",
    about_c3_tag: "글로벌 연결",
    about_c3_h3: "국경을 넘어 더 멀리",
    about_c3_p: "한국·일본·베트남을 비롯한 글로벌 사용자를 다국어로 자연스럽게 연결합니다.",

    services_eyebrow: "우리가 만드는 것",
    services_h2: "사람을 잇는 H2H 앱 서비스.",
    services_intro: "AppFactory가 직접 만들고 운영하는 앱 서비스 영역입니다. 모두 사람과 사람의 연결을 목표로 합니다.",
    svc1_h3: "H2H Matching Apps",
    svc1_p: "사람과 사람의 목적, 관심사, 상황을 연결하는 매칭 앱 서비스를 만듭니다.",
    svc2_h3: "Community Apps",
    svc2_p: "관심사를 중심으로 사람들이 모이고 머무는 커뮤니티 앱 서비스를 만듭니다.",
    svc3_h3: "Communication Services",
    svc3_p: "사람과 사람이 더 쉽고 따뜻하게 소통하도록 돕는 커뮤니케이션 서비스를 만듭니다.",
    svc4_h3: "Global Connection Platforms",
    svc4_p: "언어와 국경을 넘어 사람을 연결하는 글로벌 연결 플랫폼을 만듭니다.",

    h2h_eyebrow: "H2H 철학",
    h2h_h2: "기술은 사람을 대체하지 않습니다.",
    h2h_p:
      "H2H는 Human to Human, 사람과 사람입니다. 우리는 기술이 사람을 대신하는 것이 아니라, 사람 사이의 거리를 좁히기 위해 존재한다고 믿습니다. 좋은 앱은 기능이 많은 앱이 아니라 누구나 쉽게 이해하고 쓰는 서비스입니다. 그래서 AppFactory는 우리가 만드는 모든 앱 서비스의 한가운데에 늘 사람을 둡니다.",

    projects_eyebrow: "H2H 서비스 영역",
    projects_h2: "우리가 만드는 H2H 서비스.",
    cat1_h3: "Matching Services",
    cat1_p: "목적과 관심사로 사람을 잇는 매칭 서비스.",
    cat2_h3: "Community Services",
    cat2_p: "같은 관심사로 모이는 커뮤니티 서비스.",
    cat3_h3: "Local Connection Services",
    cat3_p: "지역 안에서 사람과 사람을 잇는 로컬 연결 서비스.",
    cat4_h3: "Global Communication Services",
    cat4_p: "언어를 넘어 소통하게 하는 글로벌 커뮤니케이션 서비스.",
    cat5_h3: "AI-assisted Human Services",
    cat5_p: "AI가 사람의 연결을 더 빠르고 자연스럽게 돕는 서비스.",

    cta_eyebrow: "문의",
    cta_h2: "AppFactory와 이야기하기.",
    cta_lead: "AppFactory와 관련된 문의는 이메일로 연락해 주세요. 회사·파트너십·서비스·정책 문의를 환영합니다.",
    cta_button: "이메일로 문의하기",

    footer_copy: "AppFactory는 사람과 사람을 이어주는 H2H 앱 서비스를 만듭니다.",
    footer_privacy: "개인정보처리방침",
    footer_terms: "이용약관",
    footer_contact: "문의",
    footer_delete: "계정 삭제",
    footer_rights: "© 2026 AppFactory. 모든 권리 보유.",
  },

  en: {
    skip: "Skip to content",
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "H2H Services",
    nav_contact: "Contact",
    nav_cta: "Contact",

    hero_eyebrow: "H2H App Service",
    hero_lead1: "We create H2H apps that connect people.",
    hero_lead2: "We design, build, and operate our own H2H apps.",
    hero_primary: "Explore AppFactory",
    hero_secondary: "View H2H Philosophy",
    signal_languages: "Languages",
    signal_philosophy: "Philosophy",
    signal_connections: "Connections",

    about_eyebrow: "About",
    about_h2: "We build and run our own H2H app services.",
    about_intro:
      "AppFactory plans, develops, and operates its own H2H app services. We don’t deliver apps to others — we build services that connect people through our own apps. We grow around relationships, matching, community, communication, and global connection, always keeping people at the center.",
    about_c1_tag: "People & Communities",
    about_c1_h3: "Closer, whatever the distance",
    about_c1_p: "Our apps bring scattered people and communities closer, more naturally.",
    about_c2_tag: "Built & Operated",
    about_c2_h3: "From idea to operation",
    about_c2_p: "These are our own services, not client work — we plan, build, and keep operating them after launch.",
    about_c3_tag: "Global Connection",
    about_c3_h3: "Further, across borders",
    about_c3_p: "We connect users across Korea, Japan, Vietnam, and beyond — naturally, in their own languages.",

    services_eyebrow: "What We Create",
    services_h2: "H2H app services that connect people.",
    services_intro: "These are the app services AppFactory builds and runs itself — all aimed at connecting people.",
    svc1_h3: "H2H Matching Apps",
    svc1_p: "We create matching app services that connect people by purpose, interests, and context.",
    svc2_h3: "Community Apps",
    svc2_p: "We build community app services where people gather and stay around shared interests.",
    svc3_h3: "Communication Services",
    svc3_p: "We make communication services that help people connect more easily and warmly.",
    svc4_h3: "Global Connection Platforms",
    svc4_p: "We create global connection platforms that link people across languages and borders.",

    h2h_eyebrow: "H2H Philosophy",
    h2h_h2: "Technology should never replace people.",
    h2h_p:
      "H2H means Human to Human. We believe technology exists not to replace people, but to close the distance between them. A great app isn’t the one with the most features — it’s the one anyone can understand and use. That’s why AppFactory keeps people at the center of every app service we create.",

    projects_eyebrow: "Our H2H Services",
    projects_h2: "H2H Services We Build.",
    cat1_h3: "Matching Services",
    cat1_p: "Matching services that connect people by purpose and interest.",
    cat2_h3: "Community Services",
    cat2_p: "Community services where shared interests bring people together.",
    cat3_h3: "Local Connection Services",
    cat3_p: "Local connection services that link people within a place.",
    cat4_h3: "Global Communication Services",
    cat4_p: "Global communication services that let people talk across languages.",
    cat5_h3: "AI-assisted Human Services",
    cat5_p: "Services where AI helps human connection feel faster and more natural.",

    cta_eyebrow: "Get in touch",
    cta_h2: "Let’s talk with AppFactory.",
    cta_lead: "For AppFactory, partnership, service, or policy inquiries, please contact us by email.",
    cta_button: "Email us",

    footer_copy: "AppFactory creates H2H app services that connect people.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_contact: "Contact",
    footer_delete: "Delete Account",
    footer_rights: "© 2026 AppFactory. All rights reserved.",
  },

  ja: {
    skip: "本文へスキップ",
    nav_about: "会社概要",
    nav_services: "サービス",
    nav_projects: "H2Hサービス",
    nav_contact: "お問い合わせ",
    nav_cta: "お問い合わせ",

    hero_eyebrow: "H2H アプリサービス",
    hero_lead1: "人と人をつなぐH2Hアプリサービスをつくります。",
    hero_lead2: "H2Hアプリを、自分たちで企画し、開発し、運営します。",
    hero_primary: "AppFactoryを見る",
    hero_secondary: "H2H理念を見る",
    signal_languages: "対応言語",
    signal_philosophy: "哲学",
    signal_connections: "つながり",

    about_eyebrow: "会社概要",
    about_h2: "私たちはH2Hアプリサービスを自分たちでつくります。",
    about_intro:
      "AppFactoryはH2Hアプリサービスを自社で企画・開発・運営します。私たちはアプリを納品する会社ではなく、アプリを通じて人と人をつなぐサービスをつくる会社です。関係・マッチング・コミュニティ・コミュニケーション・グローバルなつながりを軸にサービスを広げ、その中心には常に人がいます。",
    about_c1_tag: "人とコミュニティ",
    about_c1_h3: "離れていても、近くに",
    about_c1_p: "私たちのアプリは、離れていた人やコミュニティをより身近に、自然につなぎます。",
    about_c2_tag: "自社で開発・運営",
    about_c2_h3: "企画から運営まで",
    about_c2_p: "受託ではなく自社サービスです。自分たちで企画・開発し、公開後も運営し続けます。",
    about_c3_tag: "グローバルなつながり",
    about_c3_h3: "国境を越えて、さらに遠くへ",
    about_c3_p: "韓国・日本・ベトナムをはじめ、世界中のユーザーを多言語で自然につなぎます。",

    services_eyebrow: "私たちがつくるもの",
    services_h2: "人をつなぐH2Hアプリサービス。",
    services_intro: "AppFactoryが自社で開発・運営するアプリサービスの領域です。すべて、人と人をつなぐことを目指しています。",
    svc1_h3: "H2H Matching Apps",
    svc1_p: "目的・関心・状況に合わせて人と人をつなぐマッチングアプリサービスをつくります。",
    svc2_h3: "Community Apps",
    svc2_p: "関心を軸に人が集い、留まるコミュニティアプリサービスをつくります。",
    svc3_h3: "Communication Services",
    svc3_p: "人と人がより手軽に、温かく交流できるコミュニケーションサービスをつくります。",
    svc4_h3: "Global Connection Platforms",
    svc4_p: "言語や国境を越えて人をつなぐグローバル連結プラットフォームをつくります。",

    h2h_eyebrow: "H2H フィロソフィー",
    h2h_h2: "テクノロジーは、人の代わりにはならない。",
    h2h_p:
      "H2HはHuman to Human、人と人です。私たちは、テクノロジーが人の代わりになるためではなく、人と人との距離を縮めるために存在すると信じています。優れたアプリとは機能が多いアプリではなく、誰もが直感的に理解し、使えるサービスのことです。だからこそAppFactoryは、自分たちがつくるすべてのアプリサービスの中心に、いつも人を置きます。",

    projects_eyebrow: "H2Hサービス領域",
    projects_h2: "私たちがつくるH2Hサービス。",
    cat1_h3: "Matching Services",
    cat1_p: "目的や関心で人をつなぐマッチングサービス。",
    cat2_h3: "Community Services",
    cat2_p: "同じ関心で集うコミュニティサービス。",
    cat3_h3: "Local Connection Services",
    cat3_p: "地域の中で人と人をつなぐローカル連結サービス。",
    cat4_h3: "Global Communication Services",
    cat4_p: "言語を越えて対話できるグローバルコミュニケーションサービス。",
    cat5_h3: "AI-assisted Human Services",
    cat5_p: "AIが人のつながりをより速く自然に支えるサービス。",

    cta_eyebrow: "お問い合わせ",
    cta_h2: "AppFactoryと話す。",
    cta_lead: "AppFactory、パートナーシップ、サービス、ポリシーに関するお問い合わせはメールでご連絡ください。",
    cta_button: "メールで問い合わせる",

    footer_copy: "AppFactoryは人と人をつなぐH2Hアプリサービスをつくります。",
    footer_privacy: "プライバシーポリシー",
    footer_terms: "利用規約",
    footer_contact: "お問い合わせ",
    footer_delete: "アカウント削除",
    footer_rights: "© 2026 AppFactory. 無断転載を禁じます。",
  },

  vi: {
    skip: "Chuyển đến nội dung",
    nav_about: "Giới thiệu",
    nav_services: "Dịch vụ",
    nav_projects: "Dịch vụ H2H",
    nav_contact: "Liên hệ",
    nav_cta: "Liên hệ",

    hero_eyebrow: "Dịch vụ ứng dụng H2H",
    hero_lead1: "Chúng tôi tạo ra các dịch vụ ứng dụng H2H kết nối con người với con người.",
    hero_lead2: "Chúng tôi tự lên ý tưởng, phát triển và vận hành các ứng dụng H2H của mình.",
    hero_primary: "Khám phá AppFactory",
    hero_secondary: "Xem triết lý H2H",
    signal_languages: "Ngôn ngữ",
    signal_philosophy: "Triết lý",
    signal_connections: "Kết nối",

    about_eyebrow: "Giới thiệu",
    about_h2: "Chúng tôi tự xây dựng và vận hành các dịch vụ ứng dụng H2H.",
    about_intro:
      "AppFactory tự lên ý tưởng, phát triển và vận hành các dịch vụ ứng dụng H2H của mình. Chúng tôi không bàn giao ứng dụng cho bên khác — chúng tôi tạo ra dịch vụ kết nối con người thông qua chính ứng dụng của mình. Chúng tôi mở rộng quanh mối quan hệ, ghép nối, cộng đồng, giao tiếp và kết nối toàn cầu, luôn đặt con người ở trung tâm.",
    about_c1_tag: "Con người & Cộng đồng",
    about_c1_h3: "Gần nhau, dù ở bất cứ đâu",
    about_c1_p: "Ứng dụng của chúng tôi đưa những con người và cộng đồng rời rạc đến gần nhau hơn, tự nhiên hơn.",
    about_c2_tag: "Tự làm & Vận hành",
    about_c2_h3: "Từ ý tưởng đến vận hành",
    about_c2_p: "Đây là dịch vụ của chính chúng tôi, không phải việc gia công — chúng tôi lên ý tưởng, phát triển và tiếp tục vận hành sau khi ra mắt.",
    about_c3_tag: "Kết nối toàn cầu",
    about_c3_h3: "Vươn xa, vượt biên giới",
    about_c3_p: "Chúng tôi kết nối người dùng tại Hàn Quốc, Nhật Bản, Việt Nam và hơn thế — tự nhiên, bằng chính ngôn ngữ của họ.",

    services_eyebrow: "Những gì chúng tôi tạo ra",
    services_h2: "Dịch vụ ứng dụng H2H kết nối con người.",
    services_intro: "Đây là các lĩnh vực dịch vụ ứng dụng mà AppFactory tự xây dựng và vận hành — tất cả đều hướng đến kết nối con người.",
    svc1_h3: "H2H Matching Apps",
    svc1_p: "Chúng tôi tạo ra các dịch vụ ứng dụng kết nối con người theo mục tiêu, sở thích và ngữ cảnh.",
    svc2_h3: "Community Apps",
    svc2_p: "Chúng tôi xây dựng các dịch vụ ứng dụng cộng đồng nơi mọi người tụ họp quanh sở thích chung.",
    svc3_h3: "Communication Services",
    svc3_p: "Chúng tôi tạo ra các dịch vụ giao tiếp giúp con người kết nối dễ dàng và ấm áp hơn.",
    svc4_h3: "Global Connection Platforms",
    svc4_p: "Chúng tôi tạo ra các nền tảng kết nối toàn cầu, liên kết con người vượt ngôn ngữ và biên giới.",

    h2h_eyebrow: "Triết lý H2H",
    h2h_h2: "Công nghệ không bao giờ thay thế con người.",
    h2h_p:
      "H2H nghĩa là Human to Human — con người với con người. Chúng tôi tin công nghệ tồn tại không phải để thay thế con người, mà để rút ngắn khoảng cách giữa họ. Một ứng dụng tốt không phải là ứng dụng nhiều tính năng nhất, mà là ứng dụng ai cũng có thể hiểu và sử dụng. Vì thế, AppFactory luôn đặt con người ở trung tâm của mọi dịch vụ ứng dụng mà chúng tôi tạo ra.",

    projects_eyebrow: "Lĩnh vực dịch vụ H2H",
    projects_h2: "Các dịch vụ H2H chúng tôi xây dựng.",
    cat1_h3: "Matching Services",
    cat1_p: "Dịch vụ ghép nối con người theo mục tiêu và sở thích.",
    cat2_h3: "Community Services",
    cat2_p: "Dịch vụ cộng đồng nơi sở thích chung gắn kết mọi người.",
    cat3_h3: "Local Connection Services",
    cat3_p: "Dịch vụ kết nối địa phương, gắn kết con người trong cùng khu vực.",
    cat4_h3: "Global Communication Services",
    cat4_p: "Dịch vụ giao tiếp toàn cầu giúp mọi người trò chuyện vượt ngôn ngữ.",
    cat5_h3: "AI-assisted Human Services",
    cat5_p: "Dịch vụ nơi AI giúp kết nối con người nhanh và tự nhiên hơn.",

    cta_eyebrow: "Liên hệ",
    cta_h2: "Trò chuyện cùng AppFactory.",
    cta_lead: "Vui lòng liên hệ qua email nếu bạn có câu hỏi về AppFactory, hợp tác, dịch vụ hoặc chính sách.",
    cta_button: "Gửi email cho chúng tôi",

    footer_copy: "AppFactory tạo ra các dịch vụ ứng dụng H2H kết nối con người với con người.",
    footer_privacy: "Chính sách bảo mật",
    footer_terms: "Điều khoản dịch vụ",
    footer_contact: "Liên hệ",
    footer_delete: "Xóa tài khoản",
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
