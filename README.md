# AppFactory Homepage

> **Human to Human, Powered by Technology**

AppFactory 공식 홈페이지입니다. 사람과 사람을 이어주는 앱을 만드는 H2H 테크놀로지 브랜드의
프리미엄 다국어 랜딩 페이지로, 별도의 빌드 과정이 없는 순수 정적 사이트(HTML/CSS/JS)입니다.

---

## 🌏 브랜드 철학 — H2H (Human to Human)

> 기술은 사람을 대체하지 않습니다.
> 우리는 기술이 사람과 사람 사이의 거리를 좁히기 위해 존재한다고 믿습니다.

아이디어에서 글로벌 앱 서비스까지, 사람·서비스·아이디어·글로벌 시장을 연결합니다.

---

## 🗣️ 지원 언어 (4개 국어)

| 버튼 | 언어 | 코드 |
|------|------|------|
| 🇰🇷 KR | 한국어 | `ko` |
| 🇺🇸 EN | English | `en` |
| 🇯🇵 JP | 日本語 | `ja` |
| 🇻🇳 VI | Tiếng Việt | `vi` |

### 언어 전환 기능
- 상단 헤더의 **국기 버튼**을 클릭하면 페이지 전체 텍스트가 **새로고침 없이 즉시** 해당 언어로 전환됩니다.
- 선택한 언어는 **`localStorage`(키: `appfactory-lang`)** 에 저장되어 **새로고침/재방문 후에도 유지**됩니다.
- 저장된 값이 없으면 **브라우저 언어를 자동 감지**하고, 지원하지 않는 언어면 **한국어(ko)** 로 폴백합니다.
- 모든 번역은 `script.js`의 `translations` 객체(`ko`/`en`/`ja`/`vi`)에서 관리하며,
  HTML 요소의 `data-i18n="키"` 속성을 기준으로 `setLanguage(lang)` 함수가 텍스트를 교체합니다.

### 디자인 특징
다크 네이비/블랙 배경, 블루·사이언·바이올렛 그라데이션, 글래스모피즘 카드,
은은한 그리드 배경, 인터랙티브 네트워크 캔버스(`<canvas>`), 완전한 모바일 반응형.
외부 폰트·CDN·애널리틱스 등 **외부 의존성이 전혀 없습니다.**

---

## 📂 프로젝트 구조

```
.
├── index.html            # 페이지 마크업 + data-i18n 키 + SEO/OG 메타
├── styles.css            # 전체 스타일 (다크 테마, 글래스모피즘, 반응형, 정책 문서)
├── script.js             # 네트워크 캔버스 애니메이션 + 홈 다국어(translations/setLanguage)
├── policy.js             # 정책 페이지 공용 언어 전환 (chrome 번역 + 언어 블록 토글)
├── privacy.html          # 개인정보처리방침 (4개 언어)
├── terms.html            # 이용약관 (4개 언어)
├── contact.html          # 문의 (4개 언어)
├── delete-account.html   # 계정 삭제 요청 (4개 언어, Google Play 대응)
├── assets/logo.svg       # 브랜드 로고
├── favicon.svg           # 브랜드 파비콘 (인라인 SVG)
├── _headers              # Cloudflare Pages 보안/캐시 헤더
├── _redirects            # 정책 페이지 깔끔한 URL (/privacy 등)
├── robots.txt            # 크롤러 허용 + 사이트맵 위치
├── sitemap.xml           # 사이트맵 (https://appfactory.vn/)
├── .gitignore
└── README.md
```

---

## 💻 로컬 실행 방법

순수 정적 사이트라 별도 설치/빌드가 필요 없습니다.

**방법 1 — 파일 직접 열기**
`index.html`을 더블클릭해 브라우저로 엽니다. (대부분의 기능이 정상 동작합니다.)

**방법 2 — 로컬 서버 (권장)**
`_headers`/캐시 동작 및 절대 경로까지 실제와 동일하게 확인하려면 간단한 정적 서버를 사용하세요.

```bash
# Python 3
python -m http.server 8080

# 또는 Node (npx)
npx serve .
```

브라우저에서 `http://localhost:8080` 접속.

---

## 🚀 Cloudflare Pages 배포

이 저장소는 **빌드 과정이 없는 정적 사이트**이며 `index.html`이 **루트**에 있어
Cloudflare Pages에서 추가 설정 없이 바로 배포됩니다.

### Cloudflare Pages 설정값

| 항목 | 값 |
|------|-----|
| **Framework preset** | `None` |
| **Build command** | *(비워둠 / empty)* |
| **Build output directory** | `/` |
| **Root directory** | `/` |
| **Production branch** | `main` |

> GitHub 저장소(`appfactorypublish-create/Appfactory`)를 Cloudflare Pages에 연결하면
> `main` 브랜치에 push할 때마다 자동으로 재배포됩니다.

---

## 🌐 커스텀 도메인 연결 (`appfactory.vn`)

### 1) 네임서버 변경 (도메인 등록기관에서 수행)
도메인 `appfactory.vn`의 네임서버를 아래 Cloudflare 네임서버로 변경합니다.

```
adrian.ns.cloudflare.com
amit.ns.cloudflare.com
```

> 현재 Viettel IDC에 네임서버 변경을 요청한 상태입니다. 전파에는 보통 수 시간~최대 24~48시간이 걸립니다.

### 2) Cloudflare Pages에 커스텀 도메인 추가
Cloudflare 대시보드 → Pages 프로젝트 → **Custom domains** 에서 다음 두 도메인을 추가합니다.

- `appfactory.vn` (apex / 루트)
- `www.appfactory.vn`

Cloudflare가 필요한 DNS 레코드(CNAME 등)를 자동으로 생성하며, `www → apex`(또는 그 반대)
리다이렉트도 대시보드에서 설정할 수 있습니다.

### 3) HTTPS
Cloudflare가 SSL/TLS 인증서를 자동 발급합니다. 도메인 활성화 후 자동으로 HTTPS가 적용됩니다.

---

## ⚠️ DNS 주의사항 (반드시 확인)

> **🔴 Google Workspace 이메일용 MX 레코드는 절대 삭제하지 마세요.**
>
> 네임서버를 Cloudflare로 옮기면 기존 DNS 레코드가 새 환경으로 이전됩니다.
> 이때 **이메일(MX) 레코드가 누락되면 `contact@appfactory.vn` 등 메일 수발신이 중단**될 수 있습니다.
> Cloudflare DNS로 전환 후, 기존 **MX 레코드(및 SPF/DKIM/DMARC 등 메일 관련 TXT 레코드)** 가
> 그대로 존재하는지 반드시 확인하고, 없으면 동일하게 다시 추가하세요.

기타:
- 웹사이트용 레코드(Pages 도메인)와 메일용 레코드(MX/TXT)는 **서로 독립적**입니다. 웹 연결 작업이 메일을 건드리지 않도록 주의하세요.
- apex(`appfactory.vn`)와 `www` 두 도메인 모두 Pages에 연결하는 것을 권장합니다.

---

## 📄 앱 스토어 정책 페이지 (App Store Policy Hub)

Google Play / Apple App Store 심사에 필요한 정책 페이지를 정적 파일로 제공합니다.
각 페이지는 한국어/영어/일본어/베트남어 4개 언어를 지원하며, 홈페이지와 동일한 국기
버튼 전환 + `localStorage`(`appfactory-lang`) 방식을 공유합니다(공용 스크립트 `policy.js`).

| 페이지 | 파일 | 깔끔한 URL |
|--------|------|------------|
| Privacy Policy / 개인정보처리방침 | `privacy.html` | `https://appfactory.vn/privacy` |
| Terms of Service / 이용약관 | `terms.html` | `https://appfactory.vn/terms` |
| Contact / 문의 | `contact.html` | `https://appfactory.vn/contact` |
| Delete Account / 계정 삭제 요청 | `delete-account.html` | `https://appfactory.vn/delete-account` |

- **정적 사이트 성격 반영**: 이 홈페이지는 회원가입·로그인·결제·게시판·댓글·문의 폼이 없는 **정적 회사
  소개 + 정책 링크 허브**입니다. Privacy Policy는 "홈페이지 자체는 방문자 개인정보를 입력받지 않으며,
  데이터 수집은 AppFactory가 제작·운영하는 개별 앱에서 발생할 수 있다"는 점을 명확히 구분해 설명합니다.
  Terms는 회원제 서비스가 아님을, Delete Account는 홈페이지에 계정이 없음을 명시합니다.
- **파일 + 깔끔한 URL 둘 다 지원**: 실제 파일은 `*.html`로 존재하고, `_redirects`의 200 rewrite로
  `/privacy` 같은 확장자 없는 경로도 동작합니다. 스토어 콘솔에는 깔끔한 URL 사용을 권장합니다.
- **다국어 방식**: 각 페이지 안에 4개 언어 블록(`[data-lang-block="ko|en|ja|vi"]`)을 모두 담고,
  CSS가 `body[data-lang]`에 맞는 블록만 표시합니다. 정적이라 JS 실패 시에도 한국어가 보입니다.
- **Footer 링크**: 홈페이지와 모든 정책 페이지의 Footer에 네 정책 링크가 항상 노출되어, 선택 언어와
  무관하게 접근할 수 있습니다.
- **Google Play 계정 삭제 정책 대응**: `delete-account.html`에 앱 내 삭제/이메일 요청 경로, 요청 시
  기재 정보(앱 이름·가입 이메일·사용자 ID·사유[선택]), 처리 기간(30일 목표), 법적·보안상 보관 안내를 포함.
- **연락 이메일**: 모든 정책 페이지는 `contact@appfactory.vn` 으로 연결됩니다.

> ⚠️ **법적 고지:** 정책 페이지(개인정보처리방침·이용약관·계정 삭제 안내)의 문구는 **법률 자문이 아니라
> 일반적인 앱 출시 준비용 초안**입니다. 실제 앱과 관할 지역에 맞게 전문가의 검토를 거쳐 수정해 사용하세요.
> 이 고지는 각 정책 페이지 하단에도 표시되어 있습니다.

---

## 🔎 SEO

`index.html`에 다음이 포함되어 있습니다.
- `charset=UTF-8`, `viewport`, `title`, `meta description`
- `canonical` (`https://appfactory.vn/`)
- Open Graph: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:locale`(+ 4개 언어 alternate)
- Twitter Card: `summary`
- `theme-color`
- `robots.txt` + `sitemap.xml`

### 향후 작업 (TODO)
- **`og:image`(1200×630 소셜 공유 이미지)** — 실제 브랜드 이미지가 준비되면 추가하세요.
  추가 시 `index.html`의 TODO 주석 위치에 `og:image`를 넣고, `twitter:card`를 `summary_large_image`로 올리면 됩니다.
- 언어 전환이 단일 URL(JS 기반)이라 언어별 URL이 없어 `hreflang`은 적용하지 않았습니다.
  추후 언어별 URL(예: `/en/`, `/ja/`, `/vi/`)을 도입하면 `hreflang`을 추가하는 것을 권장합니다.

---

## ✅ 접근성 (Accessibility)
- 국기 언어 버튼: 각 버튼에 `aria-label`(언어 자국어 표기) + `aria-pressed`(현재 선택 상태) 적용.
- 본문 바로가기 `skip-link`, 시맨틱 `header`/`main`/`footer`/`section` 구조.
- 장식 요소(`canvas`, 그라데이션, 국기 이모지)는 `aria-hidden` 처리, 이미지(`<img>`)는 사용하지 않음.
- 모든 인터랙션은 표준 `<button>`/`<a>` 요소로 키보드 접근 가능.
- `prefers-reduced-motion` 사용자를 위해 애니메이션을 줄이는 처리가 포함됨.

---

## 📬 연락처

**contact@appfactory.vn**

---

## 👤 사용자가 직접 해야 하는 작업 (Human Actions)

Claude/코드로는 처리할 수 없는, **사람이 직접 수행해야 하는** 작업입니다.

1. **도메인 네임서버 변경** — 등록기관(Viettel IDC)에서 `appfactory.vn`의 네임서버를
   `adrian.ns.cloudflare.com`, `amit.ns.cloudflare.com` 으로 변경 (요청 메일 발송 완료, 처리 대기 중).
2. **Cloudflare 계정 로그인 / Pages 프로젝트 생성** — 대시보드에서 GitHub 저장소 연결.
3. **GitHub ↔ Cloudflare 연결 승인** — Cloudflare의 GitHub App 권한 승인.
4. **Cloudflare Pages 빌드 설정 입력** — 위 표의 설정값 그대로 입력 (Framework: None / Build command: 비움 / Output: `/` / Root: `/`).
5. **커스텀 도메인 추가** — Pages에서 `appfactory.vn` 및 `www.appfactory.vn` 추가.
6. **DNS/MX 확인** — Cloudflare DNS에서 **MX 및 메일 관련 레코드가 보존**되었는지 확인 (위 경고 참조).
7. *(선택)* **`og:image` 이미지 제작 및 추가.**
