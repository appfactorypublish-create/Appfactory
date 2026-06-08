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
    nav_contact: "문의",
    nav_cta: "문의하기",

    hero_eyebrow: "디지털 프로덕트 파트너 · H2H",
    hero_lead1: "사람과 사람을 이어주는 앱을 만듭니다.",
    hero_lead2: "아이디어에서 글로벌 앱 서비스까지, 한 팀처럼.",
    hero_secondary: "더 알아보기",
    signal_languages: "지원 언어",
    signal_philosophy: "철학",
    signal_connections: "연결",

    about_eyebrow: "회사소개",
    about_h2: "개발사를 넘어, 당신의 프로덕트 파트너로.",
    about_intro:
      "AppFactory는 아이디어를 실제로 작동하는 앱 서비스로 설계하고, 한국·일본·베트남을 비롯한 글로벌 시장에서 통하는 제품으로 함께 키웁니다. 기술보다 먼저 사람을 보고, 사용자 경험을 중심에 둡니다.",
    about_c1_tag: "사람과 커뮤니티",
    about_c1_h3: "멀리 있어도, 가깝게",
    about_c1_p: "흩어져 있던 사람과 커뮤니티가 자연스럽게 모이고 이어지는 경험을 설계합니다.",
    about_c2_tag: "서비스와 아이디어",
    about_c2_h3: "아이디어를 살아있는 제품으로",
    about_c2_p: "머릿속 구상을 사람들이 매일 찾는 실제 서비스와 경험으로 완성합니다.",
    about_c3_tag: "글로벌 시장",
    about_c3_h3: "국경을 넘어 더 멀리",
    about_c3_p: "다국어와 현지화를 기본으로, 서비스를 세계 시장까지 자연스럽게 확장합니다.",

    services_eyebrow: "서비스",
    services_h2: "기획부터 글로벌 출시까지, 하나의 팀으로.",
    services_intro: "각 단계를 따로 맡기지 않아도 됩니다. 전략·디자인·개발·출시를 한 흐름으로 책임집니다.",
    svc1_h3: "앱 기획",
    svc1_p: "감이 아니라 데이터로 시작합니다. 시장과 사용자를 분석해 성공 가능한 방향과 로드맵을 먼저 그립니다.",
    svc2_h3: "UI/UX 디자인",
    svc2_p: "처음 본 사람도 헤매지 않는 화면을 만듭니다. 프리미엄한 인상과 쉬운 사용성을 함께 담습니다.",
    svc3_h3: "앱 개발",
    svc3_p: "당장 작동하는 것을 넘어, 사용자가 늘어도 흔들리지 않는 안정적이고 확장 가능한 구조로 개발합니다.",
    svc4_h3: "글로벌 출시 지원",
    svc4_p: "출시가 끝이 아닙니다. 다국어·현지화부터 스토어 등록과 운영까지 해외 시장 안착을 돕습니다.",

    h2h_eyebrow: "H2H 철학",
    h2h_h2: "기술은 사람을 대체하지 않습니다.",
    h2h_p:
      "H2H는 Human to Human, 사람과 사람입니다. 우리는 기술이 사람을 대신하는 것이 아니라, 사람 사이의 거리를 좁히기 위해 존재한다고 믿습니다. 좋은 앱은 기능이 많은 앱이 아니라 누구나 쉽게 이해하고 쓰는 서비스입니다. 그래서 AppFactory는 모든 프로젝트의 한가운데에 늘 사람을 둡니다.",

    projects_eyebrow: "프로젝트 분야",
    projects_h2: "우리가 가장 잘 만드는 연결.",
    cat1_h3: "매칭 앱",
    cat1_p: "사람과 사람, 수요와 공급을 정확하게 이어주는 매칭·추천 서비스.",
    cat2_h3: "커뮤니티 플랫폼",
    cat2_p: "같은 관심사를 가진 사람들이 머무르고 다시 찾는 커뮤니티·멤버십 플랫폼.",
    cat3_h3: "비즈니스 앱",
    cat3_p: "복잡한 업무와 운영을 단순하게 정리해 주는 실전형 비즈니스 도구.",
    cat4_h3: "AI 기반 서비스",
    cat4_p: "AI로 더 빠르게, 사용자 한 명 한 명에게 맞춘 개인화 경험을 제공합니다.",
    cat5_h3: "글로벌 모바일 서비스",
    cat5_p: "여러 국가와 언어, 문화를 처음부터 고려해 설계한 글로벌 모바일 서비스.",

    cta_eyebrow: "함께 만들 준비가 되어 있습니다",
    cta_h2: "당신의 아이디어를 글로벌 앱 서비스로.",
    cta_lead: "아직 아이디어 단계라도 괜찮습니다. 편하게 들려주시면 다음 단계를 함께 정리해 드리겠습니다.",
    cta_primary: "프로젝트 문의하기",

    footer_copy: "사람과 사람을 이어주는 앱을 만듭니다.",
    footer_rights: "© 2026 AppFactory. 모든 권리 보유.",
  },

  en: {
    skip: "Skip to content",
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_cta: "Contact",

    hero_eyebrow: "Digital Product Partner · H2H",
    hero_lead1: "We build apps that connect humans.",
    hero_lead2: "From a first idea to a global app service — as one team.",
    hero_secondary: "Learn more",
    signal_languages: "Languages",
    signal_philosophy: "Philosophy",
    signal_connections: "Connections",

    about_eyebrow: "About",
    about_h2: "Beyond a dev shop — your product partner.",
    about_intro:
      "AppFactory turns ideas into apps that truly work — designed around real users and built to succeed across Korea, Japan, Vietnam, and markets worldwide. We look at people before technology, and keep experience at the center.",
    about_c1_tag: "People & Communities",
    about_c1_h3: "Closer, whatever the distance",
    about_c1_p: "We design experiences where scattered people and communities naturally come together.",
    about_c2_tag: "Services & Ideas",
    about_c2_h3: "Ideas into living products",
    about_c2_p: "We turn a rough concept into a real service people reach for every day.",
    about_c3_tag: "Global Markets",
    about_c3_h3: "Further, across borders",
    about_c3_p: "With localization built in, we extend your service into markets around the world.",

    services_eyebrow: "Services",
    services_h2: "From strategy to global launch, as one team.",
    services_intro: "No need to juggle vendors. We own strategy, design, development, and launch as a single flow.",
    svc1_h3: "App Planning",
    svc1_p: "We start with evidence, not guesswork — analyzing market and users to map a route that can actually win.",
    svc2_h3: "UI/UX Design",
    svc2_p: "Interfaces anyone understands at first glance — a premium feel and effortless use, together.",
    svc3_h3: "App Development",
    svc3_p: "We build beyond “it works today” — stable, scalable architecture that holds as your users grow.",
    svc4_h3: "Global Launch Support",
    svc4_p: "Launch isn’t the finish line. From localization to store release and operations, we help you land in new markets.",

    h2h_eyebrow: "H2H Philosophy",
    h2h_h2: "Technology should never replace people.",
    h2h_p:
      "H2H means Human to Human. We believe technology exists not to replace people, but to close the distance between them. A great app isn’t the one with the most features — it’s the one anyone can understand and use. That’s why, at AppFactory, a person always sits at the center of every project.",

    projects_eyebrow: "Project Categories",
    projects_h2: "The kinds of connection we build best.",
    cat1_h3: "Matching Apps",
    cat1_p: "Matching and recommendation services that pair the right people, demand, and supply.",
    cat2_h3: "Community Platforms",
    cat2_p: "Community and membership platforms where people with shared interests stay and return.",
    cat3_h3: "Business Apps",
    cat3_p: "Practical business tools that turn complex operations into something simple.",
    cat4_h3: "AI-powered Services",
    cat4_p: "AI-driven services that respond faster and feel personal to every single user.",
    cat5_h3: "Global Mobile Services",
    cat5_p: "Global mobile services designed for many countries, languages, and cultures from day one.",

    cta_eyebrow: "Let’s build it together",
    cta_h2: "Turn your idea into a global app service.",
    cta_lead: "Even a rough idea is enough. Tell us where you are, and we’ll help shape the next step — no pressure.",
    cta_primary: "Start a Project",

    footer_copy: "We build apps that connect humans.",
    footer_rights: "© 2026 AppFactory. All rights reserved.",
  },

  ja: {
    skip: "本文へスキップ",
    nav_about: "会社概要",
    nav_services: "サービス",
    nav_projects: "プロジェクト",
    nav_contact: "お問い合わせ",
    nav_cta: "お問い合わせ",

    hero_eyebrow: "デジタルプロダクトパートナー · H2H",
    hero_lead1: "人と人をつなぐアプリをつくります。",
    hero_lead2: "アイデアから、世界に届くアプリサービスまで。ひとつのチームで。",
    hero_secondary: "詳しく見る",
    signal_languages: "対応言語",
    signal_philosophy: "哲学",
    signal_connections: "つながり",

    about_eyebrow: "会社概要",
    about_h2: "開発会社を超えて、あなたのプロダクトパートナーへ。",
    about_intro:
      "AppFactoryはアイデアを「実際に動くアプリサービス」へと設計し、韓国・日本・ベトナムをはじめとするグローバル市場で通用するプロダクトをともに育てます。技術より先に人を見つめ、ユーザー体験を中心に据えます。",
    about_c1_tag: "人とコミュニティ",
    about_c1_h3: "離れていても、近くに",
    about_c1_p: "離ればなれだった人やコミュニティが、自然に集い、つながる体験を設計します。",
    about_c2_tag: "サービスとアイデア",
    about_c2_h3: "アイデアを、生きたプロダクトに",
    about_c2_p: "頭の中の構想を、人々が毎日使う実際のサービスと体験へと仕上げます。",
    about_c3_tag: "グローバル市場",
    about_c3_h3: "国境を越えて、さらに遠くへ",
    about_c3_p: "多言語・ローカライズを前提に、サービスを世界の市場へ自然に広げます。",

    services_eyebrow: "サービス",
    services_h2: "企画からグローバル展開まで、ひとつのチームで。",
    services_intro: "工程ごとに発注先を分ける必要はありません。戦略・デザイン・開発・公開までを一気通貫で担います。",
    svc1_h3: "アプリ企画",
    svc1_p: "勘ではなくデータから始めます。市場とユーザーを分析し、勝てる方向性とロードマップを最初に描きます。",
    svc2_h3: "UI/UXデザイン",
    svc2_p: "初めての人でも迷わない画面へ。上質な印象と分かりやすさを同時に実現します。",
    svc3_h3: "アプリ開発",
    svc3_p: "「今動く」だけで終わらせません。ユーザーが増えても揺らがない、安定して拡張できる構造で開発します。",
    svc4_h3: "グローバル展開支援",
    svc4_p: "公開はゴールではありません。多言語・ローカライズからストア申請、運用まで、海外市場への定着を支援します。",

    h2h_eyebrow: "H2H フィロソフィー",
    h2h_h2: "テクノロジーは、人の代わりにはならない。",
    h2h_p:
      "H2HはHuman to Human、人と人です。私たちは、テクノロジーが人の代わりになるためではなく、人と人との距離を縮めるために存在すると信じています。優れたアプリとは機能が多いアプリではなく、誰もが直感的に理解し、使えるサービスのことです。だからこそAppFactoryは、すべてのプロジェクトの中心に、いつも人を置きます。",

    projects_eyebrow: "プロジェクト分野",
    projects_h2: "私たちが最も得意とする「つながり」。",
    cat1_h3: "マッチングアプリ",
    cat1_p: "人と人、需要と供給を的確に結ぶマッチング・レコメンドサービス。",
    cat2_h3: "コミュニティプラットフォーム",
    cat2_p: "同じ関心を持つ人が集い、また訪れたくなるコミュニティ・会員制プラットフォーム。",
    cat3_h3: "ビジネスアプリ",
    cat3_p: "煩雑な業務と運営をすっきり整理する、実戦的なビジネスツール。",
    cat4_h3: "AI活用サービス",
    cat4_p: "AIでより速く、一人ひとりに最適化された体験を届けるサービス。",
    cat5_h3: "グローバルモバイルサービス",
    cat5_p: "複数の国・言語・文化を最初から見据えて設計するグローバルモバイルサービス。",

    cta_eyebrow: "一緒につくる準備、できています",
    cta_h2: "あなたのアイデアを、世界へ届くアプリサービスに。",
    cta_lead: "アイデア段階でも大丈夫です。お気軽にお聞かせください。次の一歩を一緒に整理します。",
    cta_primary: "プロジェクトを相談する",

    footer_copy: "人と人をつなぐアプリをつくります。",
    footer_rights: "© 2026 AppFactory. 無断転載を禁じます。",
  },

  vi: {
    skip: "Chuyển đến nội dung",
    nav_about: "Giới thiệu",
    nav_services: "Dịch vụ",
    nav_projects: "Dự án",
    nav_contact: "Liên hệ",
    nav_cta: "Liên hệ",

    hero_eyebrow: "Đối tác sản phẩm số · H2H",
    hero_lead1: "Chúng tôi tạo ra những ứng dụng kết nối con người với con người.",
    hero_lead2: "Từ ý tưởng đến dịch vụ ứng dụng vươn tầm thế giới — như một đội ngũ.",
    hero_secondary: "Tìm hiểu thêm",
    signal_languages: "Ngôn ngữ",
    signal_philosophy: "Triết lý",
    signal_connections: "Kết nối",

    about_eyebrow: "Giới thiệu",
    about_h2: "Không chỉ là đơn vị phát triển — mà là đối tác sản phẩm của bạn.",
    about_intro:
      "AppFactory biến ý tưởng thành ứng dụng thực sự vận hành — được thiết kế quanh người dùng thật và xây dựng để thành công tại Hàn Quốc, Nhật Bản, Việt Nam và các thị trường toàn cầu. Chúng tôi nhìn con người trước công nghệ, và đặt trải nghiệm làm trung tâm.",
    about_c1_tag: "Con người & Cộng đồng",
    about_c1_h3: "Gần nhau, dù ở bất cứ đâu",
    about_c1_p: "Chúng tôi thiết kế trải nghiệm để những con người và cộng đồng rời rạc tự nhiên xích lại gần nhau.",
    about_c2_tag: "Dịch vụ & Ý tưởng",
    about_c2_h3: "Ý tưởng thành sản phẩm sống động",
    about_c2_p: "Chúng tôi biến ý tưởng còn dang dở thành dịch vụ thật mà mọi người tìm đến mỗi ngày.",
    about_c3_tag: "Thị trường toàn cầu",
    about_c3_h3: "Vươn xa, vượt biên giới",
    about_c3_p: "Với đa ngôn ngữ và bản địa hóa làm mặc định, chúng tôi mở rộng dịch vụ ra thị trường toàn cầu.",

    services_eyebrow: "Dịch vụ",
    services_h2: "Từ chiến lược đến ra mắt toàn cầu, trong một đội ngũ.",
    services_intro: "Bạn không cần ghép nối nhiều nhà cung cấp. Chúng tôi đảm nhận chiến lược, thiết kế, phát triển và ra mắt trong một dòng chảy.",
    svc1_h3: "Lập kế hoạch ứng dụng",
    svc1_p: "Chúng tôi bắt đầu bằng dữ liệu, không phải phỏng đoán — phân tích thị trường và người dùng để vạch ra lộ trình thực sự khả thi.",
    svc2_h3: "Thiết kế UI/UX",
    svc2_p: "Giao diện ai cũng hiểu ngay từ cái nhìn đầu tiên — vừa cao cấp, vừa dễ dùng.",
    svc3_h3: "Phát triển ứng dụng",
    svc3_p: "Chúng tôi xây dựng vượt mức “chạy được hôm nay” — kiến trúc ổn định, mở rộng tốt khi người dùng tăng lên.",
    svc4_h3: "Hỗ trợ ra mắt toàn cầu",
    svc4_p: "Ra mắt không phải là đích đến. Từ bản địa hóa đến đăng tải lên store và vận hành, chúng tôi giúp bạn trụ vững ở thị trường mới.",

    h2h_eyebrow: "Triết lý H2H",
    h2h_h2: "Công nghệ không bao giờ thay thế con người.",
    h2h_p:
      "H2H nghĩa là Human to Human — con người với con người. Chúng tôi tin công nghệ tồn tại không phải để thay thế con người, mà để rút ngắn khoảng cách giữa họ. Một ứng dụng tốt không phải là ứng dụng nhiều tính năng nhất, mà là ứng dụng ai cũng có thể hiểu và sử dụng. Vì thế, tại AppFactory, con người luôn ở trung tâm của mọi dự án.",

    projects_eyebrow: "Lĩnh vực dự án",
    projects_h2: "Những kết nối chúng tôi làm tốt nhất.",
    cat1_h3: "Ứng dụng kết nối",
    cat1_p: "Dịch vụ ghép nối và gợi ý, kết nối đúng người, đúng cung và cầu.",
    cat2_h3: "Nền tảng cộng đồng",
    cat2_p: "Nền tảng cộng đồng và thành viên, nơi những người cùng mối quan tâm ở lại và quay lại.",
    cat3_h3: "Ứng dụng doanh nghiệp",
    cat3_p: "Công cụ doanh nghiệp thực tế, biến vận hành phức tạp thành điều đơn giản.",
    cat4_h3: "Dịch vụ ứng dụng AI",
    cat4_p: "Dịch vụ ứng dụng AI phản hồi nhanh hơn và cá nhân hóa cho từng người dùng.",
    cat5_h3: "Dịch vụ di động toàn cầu",
    cat5_p: "Dịch vụ di động toàn cầu, thiết kế cho nhiều quốc gia, ngôn ngữ và văn hóa ngay từ đầu.",

    cta_eyebrow: "Sẵn sàng cùng bạn bắt đầu",
    cta_h2: "Biến ý tưởng của bạn thành dịch vụ ứng dụng toàn cầu.",
    cta_lead: "Dù mới chỉ là ý tưởng cũng không sao. Cứ chia sẻ, chúng tôi sẽ cùng bạn định hình bước tiếp theo.",
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
