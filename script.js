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
        about: '소개', philosophy: 'H2H 철학', services: '서비스',
        apps: '우리의 앱', policies: '정책', contact: '문의'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: '사람과 사람을 잇는 앱을 만듭니다',
        subtitle: 'AppFactory는 H2H 앱을 직접 만들고 운영하는 서비스 회사입니다. 우리는 기술이 아니라 사람의 연결을 설계합니다.',
        ctaPrimary: 'H2H 철학 보기',
        ctaSecondary: '우리의 앱'
      },
      about: {
        tag: 'About AppFactory',
        title: '우리는 서비스를 만드는 회사입니다',
        body: 'AppFactory는 외주 개발 회사가 아닙니다. 우리는 다른 회사의 앱을 대신 만들지 않습니다. 우리는 우리만의 H2H 앱을 직접 기획하고, 만들고, 운영합니다. 모든 제품은 한 가지 질문에서 시작합니다 — 이 앱이 사람과 사람을 어떻게 더 가깝게 만들 수 있는가.',
        c1Title: '직접 만들고 운영합니다',
        c1Body: '아이디어부터 출시, 운영까지 우리 손으로. 우리는 우리 서비스의 주인입니다.',
        c2Title: '사람이 먼저입니다',
        c2Body: '기능보다 사람을 먼저 생각합니다. 모든 결정의 기준은 사람의 연결입니다.',
        c3Title: '글로벌하게 연결합니다',
        c3Body: '언어와 국경을 넘어 사람과 사람을 잇는 경험을 설계합니다.'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: '우리는 앱을 기능의 묶음이 아니라 사람 사이의 다리로 봅니다.',
        body: 'H2H는 AppFactory가 만드는 모든 것의 중심에 있는 원칙입니다. 화면 너머에는 언제나 사람이 있습니다. 그래서 우리는 화면이 아니라 그 사람을 위해 만듭니다. 좋은 앱은 사람을 화면에 붙잡아 두지 않습니다. 좋은 앱은 사람을 다른 사람에게 데려다줍니다.',
        p1Title: '사람 사이의 거리를 좁힌다',
        p1Body: '우리의 모든 앱은 두 사람 사이의 거리를 한 걸음 좁히는 것을 목표로 합니다.',
        p2Title: '연결은 진심이어야 한다',
        p2Body: '숫자를 위한 연결이 아니라, 의미 있는 연결을 만듭니다.',
        p3Title: '기술은 보이지 않게',
        p3Body: '기술은 도구일 뿐입니다. 사용자에게 남는 것은 사람과의 경험입니다.'
      },
      services: {
        tag: 'Our H2H Services',
        title: '우리가 설계하는 연결',
        lead: 'AppFactory의 서비스는 모두 사람과 사람의 연결이라는 하나의 방향을 향합니다.',
        s1Title: '연결을 위한 디자인',
        s1Body: '사람들이 더 쉽게, 더 따뜻하게 서로에게 닿을 수 있는 경험을 디자인합니다.',
        s2Title: '신뢰와 안전',
        s2Body: '사람 사이의 연결은 신뢰 위에서만 의미가 있습니다. 안전을 기본으로 설계합니다.',
        s3Title: '커뮤니티',
        s3Body: '한 번의 만남이 아니라 계속 이어지는 관계가 자라는 공간을 만듭니다.',
        s4Title: '경계 없는 연결',
        s4Body: '다국어와 글로벌 경험으로 어디에 있든 사람을 잇습니다.'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'AppFactory가 만드는 앱',
        lead: 'AppFactory는 H2H 철학을 담은 자체 앱을 만들고 운영합니다. 새로운 연결의 방식을 계속해서 탐구합니다.',
        a1Title: '함께 잇기',
        a1Body: '비슷한 관심과 마음을 가진 사람들이 자연스럽게 만나고 이어지는 연결 경험.',
        a2Title: '함께 나누기',
        a2Body: '일상과 순간을 진심으로 나누며 관계가 깊어지는 공유 경험.',
        a3Title: '함께 성장하기',
        a3Body: '서로 돕고 배우며 함께 나아가는 사람 중심의 커뮤니티 경험.',
        note: '구체적인 앱 라인업은 출시 시점에 순차적으로 공개됩니다.'
      },
      policies: {
        tag: 'Policies',
        title: '정책 안내',
        lead: 'AppFactory와 우리 앱에 적용되는 정책입니다. 앱스토어 제출용 정책 링크로도 사용됩니다.',
        privacy: '개인정보 처리방침',
        privacyDesc: '우리 앱이 정보를 어떻게 다루는지 안내합니다.',
        terms: '이용약관',
        termsDesc: '서비스 이용에 관한 약관입니다.',
        del: '계정 삭제 요청',
        delDesc: '앱 계정과 데이터 삭제를 요청하는 방법입니다.',
        appHub: '앱별 정책',
        appHubDesc: '각 앱의 개인정보 처리방침·이용약관·계정 삭제 안내를 앱별로 제공합니다.',
        open: '열기'
      },
      contact: {
        tag: 'Contact',
        title: '문의하기',
        lead: 'AppFactory에 대한 문의는 이메일로 보내주세요. 별도의 회원가입이나 문의 폼은 없습니다.',
        emailLabel: '이메일',
        emailBtn: '이메일 보내기',
        note: '이 홈페이지는 회원가입, 로그인, 결제, 문의 폼을 제공하지 않는 정적 회사 소개 사이트입니다.'
      },
      footer: {
        tagline: '사람과 사람을 잇는 H2H 앱 서비스 회사',
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
        about: 'About', philosophy: 'H2H Philosophy', services: 'Services',
        apps: 'Our Apps', policies: 'Policies', contact: 'Contact'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: 'We build apps that connect people',
        subtitle: 'AppFactory builds and runs its own H2H apps. We don’t engineer features — we design human connection.',
        ctaPrimary: 'Our Philosophy',
        ctaSecondary: 'Our Apps'
      },
      about: {
        tag: 'About AppFactory',
        title: 'We are a service company',
        body: 'AppFactory is not a development agency. We don’t build apps for other companies. We design, build, and operate our own H2H apps. Every product starts with one question — how can this app bring people closer together?',
        c1Title: 'We build and operate',
        c1Body: 'From idea to launch to daily operation, by our own hands. We own what we make.',
        c2Title: 'People come first',
        c2Body: 'We think about people before features. Human connection is the measure of every decision.',
        c3Title: 'Connection, globally',
        c3Body: 'We design experiences that link people across languages and borders.'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: 'We see an app not as a bundle of features, but as a bridge between people.',
        body: 'H2H is the principle at the heart of everything AppFactory makes. Behind every screen there is always a person. So we build for that person, not for the screen. A good app does not keep people on the screen — it carries them to one another.',
        p1Title: 'Close the distance',
        p1Body: 'Every app we make aims to shorten the distance between two people by one step.',
        p2Title: 'Connection with meaning',
        p2Body: 'We create meaningful connection — not connection for the sake of numbers.',
        p3Title: 'Invisible technology',
        p3Body: 'Technology is only a tool. What stays with the user is the experience with another human.'
      },
      services: {
        tag: 'Our H2H Services',
        title: 'The connection we design',
        lead: 'Every AppFactory service points in one direction — connecting human to human.',
        s1Title: 'Designed for connection',
        s1Body: 'We design experiences that let people reach each other more easily and more warmly.',
        s2Title: 'Trust & safety',
        s2Body: 'Connection between people only means something on a foundation of trust. Safety is built in.',
        s3Title: 'Community',
        s3Body: 'We build spaces where relationships keep growing — not a single encounter.',
        s4Title: 'Connection without borders',
        s4Body: 'Multilingual, global experiences that connect people wherever they are.'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'The apps AppFactory makes',
        lead: 'AppFactory builds and operates its own apps grounded in the H2H philosophy. We keep exploring new ways for people to connect.',
        a1Title: 'Connect together',
        a1Body: 'A connection experience where people of similar hearts and interests naturally meet.',
        a2Title: 'Share together',
        a2Body: 'A sharing experience where relationships deepen through honest everyday moments.',
        a3Title: 'Grow together',
        a3Body: 'A people-first community where we help, learn, and move forward together.',
        note: 'Our specific app lineup will be revealed step by step as each launches.'
      },
      policies: {
        tag: 'Policies',
        title: 'Policies',
        lead: 'Policies that apply to AppFactory and our apps. They also serve as policy links for app store submission.',
        privacy: 'Privacy Policy',
        privacyDesc: 'How our apps handle information.',
        terms: 'Terms of Service',
        termsDesc: 'The terms for using our services.',
        del: 'Delete Account Request',
        delDesc: 'How to request deletion of your app account and data.',
        appHub: 'App Policies',
        appHubDesc: 'Per-app privacy policy, terms, and account deletion guides.',
        open: 'Open'
      },
      contact: {
        tag: 'Contact',
        title: 'Get in touch',
        lead: 'For any inquiry about AppFactory, please email us. There is no sign-up and no contact form.',
        emailLabel: 'Email',
        emailBtn: 'Send an email',
        note: 'This homepage is a static company site. It has no sign-up, login, payment, or contact form.'
      },
      footer: {
        tagline: 'An H2H app service company connecting people to people',
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
        about: '会社紹介', philosophy: 'H2H哲学', services: 'サービス',
        apps: '私たちのアプリ', policies: 'ポリシー', contact: 'お問い合わせ'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: '人と人をつなぐアプリをつくる',
        subtitle: 'AppFactoryは自社のH2Hアプリを自ら開発・運営するサービス企業です。私たちは機能ではなく、人のつながりを設計します。',
        ctaPrimary: 'H2H哲学を見る',
        ctaSecondary: '私たちのアプリ'
      },
      about: {
        tag: 'About AppFactory',
        title: '私たちはサービス企業です',
        body: 'AppFactoryは受託開発会社ではありません。他社のアプリを代わりに作ることはしません。私たちは自社のH2Hアプリを自ら企画し、つくり、運営します。すべての製品はひとつの問いから始まります — このアプリは、人と人をどれだけ近づけられるか。',
        c1Title: '自らつくり、運営する',
        c1Body: 'アイデアからリリース、運営まで自分たちの手で。私たちは自社サービスの主体です。',
        c2Title: '人が最優先',
        c2Body: '機能より先に人を考えます。すべての判断基準は人のつながりです。',
        c3Title: 'グローバルにつなぐ',
        c3Body: '言語や国境を越えて、人と人をつなぐ体験を設計します。'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: '私たちはアプリを機能の集まりではなく、人と人の架け橋と考えます。',
        body: 'H2HはAppFactoryがつくるすべての中心にある原則です。画面の向こうには、いつも人がいます。だから私たちは画面ではなく、その人のためにつくります。良いアプリは人を画面に留めません。良いアプリは人を別の人へと運びます。',
        p1Title: '人との距離を縮める',
        p1Body: '私たちのすべてのアプリは、二人の距離を一歩縮めることを目指します。',
        p2Title: 'つながりには意味を',
        p2Body: '数字のためのつながりではなく、意味のあるつながりをつくります。',
        p3Title: '技術は見えないように',
        p3Body: '技術は道具にすぎません。利用者に残るのは、人とのつながりの体験です。'
      },
      services: {
        tag: 'Our H2H Services',
        title: '私たちが設計するつながり',
        lead: 'AppFactoryのサービスはすべて、人と人をつなぐというひとつの方向を向いています。',
        s1Title: 'つながりのためのデザイン',
        s1Body: '人々がより簡単に、より温かく互いに届く体験をデザインします。',
        s2Title: '信頼と安全',
        s2Body: '人と人のつながりは信頼の上でこそ意味を持ちます。安全を前提に設計します。',
        s3Title: 'コミュニティ',
        s3Body: '一度の出会いではなく、続いていく関係が育つ場をつくります。',
        s4Title: '境界のないつながり',
        s4Body: '多言語とグローバルな体験で、どこにいても人をつなぎます。'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'AppFactoryがつくるアプリ',
        lead: 'AppFactoryはH2H哲学を込めた自社アプリをつくり、運営します。新しいつながりの形を探し続けます。',
        a1Title: 'ともにつながる',
        a1Body: '近い関心や思いを持つ人々が自然に出会い、つながる体験。',
        a2Title: 'ともに分かち合う',
        a2Body: '日々の瞬間を誠実に分かち合い、関係が深まる共有体験。',
        a3Title: 'ともに成長する',
        a3Body: '助け合い学び合いながら共に進む、人中心のコミュニティ体験。',
        note: '具体的なアプリのラインナップは、リリースに合わせて順次公開します。'
      },
      policies: {
        tag: 'Policies',
        title: 'ポリシー',
        lead: 'AppFactoryと私たちのアプリに適用されるポリシーです。アプリストア提出用のポリシーリンクとしても使えます。',
        privacy: 'プライバシーポリシー',
        privacyDesc: '私たちのアプリが情報をどう扱うかをご案内します。',
        terms: '利用規約',
        termsDesc: 'サービス利用に関する規約です。',
        del: 'アカウント削除リクエスト',
        delDesc: 'アプリのアカウントとデータの削除を依頼する方法です。',
        appHub: 'アプリ別ポリシー',
        appHubDesc: 'アプリごとのプライバシーポリシー・利用規約・アカウント削除のご案内。',
        open: '開く'
      },
      contact: {
        tag: 'Contact',
        title: 'お問い合わせ',
        lead: 'AppFactoryへのお問い合わせはメールでお願いします。会員登録やお問い合わせフォームはありません。',
        emailLabel: 'メール',
        emailBtn: 'メールを送る',
        note: 'このホームページは静的な会社紹介サイトです。会員登録・ログイン・決済・お問い合わせフォームはありません。'
      },
      footer: {
        tagline: '人と人をつなぐH2Hアプリサービス企業',
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
        about: 'Giới thiệu', philosophy: 'Triết lý H2H', services: 'Dịch vụ',
        apps: 'Ứng dụng', policies: 'Chính sách', contact: 'Liên hệ'
      },
      hero: {
        eyebrow: 'Human to Human',
        title: 'Chúng tôi tạo ứng dụng kết nối con người',
        subtitle: 'AppFactory tự xây dựng và vận hành các ứng dụng H2H của mình. Chúng tôi không thiết kế tính năng — chúng tôi thiết kế sự kết nối giữa con người.',
        ctaPrimary: 'Triết lý của chúng tôi',
        ctaSecondary: 'Ứng dụng của chúng tôi'
      },
      about: {
        tag: 'About AppFactory',
        title: 'Chúng tôi là một công ty dịch vụ',
        body: 'AppFactory không phải là công ty gia công phần mềm. Chúng tôi không làm ứng dụng thay cho công ty khác. Chúng tôi tự lên ý tưởng, xây dựng và vận hành các ứng dụng H2H của riêng mình. Mọi sản phẩm bắt đầu từ một câu hỏi — ứng dụng này có thể đưa con người lại gần nhau hơn như thế nào?',
        c1Title: 'Tự xây dựng và vận hành',
        c1Body: 'Từ ý tưởng đến ra mắt và vận hành, bằng chính tay chúng tôi. Chúng tôi làm chủ sản phẩm của mình.',
        c2Title: 'Con người là trên hết',
        c2Body: 'Chúng tôi nghĩ về con người trước tính năng. Kết nối con người là thước đo của mọi quyết định.',
        c3Title: 'Kết nối toàn cầu',
        c3Body: 'Chúng tôi thiết kế trải nghiệm kết nối con người vượt ngôn ngữ và biên giới.'
      },
      philosophy: {
        tag: 'H2H Philosophy',
        title: 'H2H — Human to Human',
        lead: 'Chúng tôi xem ứng dụng không phải là tập hợp tính năng, mà là cầu nối giữa con người.',
        body: 'H2H là nguyên tắc nằm ở trung tâm của mọi thứ AppFactory tạo ra. Đằng sau mỗi màn hình luôn là một con người. Vì vậy chúng tôi làm cho con người đó, không phải cho màn hình. Một ứng dụng tốt không giữ người dùng lại trên màn hình — nó đưa họ đến với nhau.',
        p1Title: 'Rút ngắn khoảng cách',
        p1Body: 'Mọi ứng dụng của chúng tôi đều hướng đến rút ngắn khoảng cách giữa hai con người thêm một bước.',
        p2Title: 'Kết nối có ý nghĩa',
        p2Body: 'Chúng tôi tạo ra kết nối có ý nghĩa — không phải kết nối vì con số.',
        p3Title: 'Công nghệ vô hình',
        p3Body: 'Công nghệ chỉ là công cụ. Điều đọng lại với người dùng là trải nghiệm với con người khác.'
      },
      services: {
        tag: 'Our H2H Services',
        title: 'Sự kết nối chúng tôi thiết kế',
        lead: 'Mọi dịch vụ của AppFactory đều hướng về một phía — kết nối con người với con người.',
        s1Title: 'Thiết kế để kết nối',
        s1Body: 'Chúng tôi thiết kế trải nghiệm để mọi người chạm đến nhau dễ dàng và ấm áp hơn.',
        s2Title: 'Tin cậy & an toàn',
        s2Body: 'Kết nối giữa con người chỉ có ý nghĩa trên nền tảng niềm tin. An toàn được thiết kế sẵn.',
        s3Title: 'Cộng đồng',
        s3Body: 'Chúng tôi tạo không gian nơi các mối quan hệ tiếp tục lớn lên — không chỉ một lần gặp.',
        s4Title: 'Kết nối không biên giới',
        s4Body: 'Trải nghiệm đa ngôn ngữ, toàn cầu, kết nối con người ở bất cứ đâu.'
      },
      apps: {
        tag: 'Apps We Create',
        title: 'Ứng dụng AppFactory tạo ra',
        lead: 'AppFactory xây dựng và vận hành các ứng dụng của riêng mình dựa trên triết lý H2H. Chúng tôi luôn khám phá những cách kết nối mới.',
        a1Title: 'Kết nối cùng nhau',
        a1Body: 'Trải nghiệm kết nối nơi những người có cùng sở thích và tấm lòng gặp nhau tự nhiên.',
        a2Title: 'Chia sẻ cùng nhau',
        a2Body: 'Trải nghiệm chia sẻ nơi các mối quan hệ sâu sắc hơn qua những khoảnh khắc chân thành.',
        a3Title: 'Phát triển cùng nhau',
        a3Body: 'Cộng đồng lấy con người làm trung tâm, cùng giúp đỡ, học hỏi và tiến lên.',
        note: 'Danh sách ứng dụng cụ thể sẽ được công bố dần khi ra mắt.'
      },
      policies: {
        tag: 'Policies',
        title: 'Chính sách',
        lead: 'Các chính sách áp dụng cho AppFactory và ứng dụng của chúng tôi, cũng dùng làm liên kết chính sách khi nộp lên app store.',
        privacy: 'Chính sách quyền riêng tư',
        privacyDesc: 'Cách ứng dụng của chúng tôi xử lý thông tin.',
        terms: 'Điều khoản dịch vụ',
        termsDesc: 'Điều khoản sử dụng dịch vụ.',
        del: 'Yêu cầu xóa tài khoản',
        delDesc: 'Cách yêu cầu xóa tài khoản và dữ liệu ứng dụng.',
        appHub: 'Chính sách theo ứng dụng',
        appHubDesc: 'Chính sách quyền riêng tư, điều khoản và hướng dẫn xóa tài khoản theo từng ứng dụng.',
        open: 'Mở'
      },
      contact: {
        tag: 'Contact',
        title: 'Liên hệ',
        lead: 'Mọi thắc mắc về AppFactory xin gửi qua email. Không có đăng ký hay biểu mẫu liên hệ.',
        emailLabel: 'Email',
        emailBtn: 'Gửi email',
        note: 'Trang chủ này là website giới thiệu công ty tĩnh. Không có đăng ký, đăng nhập, thanh toán hay biểu mẫu liên hệ.'
      },
      footer: {
        tagline: 'Công ty dịch vụ ứng dụng H2H kết nối con người',
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
