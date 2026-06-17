/* =========================================================================
   AppFactory — H2H Homepage
   Core script: i18n engine, language switching, inline SVG flags, navigation
   ========================================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'appfactory_lang';
  var SUPPORTED = ['ko', 'en', 'ja', 'vi'];
  var DEFAULT_LANG = 'en';

  /* ---- Translation store -------------------------------------------------
     Pages register their strings via window.AF.register({ ko:{}, en:{} ... }).
     Long-form legal text lives in policy.js and registers the same way. */
  var STORE = { ko: {}, en: {}, ja: {}, vi: {} };

  function deepMerge(target, source) {
    Object.keys(source).forEach(function (k) {
      if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
        target[k] = target[k] || {};
        deepMerge(target[k], source[k]);
      } else {
        target[k] = source[k];
      }
    });
  }

  function register(dict) {
    SUPPORTED.forEach(function (lang) {
      if (dict[lang]) deepMerge(STORE[lang], dict[lang]);
    });
  }

  /* Resolve a dotted key path ("hero.title") against a language object. */
  function resolve(lang, key) {
    var parts = key.split('.');
    var node = STORE[lang];
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return null;
      node = node[parts[i]];
    }
    return node == null ? null : node;
  }

  /* Detect a supported language from the browser when nothing is stored. */
  function detectLang() {
    var candidates = [];
    try {
      if (navigator.languages && navigator.languages.length) {
        candidates = navigator.languages;
      } else if (navigator.language) {
        candidates = [navigator.language];
      }
    } catch (e) {}
    for (var i = 0; i < candidates.length; i++) {
      var code = String(candidates[i]).toLowerCase().slice(0, 2);
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return DEFAULT_LANG;
  }

  function getLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    return detectLang();
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  /* Apply translations to every [data-i18n] element on the page. */
  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);

    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = resolve(lang, key);
      if (val == null) { val = resolve(DEFAULT_LANG, key); }
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    /* Attribute translations: data-i18n-attr="placeholder:key;title:key2" */
    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    attrNodes.forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length !== 2) return;
        var attr = bits[0].trim();
        var val = resolve(lang, bits[1].trim());
        if (val == null) val = resolve(DEFAULT_LANG, bits[1].trim());
        if (val != null) el.setAttribute(attr, val);
      });
    });

    /* Page <title> if it carries a key */
    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      var tval = resolve(lang, titleEl.getAttribute('data-i18n'));
      if (tval != null) document.title = tval;
    }

    /* Reflect active state on language buttons */
    var btns = document.querySelectorAll('.lang-btn');
    btns.forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    /* Notify dynamic renderers (e.g. app-policies.js) that the language changed */
    try {
      window.dispatchEvent(new CustomEvent('af:lang', { detail: lang }));
    } catch (e) {}
  }

  /* ---- Inline SVG flags (no text, real flag artwork) --------------------- */
  var FLAGS = {
    ko:
      '<svg viewBox="0 0 36 24" role="img" aria-label="한국어">' +
        '<rect width="36" height="24" rx="3" fill="#fff"/>' +
        '<g transform="translate(18,12)">' +
          '<circle r="6" fill="#fff"/>' +
          '<path d="M-6 0 A6 6 0 0 1 6 0 A3 3 0 0 1 0 0 A3 3 0 0 0 -6 0 Z" fill="#cd2e3a"/>' +
          '<path d="M6 0 A6 6 0 0 1 -6 0 A3 3 0 0 1 0 0 A3 3 0 0 0 6 0 Z" fill="#0047a0"/>' +
        '</g>' +
        '<g stroke="#000" stroke-width="0.9" transform="translate(18,12)">' +
          '<g transform="rotate(33.69)">' +
            '<g transform="translate(-9.3,0)">' +
              '<line x1="-2" y1="-1.1" x2="2" y2="-1.1"/><line x1="-2" y1="0" x2="2" y2="0"/><line x1="-2" y1="1.1" x2="2" y2="1.1"/>' +
            '</g>' +
            '<g transform="translate(9.3,0)">' +
              '<line x1="-2" y1="-1.1" x2="-0.4" y2="-1.1"/><line x1="0.4" y1="-1.1" x2="2" y2="-1.1"/>' +
              '<line x1="-2" y1="0" x2="2" y2="0"/>' +
              '<line x1="-2" y1="1.1" x2="-0.4" y2="1.1"/><line x1="0.4" y1="1.1" x2="2" y2="1.1"/>' +
            '</g>' +
          '</g>' +
          '<g transform="rotate(-33.69)">' +
            '<g transform="translate(-9.3,0)">' +
              '<line x1="-2" y1="-1.1" x2="-0.4" y2="-1.1"/><line x1="0.4" y1="-1.1" x2="2" y2="-1.1"/>' +
              '<line x1="-2" y1="0" x2="2" y2="0"/>' +
              '<line x1="-2" y1="1.1" x2="2" y2="1.1"/>' +
            '</g>' +
            '<g transform="translate(9.3,0)">' +
              '<line x1="-2" y1="-1.1" x2="2" y2="-1.1"/>' +
              '<line x1="-2" y1="0" x2="-0.4" y2="0"/><line x1="0.4" y1="0" x2="2" y2="0"/>' +
              '<line x1="-2" y1="1.1" x2="-0.4" y2="1.1"/><line x1="0.4" y1="1.1" x2="2" y2="1.1"/>' +
            '</g>' +
          '</g>' +
        '</g>' +
      '</svg>',
    en:
      '<svg viewBox="0 0 36 24" role="img" aria-label="English">' +
        '<defs><clipPath id="us-clip"><rect width="36" height="24" rx="3"/></clipPath></defs>' +
        '<g clip-path="url(#us-clip)">' +
          '<rect width="36" height="24" fill="#b22234"/>' +
          '<g fill="#fff">' +
            '<rect y="1.85" width="36" height="1.85"/><rect y="5.54" width="36" height="1.85"/>' +
            '<rect y="9.23" width="36" height="1.85"/><rect y="12.92" width="36" height="1.85"/>' +
            '<rect y="16.62" width="36" height="1.85"/><rect y="20.31" width="36" height="1.85"/>' +
          '</g>' +
          '<rect width="15.5" height="12.92" fill="#3c3b6e"/>' +
          '<g fill="#fff">' +
            '<circle cx="2.2" cy="2" r="0.6"/><circle cx="5.4" cy="2" r="0.6"/><circle cx="8.6" cy="2" r="0.6"/><circle cx="11.8" cy="2" r="0.6"/>' +
            '<circle cx="3.8" cy="4" r="0.6"/><circle cx="7" cy="4" r="0.6"/><circle cx="10.2" cy="4" r="0.6"/><circle cx="13.4" cy="4" r="0.6"/>' +
            '<circle cx="2.2" cy="6" r="0.6"/><circle cx="5.4" cy="6" r="0.6"/><circle cx="8.6" cy="6" r="0.6"/><circle cx="11.8" cy="6" r="0.6"/>' +
            '<circle cx="3.8" cy="8" r="0.6"/><circle cx="7" cy="8" r="0.6"/><circle cx="10.2" cy="8" r="0.6"/><circle cx="13.4" cy="8" r="0.6"/>' +
            '<circle cx="2.2" cy="10" r="0.6"/><circle cx="5.4" cy="10" r="0.6"/><circle cx="8.6" cy="10" r="0.6"/><circle cx="11.8" cy="10" r="0.6"/>' +
          '</g>' +
        '</g>' +
      '</svg>',
    ja:
      '<svg viewBox="0 0 36 24" role="img" aria-label="日本語">' +
        '<rect width="36" height="24" rx="3" fill="#fff"/>' +
        '<circle cx="18" cy="12" r="7.2" fill="#bc002d"/>' +
      '</svg>',
    vi:
      '<svg viewBox="0 0 36 24" role="img" aria-label="Tiếng Việt">' +
        '<rect width="36" height="24" rx="3" fill="#da251d"/>' +
        '<path fill="#ff0" d="M18 6 l1.76 5.42 5.7 0 -4.61 3.35 1.76 5.42 -4.61 -3.35 -4.61 3.35 1.76 -5.42 -4.61 -3.35 5.7 0 Z"/>' +
      '</svg>'
  };

  function buildLangSwitch() {
    var containers = document.querySelectorAll('[data-lang-switch]');
    if (!containers.length) return;

    var labels = {
      ko: '한국어', en: 'English', ja: '日本語', vi: 'Tiếng Việt'
    };

    containers.forEach(function (container) {
      container.innerHTML = '';
      SUPPORTED.forEach(function (lang) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-btn';
        btn.setAttribute('data-lang', lang);
        btn.setAttribute('aria-label', labels[lang]);
        btn.setAttribute('title', labels[lang]);
        btn.innerHTML = FLAGS[lang];
        btn.addEventListener('click', function () { setLang(lang); });
        container.appendChild(btn);
      });
    });
  }

  /* ---- Mobile nav toggle ------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-links');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Footer year ------------------------------------------------------- */
  function initYear() {
    var el = document.querySelector('[data-year]');
    if (el) {
      var y = new Date().getFullYear();
      el.textContent = String(y);
    }
  }

  /* ---- Shared site translations (all pages) ------------------------------ */
  register({
    ko: {
      meta: {
        home: 'AppFactory — 사람과 사람을 잇는 H2H 앱'
      },
      nav: {
        about: '소개', philosophy: 'H2H', services: '서비스',
        apps: '우리의 앱', policies: '정책', contact: '문의'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: '사람과 사람을 잇는 H2H 앱 서비스를 만듭니다',
        subtitle: 'AppFactory는 사람과 사람을 이어주는 H2H 앱 서비스를 직접 만들고 운영합니다. 우리는 앱을 단순한 기능의 묶음이 아니라, 만남과 소통, 관계와 협력이 일어나는 디지털 공간으로 설계합니다.',
        ctaPrimary: 'H2H 철학 보기',
        ctaSecondary: '우리의 앱'
      },
      about: {
        tag: 'About AppFactory',
        title: '우리는 자체 H2H 앱 서비스를 만드는 회사입니다',
        body: 'AppFactory는 우리만의 앱 서비스를 직접 만들고 운영하는 서비스 회사입니다. 다른 회사의 앱을 대신 만드는 외주사가 아닙니다. 우리는 사람들이 연결되고 싶어 하는 순간을 발견하고, 그것을 실제 H2H 앱 서비스로 풀어냅니다. 스포츠와 성향 테스트부터 커뮤니티, 매칭, 지역 기반 연결까지 — 사람과 사람이 서로를 만나는 다양한 방식을 탐구합니다. 각 앱은 독립된 서비스이지만, 그 중심에는 언제나 하나의 철학, Human to Human이 있습니다.',
        c1Title: '직접 만들고 운영합니다',
        c1Body: '아이디어부터 출시와 일상적인 운영까지, 모든 과정을 우리 손으로 진행합니다. 우리는 누군가의 요청을 대신 만드는 것이 아니라, 우리 서비스의 주인입니다.',
        c2Title: '사람이 먼저입니다',
        c2Body: '기능보다 사람을, 숫자보다 관계를 먼저 생각합니다. 모든 결정은 하나의 기준으로 판단합니다 — 이것이 사람을 더 가깝게 만드는가.',
        c3Title: '글로벌하게 연결합니다',
        c3Body: '언어와 문화, 시간대를 넘어 사람을 잇도록 설계합니다. 우리 서비스는 처음부터 한국어·영어·일본어·베트남어에서 자연스럽게 작동하도록 만들어집니다.'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: '우리는 앱을 기능의 묶음이 아니라, 사람과 사람을 잇는 다리로 봅니다.',
        body: '기술은 더 빠르고 편리해져야 하지만, 그 끝에는 언제나 사람이 있어야 합니다. 좋은 앱은 사람을 화면 안에 가두지 않고, 다른 사람에게 데려다줍니다. AppFactory의 H2H는 인간적인 온도를 가진 기술을 만들겠다는 약속입니다. 우리는 사람의 목적과 관심사, 상황과 지역, 언어를 연결하는 앱을 만듭니다.',
        p1Title: '사람 사이의 거리를 좁힌다',
        p1Body: '우리의 모든 서비스는 두 사람 사이의 거리를 한 걸음 좁히는 것을 목표로 합니다. 화면에서 대화로, 낯선 사람에서 파트너로 이어지는 그 한 걸음입니다.',
        p2Title: '연결은 진심이어야 한다',
        p2Body: '보기 좋은 숫자가 아니라, 의미 있는 연결을 만듭니다. 진심 어린 한 번의 만남이 수천 번의 의미 없는 노출보다 소중하다고 믿습니다.',
        p3Title: '기술은 인간적인 온도로',
        p3Body: '기술은 도구일 뿐이며, 사람에게 남는 것은 그 기술이 가능하게 한 사람과의 경험입니다. 우리는 기술을 조용히 두어, 연결이 더 또렷이 느껴지게 합니다.'
      },
      services: {
        tag: 'Our H2H Services',
        title: '우리가 만들어가는 H2H 서비스',
        lead: 'AppFactory는 여러 방향에서 H2H 앱 서비스를 탐구합니다. 모두 우리가 직접 만들고 운영하는 영역으로, 사람들이 서로를 더 쉽게 발견하고, 닿고, 이해하도록 돕습니다.',
        s1Title: '매칭 서비스',
        s1Body: '관심사와 목표, 순간을 공유하는 사람들을 연결합니다. 운동 파트너, 취미 친구, 마음이 통하는 사람까지. 매칭은 무한한 선택지가 아니라, 알맞은 때에 알맞은 사람을 만나는 일입니다.',
        s2Title: '커뮤니티 서비스',
        s2Body: '첫 인사를 넘어 관계가 계속 자라는 공간을 만듭니다. 사람들이 소속감을 느끼고, 다시 찾고, 함께 성장하는 커뮤니티입니다.',
        s3Title: '지역 기반 연결 서비스',
        s3Body: '사람들이 실제로 있는 곳에서 연결되도록 돕습니다. 동네, 경기장, 모임, 지역 그룹처럼. 진짜 연결은 종종 바로 가까운 곳에서 시작됩니다.',
        s4Title: '글로벌 소통 서비스',
        s4Body: '언어가 두 사람이 만나지 못할 이유가 되어서는 안 됩니다. 다국어와 글로벌 경험으로 국경과 문화를 넘어 사람을 잇습니다.',
        s5Title: 'AI 보조 휴먼 서비스',
        s5Body: '우리는 AI를 사람을 대체하기 위해서가 아니라, 연결을 돕기 위해 사용합니다. 똑똑한 추천과 부드러운 안내가 알맞은 사람을 더 빨리 만나게 하지만, 만남의 주인공은 언제나 사람입니다.',
        s6Title: '신뢰와 안전',
        s6Body: '연결은 신뢰 위에서만 의미가 있습니다. 우리는 모든 H2H 서비스에 안전과 존중, 투명함을 처음부터 설계해 넣습니다.'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'AppFactory가 만드는 앱',
        lead: 'AppFactory가 만들고 운영해 가는 H2H 서비스입니다. 일부는 서비스 중이고 일부는 준비 중이지만, 모두 같은 철학으로 빚어진 실제 앱입니다.',
        a1Title: 'S Partner',
        a1Status: '개발 중',
        a1Body: '스포츠 파트너와 운동 모임을 연결하는 H2H 매칭 서비스. 함께 운동할 사람을 찾는 일이 한결 쉬워집니다.',
        a2Title: 'MBTI Swipe',
        a2Status: '준비 중',
        a2Body: '상황 카드 기반의 성향 테스트로, 자기 이해를 가볍고 공유하기 좋은 경험으로 바꾸는 엔터테인먼트 서비스입니다.',
        note: '더 많은 H2H 서비스가 준비되고 있습니다. 각 앱은 준비와 출시에 맞춰 이곳에서 차례로 소개됩니다.'
      },
      policies: {
        tag: 'Policies',
        title: '정책 안내',
        lead: 'AppFactory는 투명한 서비스 운영을 위해 앱마다 정책 페이지를 제공합니다. Google Play와 Apple App Store 제출에 필요한 개인정보 처리방침과 이용약관을 앱별로 정리해, 각 서비스가 데이터를 어떻게 다루는지 누구나 확인할 수 있도록 했습니다.',
        privacy: '개인정보 처리방침',
        privacyDesc: '우리 앱이 정보를 어떻게 다루는지 안내합니다.',
        terms: '이용약관',
        termsDesc: '서비스 이용에 관한 약관입니다.',
        del: '계정 삭제 요청',
        delDesc: '앱 계정과 데이터 삭제를 요청하는 방법입니다.',
        appHub: '앱별 정책',
        appHubDesc: '각 앱의 개인정보 처리방침과 이용약관을 앱별로 제공합니다.',
        open: '열기'
      },
      contact: {
        tag: 'Contact',
        title: '문의하기',
        lead: '서비스, 파트너십, 정책, 앱에 관한 문의는 이메일로 연락해 주세요. 별도의 문의 폼이나 회원가입 없이, AppFactory 팀에 바로 연결됩니다.',
        emailLabel: '이메일',
        emailBtn: '이메일 보내기',
        note: '이 홈페이지는 회원가입·로그인·결제·문의 폼이 없는 정적 회사 소개 사이트이며, 모든 문의는 이메일로만 받습니다.'
      },
      footer: {
        tagline: 'AppFactory는 관심사와 커뮤니티, 문화를 넘어 사람과 사람을 잇는 H2H 앱 서비스를 만듭니다.',
        nav: '둘러보기',
        legal: '정책',
        appPolicies: '앱별 정책',
        contact: '문의',
        rights: '모든 권리 보유.'
      },
      backHome: '← 홈으로'
    },
    en: {
      meta: { home: 'AppFactory — H2H apps that connect people' },
      nav: {
        about: 'About', philosophy: 'H2H', services: 'Services',
        apps: 'Our Apps', policies: 'Policies', contact: 'Contact'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: 'We build H2H app services that connect people',
        subtitle: 'AppFactory creates and operates its own H2H app services that connect people. We design apps not merely as features, but as digital spaces where people meet, communicate, and build meaningful connections.',
        ctaPrimary: 'Our Philosophy',
        ctaSecondary: 'Our Apps'
      },
      about: {
        tag: 'About AppFactory',
        title: 'We build our own H2H app services',
        body: 'AppFactory is a service company that builds and operates its own app services — not an agency that makes apps for others. We look for the moments where people want to connect, and turn them into real H2H app services. From sports and personality tests to community, matching, and local connection, we explore many ways for people to find one another. Each app stands on its own, yet they all share a single center: Human to Human.',
        c1Title: 'We build and operate',
        c1Body: 'From the first idea to launch and daily operation, every step is in our own hands. We are the owners of what we make, not a vendor delivering someone else’s brief.',
        c2Title: 'People come first',
        c2Body: 'We think about people before features, and relationships before metrics. Every decision is judged by one thing: does it bring people closer?',
        c3Title: 'Connection, globally',
        c3Body: 'We design for people across languages, cultures, and time zones. From day one, our services are built to feel natural in Korean, English, Japanese, and Vietnamese.'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: 'We see an app not as a bundle of features, but as a bridge between people.',
        body: 'Technology should be faster and more convenient — but at the end of it, there must always be a person. A good app does not trap people behind a screen; it carries them to one another. AppFactory’s H2H is a promise to build technology with a human temperature. We make apps that connect people through their purpose, interests, situations, places, and languages.',
        p1Title: 'Close the distance',
        p1Body: 'Every service we make aims to shorten the distance between two people by one real step — from a screen to a conversation, from a stranger to a partner.',
        p2Title: 'Connection with meaning',
        p2Body: 'We care about connections that matter, not numbers that look good. One genuine introduction is worth more than a thousand empty impressions.',
        p3Title: 'Technology with a human temperature',
        p3Body: 'Technology is only a tool; what stays with people is the human experience it makes possible. We keep the technology quiet so the connection can be felt.'
      },
      services: {
        tag: 'Our H2H Services',
        title: 'The H2H services we build',
        lead: 'AppFactory explores H2H app services across several directions. Each is a space we build and operate ourselves, so that people can find, reach, and understand one another more easily.',
        s1Title: 'Matching Services',
        s1Body: 'We connect people who share an interest, a goal, or a moment — sports partners, hobby companions, like-minded people. Matching is not about endless options, but about the right person at the right time.',
        s2Title: 'Community Services',
        s2Body: 'We build spaces where relationships keep growing beyond a first hello — communities where people belong, return, and grow together.',
        s3Title: 'Local Connection Services',
        s3Body: 'We help people connect where they actually are: neighborhoods, courts, meetups, and local groups. Real connection often begins just around the corner.',
        s4Title: 'Global Communication Services',
        s4Body: 'Language should never be the reason two people can’t meet. With multilingual, global-ready experiences, we connect people across borders and cultures.',
        s5Title: 'AI-assisted Human Services',
        s5Body: 'We use AI to assist human connection, never to replace it. Smart suggestions and gentle guidance help the right people find each other faster — the meeting always stays theirs.',
        s6Title: 'Trust & Safety',
        s6Body: 'Connection only means something on a foundation of trust. We design safety, respect, and transparency into every H2H service from the start.'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'The apps AppFactory makes',
        lead: 'These are the H2H services AppFactory is building and operating. Some are live, others are in preparation — but each is a real app shaped by the same philosophy.',
        a1Title: 'S Partner',
        a1Status: 'In development',
        a1Body: 'An H2H matching service that connects sports partners and workout meetups, so finding someone to move with feels effortless.',
        a2Title: 'MBTI Swipe',
        a2Status: 'Being prepared',
        a2Body: 'A situation-card based personality test that turns self-understanding into a light, shareable experience — entertainment with a human touch.',
        note: 'More H2H services are on the way. Each app will be introduced here as it is prepared and released.'
      },
      policies: {
        tag: 'Policies',
        title: 'Policies',
        lead: 'For transparent operation, AppFactory provides a clear policy page for every app. Here you’ll find the privacy policies and terms required for Google Play and the Apple App Store, organized app by app — so anyone can see how each service handles data.',
        privacy: 'Privacy Policy',
        privacyDesc: 'How our apps handle information.',
        terms: 'Terms of Service',
        termsDesc: 'The terms for using our services.',
        del: 'Delete Account Request',
        delDesc: 'How to request deletion of your app account and data.',
        appHub: 'App Policies',
        appHubDesc: 'Per-app privacy policy and terms of service.',
        open: 'Open'
      },
      contact: {
        tag: 'Contact',
        title: 'Get in touch',
        lead: 'For questions about our services, partnerships, policies, or any of our apps, reach us by email. There is no contact form and no sign-up — just a direct line to the AppFactory team.',
        emailLabel: 'Email',
        emailBtn: 'Send an email',
        note: 'This homepage is a static company site with no sign-up, login, payment, or contact form. All inquiries are handled by email only.'
      },
      footer: {
        tagline: 'AppFactory creates H2H app services that connect people across interests, communities, and cultures.',
        nav: 'Explore',
        legal: 'Policies',
        appPolicies: 'App Policies',
        contact: 'Contact',
        rights: 'All rights reserved.'
      },
      backHome: '← Back to home'
    },
    ja: {
      meta: { home: 'AppFactory — 人と人をつなぐH2Hアプリ' },
      nav: {
        about: '紹介', philosophy: 'H2H', services: 'サービス',
        apps: '私たちのアプリ', policies: 'ポリシー', contact: 'お問い合わせ'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: '人と人をつなぐH2Hアプリサービスをつくる',
        subtitle: 'AppFactoryは、人と人をつなぐH2Hアプリサービスを自ら開発・運営しています。私たちはアプリを単なる機能ではなく、人が出会い、語り合い、意味のある関係を築くためのデジタルな場として設計します。',
        ctaPrimary: 'H2H哲学を見る',
        ctaSecondary: '私たちのアプリ'
      },
      about: {
        tag: 'About AppFactory',
        title: '私たちは自社のH2Hアプリサービスをつくります',
        body: 'AppFactoryは、自社のアプリサービスを自ら開発・運営するサービス企業です。他社のアプリを代わりにつくる受託会社ではありません。私たちは、人がつながりたいと願う瞬間を見つけ、それを実際のH2Hアプリサービスとして形にします。スポーツや性格テストから、コミュニティ、マッチング、地域でのつながりまで——人と人が出会うさまざまな方法を探求します。それぞれのアプリは独立したサービスでありながら、その中心にはいつもひとつの哲学、Human to Humanがあります。',
        c1Title: '自らつくり、運営する',
        c1Body: 'アイデアからリリース、日々の運営まで、すべての工程を自分たちの手で進めます。私たちは誰かの依頼を代わりにつくるのではなく、自社サービスの主体です。',
        c2Title: '人が最優先',
        c2Body: '機能より先に人を、数字より先に関係を考えます。すべての判断はひとつの基準で——これは人をより近づけるか。',
        c3Title: 'グローバルにつなぐ',
        c3Body: '言語や文化、時間帯を越えて人をつなぐように設計します。私たちのサービスは、最初から日本語・英語・韓国語・ベトナム語で自然に使えるようにつくられます。'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: '私たちはアプリを機能の集まりではなく、人と人をつなぐ架け橋と考えます。',
        body: '技術はより速く、より便利であるべきです。しかしその先には、いつも人がいなければなりません。良いアプリは人を画面に閉じ込めるのではなく、別の人へと運びます。AppFactoryのH2Hは、人間的な温度を持つ技術をつくるという約束です。私たちは、人の目的や関心、状況や地域、言語をつなぐアプリをつくります。',
        p1Title: '人との距離を縮める',
        p1Body: '私たちのすべてのサービスは、二人の距離を確かな一歩だけ縮めることを目指します。画面から会話へ、見知らぬ人からパートナーへと続く一歩です。',
        p2Title: 'つながりには意味を',
        p2Body: '見栄えのよい数字ではなく、意味のあるつながりを大切にします。心のこもったひとつの出会いは、数千の空虚な表示よりも価値があると信じています。',
        p3Title: '技術は人間的な温度で',
        p3Body: '技術は道具にすぎず、人に残るのはその技術が可能にした人とのつながりの体験です。私たちは技術を静かに保ち、つながりがより鮮明に感じられるようにします。'
      },
      services: {
        tag: 'Our H2H Services',
        title: '私たちがつくるH2Hサービス',
        lead: 'AppFactoryはさまざまな方向からH2Hアプリサービスを探求します。いずれも私たちが自ら開発・運営する領域で、人々が互いをより簡単に見つけ、届き、理解できるようにします。',
        s1Title: 'マッチングサービス',
        s1Body: '関心や目標、瞬間を共有する人々をつなぎます。運動仲間、趣味の友、気の合う人まで。マッチングは無限の選択肢ではなく、ふさわしい時にふさわしい人と出会うことです。',
        s2Title: 'コミュニティサービス',
        s2Body: '最初の挨拶を越えて関係が育ち続ける場をつくります。人が居場所を感じ、また訪れ、ともに成長するコミュニティです。',
        s3Title: '地域でのつながりサービス',
        s3Body: '人々が実際にいる場所でつながれるよう支えます。近所、コート、集まり、地域グループのように。本当のつながりは、すぐ近くから始まることが多いのです。',
        s4Title: 'グローバルなコミュニケーションサービス',
        s4Body: '言語が、二人が出会えない理由になってはいけません。多言語でグローバルに対応した体験で、国境や文化を越えて人をつなぎます。',
        s5Title: 'AIが支える人のためのサービス',
        s5Body: '私たちはAIを、人を置き換えるためではなく、つながりを支えるために使います。賢い提案とやさしい案内がふさわしい人との出会いを早めますが、出会いの主役はいつも人です。',
        s6Title: '信頼と安全',
        s6Body: 'つながりは信頼の上でこそ意味を持ちます。私たちはすべてのH2Hサービスに、安全と尊重、透明さを最初から設計して組み込みます。'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'AppFactoryがつくるアプリ',
        lead: 'AppFactoryがつくり、運営していくH2Hサービスです。すでに提供中のものも、準備中のものもありますが、いずれも同じ哲学から生まれた実際のアプリです。',
        a1Title: 'S Partner',
        a1Status: '開発中',
        a1Body: 'スポーツパートナーや運動仲間をつなぐH2Hマッチングサービス。一緒に体を動かす相手を、もっと気軽に見つけられます。',
        a2Title: 'MBTI Swipe',
        a2Status: '準備中',
        a2Body: 'シチュエーションカード型の性格テストで、自己理解を軽やかでシェアしやすい体験に変えるエンターテインメントサービスです。',
        note: 'さらに多くのH2Hサービスを準備しています。各アプリは準備とリリースに合わせて、ここで順番にご紹介します。'
      },
      policies: {
        tag: 'Policies',
        title: 'ポリシー',
        lead: 'AppFactoryは透明なサービス運営のため、アプリごとにポリシーページを用意しています。Google PlayやApple App Storeの提出に必要なプライバシーポリシーと利用規約をアプリ別に整理し、各サービスがデータをどう扱うかを誰でも確認できるようにしています。',
        privacy: 'プライバシーポリシー',
        privacyDesc: '私たちのアプリが情報をどう扱うかをご案内します。',
        terms: '利用規約',
        termsDesc: 'サービス利用に関する規約です。',
        del: 'アカウント削除リクエスト',
        delDesc: 'アプリのアカウントとデータの削除を依頼する方法です。',
        appHub: 'アプリ別ポリシー',
        appHubDesc: 'アプリごとのプライバシーポリシーと利用規約。',
        open: '開く'
      },
      contact: {
        tag: 'Contact',
        title: 'お問い合わせ',
        lead: 'サービス、パートナーシップ、ポリシー、アプリに関するお問い合わせはメールでご連絡ください。お問い合わせフォームや会員登録はなく、AppFactoryチームに直接つながります。',
        emailLabel: 'メール',
        emailBtn: 'メールを送る',
        note: 'このホームページは会員登録・ログイン・決済・お問い合わせフォームのない静的な会社紹介サイトで、すべてのお問い合わせはメールのみで受け付けます。'
      },
      footer: {
        tagline: 'AppFactoryは、興味や関心、コミュニティ、文化を越えて人と人をつなぐH2Hアプリサービスをつくります。',
        nav: '見る',
        legal: 'ポリシー',
        appPolicies: 'アプリ別ポリシー',
        contact: 'お問い合わせ',
        rights: 'All rights reserved.'
      },
      backHome: '← ホームへ'
    },
    vi: {
      meta: { home: 'AppFactory — Ứng dụng H2H kết nối con người' },
      nav: {
        about: 'Giới thiệu', philosophy: 'H2H', services: 'Dịch vụ',
        apps: 'Ứng dụng', policies: 'Chính sách', contact: 'Liên hệ'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: 'Chúng tôi tạo dịch vụ ứng dụng H2H kết nối con người',
        subtitle: 'AppFactory tự xây dựng và vận hành các dịch vụ ứng dụng H2H kết nối con người. Chúng tôi thiết kế ứng dụng không chỉ như những tính năng, mà như không gian số nơi con người gặp gỡ, trò chuyện và xây dựng những kết nối ý nghĩa.',
        ctaPrimary: 'Triết lý của chúng tôi',
        ctaSecondary: 'Ứng dụng của chúng tôi'
      },
      about: {
        tag: 'About AppFactory',
        title: 'Chúng tôi tạo dịch vụ ứng dụng H2H của riêng mình',
        body: 'AppFactory là công ty dịch vụ tự xây dựng và vận hành các dịch vụ ứng dụng của riêng mình — không phải đơn vị gia công làm ứng dụng cho người khác. Chúng tôi tìm những khoảnh khắc con người muốn kết nối và biến chúng thành dịch vụ ứng dụng H2H thực thụ. Từ thể thao và trắc nghiệm tính cách đến cộng đồng, ghép đôi và kết nối theo khu vực — chúng tôi khám phá nhiều cách để con người tìm thấy nhau. Mỗi ứng dụng đứng độc lập, nhưng tất cả cùng chung một trung tâm: Human to Human.',
        c1Title: 'Tự xây dựng và vận hành',
        c1Body: 'Từ ý tưởng đầu tiên đến ra mắt và vận hành hằng ngày, mọi bước đều do chính chúng tôi thực hiện. Chúng tôi là chủ nhân của sản phẩm mình tạo ra, không phải nhà cung cấp làm theo yêu cầu của người khác.',
        c2Title: 'Con người là trên hết',
        c2Body: 'Chúng tôi nghĩ về con người trước tính năng, về mối quan hệ trước các con số. Mọi quyết định được đánh giá bằng một điều: liệu nó có đưa con người lại gần nhau hơn?',
        c3Title: 'Kết nối toàn cầu',
        c3Body: 'Chúng tôi thiết kế cho con người vượt ngôn ngữ, văn hóa và múi giờ. Ngay từ đầu, dịch vụ của chúng tôi được tạo ra để tự nhiên trong tiếng Hàn, Anh, Nhật và Việt.'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: 'Chúng tôi xem ứng dụng không phải là tập hợp tính năng, mà là cầu nối giữa con người.',
        body: 'Công nghệ nên nhanh hơn và tiện lợi hơn — nhưng ở cuối cùng, luôn phải có một con người. Một ứng dụng tốt không giữ người dùng lại sau màn hình; nó đưa họ đến với nhau. H2H của AppFactory là lời hứa tạo ra công nghệ có hơi ấm con người. Chúng tôi tạo những ứng dụng kết nối con người qua mục đích, sở thích, hoàn cảnh, khu vực và ngôn ngữ.',
        p1Title: 'Rút ngắn khoảng cách',
        p1Body: 'Mọi dịch vụ chúng tôi tạo ra đều hướng đến rút ngắn khoảng cách giữa hai con người thêm một bước thật sự — từ màn hình đến cuộc trò chuyện, từ người lạ đến người đồng hành.',
        p2Title: 'Kết nối có ý nghĩa',
        p2Body: 'Chúng tôi quan tâm đến những kết nối thực sự quan trọng, không phải những con số đẹp mắt. Một lần giới thiệu chân thành đáng giá hơn hàng nghìn lượt hiển thị trống rỗng.',
        p3Title: 'Công nghệ có hơi ấm con người',
        p3Body: 'Công nghệ chỉ là công cụ; điều đọng lại với con người là trải nghiệm kết nối mà nó tạo điều kiện. Chúng tôi giữ công nghệ lặng lẽ để kết nối được cảm nhận rõ hơn.'
      },
      services: {
        tag: 'Our H2H Services',
        title: 'Những dịch vụ H2H chúng tôi xây dựng',
        lead: 'AppFactory khám phá dịch vụ ứng dụng H2H theo nhiều hướng. Mỗi hướng là một không gian chúng tôi tự xây dựng và vận hành, để con người tìm thấy, chạm đến và thấu hiểu nhau dễ dàng hơn.',
        s1Title: 'Dịch vụ ghép đôi',
        s1Body: 'Chúng tôi kết nối những người chung sở thích, mục tiêu hay khoảnh khắc — bạn tập thể thao, bạn cùng sở thích, người đồng điệu. Ghép đôi không phải là vô vàn lựa chọn, mà là đúng người vào đúng thời điểm.',
        s2Title: 'Dịch vụ cộng đồng',
        s2Body: 'Chúng tôi tạo không gian nơi các mối quan hệ tiếp tục lớn lên sau lời chào đầu tiên — cộng đồng nơi con người thuộc về, quay lại và cùng phát triển.',
        s3Title: 'Dịch vụ kết nối theo khu vực',
        s3Body: 'Chúng tôi giúp con người kết nối ngay tại nơi họ thực sự ở: khu phố, sân chơi, buổi gặp và nhóm địa phương. Kết nối thật thường bắt đầu ngay gần bên.',
        s4Title: 'Dịch vụ giao tiếp toàn cầu',
        s4Body: 'Ngôn ngữ không nên là lý do khiến hai người không thể gặp nhau. Với trải nghiệm đa ngôn ngữ, sẵn sàng toàn cầu, chúng tôi kết nối con người vượt biên giới và văn hóa.',
        s5Title: 'Dịch vụ con người có AI hỗ trợ',
        s5Body: 'Chúng tôi dùng AI để hỗ trợ kết nối con người, không bao giờ để thay thế. Gợi ý thông minh và dẫn dắt nhẹ nhàng giúp đúng người tìm thấy nhau nhanh hơn — cuộc gặp luôn là của họ.',
        s6Title: 'Tin cậy & an toàn',
        s6Body: 'Kết nối chỉ có ý nghĩa trên nền tảng niềm tin. Chúng tôi thiết kế an toàn, tôn trọng và minh bạch vào mọi dịch vụ H2H ngay từ đầu.'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'Ứng dụng AppFactory tạo ra',
        lead: 'Đây là những dịch vụ H2H mà AppFactory đang xây dựng và vận hành. Một số đã hoạt động, số khác đang chuẩn bị — nhưng mỗi ứng dụng đều là sản phẩm thật được định hình bởi cùng một triết lý.',
        a1Title: 'S Partner',
        a1Status: 'Đang phát triển',
        a1Body: 'Dịch vụ ghép đôi H2H kết nối bạn tập thể thao và nhóm vận động, để việc tìm người cùng vận động trở nên dễ dàng.',
        a2Title: 'MBTI Swipe',
        a2Status: 'Đang chuẩn bị',
        a2Body: 'Trắc nghiệm tính cách dựa trên thẻ tình huống, biến việc hiểu bản thân thành trải nghiệm nhẹ nhàng và dễ chia sẻ — giải trí với chạm cảm xúc con người.',
        note: 'Nhiều dịch vụ H2H khác đang trên đường ra mắt. Mỗi ứng dụng sẽ được giới thiệu tại đây khi được chuẩn bị và phát hành.'
      },
      policies: {
        tag: 'Policies',
        title: 'Chính sách',
        lead: 'Để vận hành minh bạch, AppFactory cung cấp trang chính sách riêng cho từng ứng dụng. Tại đây bạn sẽ tìm thấy chính sách quyền riêng tư và điều khoản cần cho Google Play và Apple App Store, sắp xếp theo từng ứng dụng — để bất kỳ ai cũng thấy mỗi dịch vụ xử lý dữ liệu ra sao.',
        privacy: 'Chính sách quyền riêng tư',
        privacyDesc: 'Cách ứng dụng của chúng tôi xử lý thông tin.',
        terms: 'Điều khoản dịch vụ',
        termsDesc: 'Điều khoản sử dụng dịch vụ.',
        del: 'Yêu cầu xóa tài khoản',
        delDesc: 'Cách yêu cầu xóa tài khoản và dữ liệu ứng dụng.',
        appHub: 'Chính sách theo ứng dụng',
        appHubDesc: 'Chính sách quyền riêng tư và điều khoản theo từng ứng dụng.',
        open: 'Mở'
      },
      contact: {
        tag: 'Contact',
        title: 'Liên hệ',
        lead: 'Mọi thắc mắc về dịch vụ, hợp tác, chính sách hay các ứng dụng của chúng tôi, xin liên hệ qua email. Không có biểu mẫu liên hệ và không cần đăng ký — chỉ là một đường dây trực tiếp tới đội ngũ AppFactory.',
        emailLabel: 'Email',
        emailBtn: 'Gửi email',
        note: 'Trang chủ này là website giới thiệu công ty tĩnh, không có đăng ký, đăng nhập, thanh toán hay biểu mẫu liên hệ. Mọi liên hệ chỉ qua email.'
      },
      footer: {
        tagline: 'AppFactory tạo ra các dịch vụ ứng dụng H2H kết nối con người qua sở thích, cộng đồng và văn hóa.',
        nav: 'Khám phá',
        legal: 'Chính sách',
        appPolicies: 'Chính sách theo ứng dụng',
        contact: 'Liên hệ',
        rights: 'Đã đăng ký bản quyền.'
      },
      backHome: '← Về trang chủ'
    }
  });

  /* ---- Boot -------------------------------------------------------------- */
  function boot() {
    buildLangSwitch();
    initNav();
    initYear();
    apply(getLang());
  }

  /* Public API for page-level translation registration */
  window.AF = {
    register: register,
    setLang: setLang,
    getLang: getLang
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
