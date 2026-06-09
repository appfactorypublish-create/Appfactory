/* ------------------------------------------------------------------ *
 * Shared language switcher for AppFactory policy pages
 * (privacy / terms / contact / delete-account).
 *
 * The long-form legal text lives in the HTML as four [data-lang-block]
 * sections; CSS shows the one matching body[data-lang]. This script only
 * needs to: swap the shared chrome labels (data-i18n), flip body[data-lang]
 * + <html lang>, update the flag buttons, and persist the choice to the
 * SAME localStorage key as the homepage so the language carries across.
 * ------------------------------------------------------------------ */
const uiText = {
  ko: {
    nav_home: "홈",
    back_home: "← 홈으로 돌아가기",
    footer_copy: "AppFactory는 사람과 사람을 이어주는 H2H 앱 서비스를 만듭니다.",
    footer_privacy: "개인정보처리방침",
    footer_terms: "이용약관",
    footer_contact: "문의",
    footer_delete: "계정 삭제",
    footer_rights: "© 2026 AppFactory. 모든 권리 보유.",
  },
  en: {
    nav_home: "Home",
    back_home: "← Back to home",
    footer_copy: "AppFactory creates H2H app services that connect people.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_contact: "Contact",
    footer_delete: "Delete Account",
    footer_rights: "© 2026 AppFactory. All rights reserved.",
  },
  ja: {
    nav_home: "ホーム",
    back_home: "← ホームに戻る",
    footer_copy: "AppFactoryは人と人をつなぐH2Hアプリサービスをつくります。",
    footer_privacy: "プライバシーポリシー",
    footer_terms: "利用規約",
    footer_contact: "お問い合わせ",
    footer_delete: "アカウント削除",
    footer_rights: "© 2026 AppFactory. 無断転載を禁じます。",
  },
  vi: {
    nav_home: "Trang chủ",
    back_home: "← Quay lại trang chủ",
    footer_copy: "AppFactory tạo ra các dịch vụ ứng dụng H2H kết nối con người với con người.",
    footer_privacy: "Chính sách bảo mật",
    footer_terms: "Điều khoản dịch vụ",
    footer_contact: "Liên hệ",
    footer_delete: "Xóa tài khoản",
    footer_rights: "© 2026 AppFactory. Bảo lưu mọi quyền.",
  },
};

(function initPolicyLanguage() {
  const STORAGE_KEY = "appfactory-lang";
  const supported = Object.keys(uiText); // ["ko", "en", "ja", "vi"]
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

    const dict = uiText[lang];

    // Shared chrome labels (nav, footer).
    nodes.forEach((node) => {
      const value = dict[node.dataset.i18n];
      if (typeof value === "string") {
        node.textContent = value;
      }
    });

    // CSS uses body[data-lang] to reveal the matching [data-lang-block].
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

  const stored = readStored();
  const browser = (navigator.language || "").slice(0, 2).toLowerCase();
  const initial = supported.includes(stored)
    ? stored
    : supported.includes(browser)
      ? browser
      : "ko";

  setLanguage(initial);

  window.setLanguage = setLanguage;
})();
