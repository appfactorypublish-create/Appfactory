/* =========================================================================
   AppFactory — H2H Homepage
   Common legal page translations (privacy, terms, delete account).
   App-specific policies live in app-policies.js.

   NOTE: These texts are general drafts to help prepare app store
   submissions. They are not legal advice.
   ========================================================================= */
(function () {
  'use strict';
  if (!window.AF || typeof window.AF.register !== 'function') return;

  var EMAIL = 'connect@appfactory.vn';

  window.AF.register({
    /* ----------------------------- KOREAN ----------------------------- */
    ko: {
      legal: {
        updated: '최종 업데이트: 2026년 6월 14일',
        contactHeading: '문의',
        contactBody: '본 정책에 대한 문의는 아래 이메일로 보내주세요: ',
        disclaimer: '본 문서는 법률 자문이 아니며, 일반적인 앱 출시 준비를 위한 초안입니다. 실제 서비스 운영 시 관련 법령에 맞게 검토하시기 바랍니다.',
        appPointerH: '앱별 정책',
        appPointerB: 'AppFactory가 운영하는 각 앱(S Partner, MBTI Swipe)의 상세 정책은 앱별 정책 페이지에서 확인할 수 있습니다.',
        appPointerLink: '앱별 정책 보기 →'
      },
      privacyPage: {
        title: '개인정보 처리방침',
        intro: '본 개인정보 처리방침은 AppFactory 홈페이지와 AppFactory가 직접 만들고 운영하는 H2H 앱에 적용됩니다. AppFactory는 외주 개발사가 아니라 자체 H2H 앱을 운영하는 서비스 회사입니다.',
        s1h: '1. 홈페이지에 대하여',
        s1b: 'AppFactory 홈페이지는 정적 회사 소개 사이트로, 회원가입·로그인·결제·게시판·댓글·문의폼을 제공하지 않습니다. 방문자가 홈페이지에서 직접 개인정보를 입력하는 구조가 아닙니다. 사용자가 이메일로 문의하는 경우 사용자가 직접 제공한 정보(이메일 주소, 이름, 문의 내용 등)만 확인할 수 있습니다. 또한 쿠키, 기본 접속 로그, 보안 로그가 호스팅 또는 분석 도구를 통해 처리될 수 있습니다.',
        s2h: '2. 앱이 수집할 수 있는 정보',
        s2b: 'AppFactory가 운영하는 각 앱은 앱 기능에 따라 필요한 개인정보를 수집할 수 있습니다. 예: 계정 정보, 이메일, 닉네임, 프로필 정보, 관심사, 활동 지역, 앱 사용 기록, 기기 정보, 신고·문의 내용. 수집 항목은 앱별로 다를 수 있으며, 구체적인 내용은 앱별 개인정보 처리방침에서 안내합니다.',
        s3h: '3. 정보의 이용 목적',
        s3b: '수집된 정보는 H2H 서비스 제공, 사용자 간 연결 기능 운영, 계정 관리, 안전 확보와 부정 이용 방지, 신고·문의 대응, 서비스 개선을 위해 이용됩니다.',
        s4h: '4. 제3자 서비스',
        s4b: '앱 서비스 제공을 위해 Firebase, Google Play Services, Apple App Store, Cloudflare Pages, 분석(Analytics) 등 신뢰할 수 있는 제3자 서비스가 사용될 수 있습니다. 각 서비스는 자체 정책에 따라 데이터를 처리하며, AppFactory는 사용자의 개인정보를 판매하지 않습니다.',
        s5h: '5. 이용자의 권리 및 데이터 보관',
        s5b: '이용자는 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다. 개인정보는 서비스 제공에 필요한 기간 동안 보관되며, 삭제 요청 시 관련 데이터를 삭제합니다. 단, 법령상 보관이 요구되는 정보는 해당 기간 동안 보관될 수 있습니다.',
        s6h: '6. 아동의 개인정보',
        s6b: 'AppFactory 앱은 관련 법령에서 정한 최소 연령 미만의 아동을 대상으로 하지 않으며, 해당 아동의 개인정보를 고의로 수집하지 않습니다.'
      },
      termsPage: {
        title: '이용약관',
        intro: '본 약관은 AppFactory 홈페이지 및 AppFactory가 운영하는 H2H 앱 서비스의 이용 조건을 규정합니다. 서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.',
        s1h: '1. 서비스 소개',
        s1b: 'AppFactory는 사람과 사람을 잇는 자체 H2H 앱을 직접 만들고 운영하는 서비스 회사입니다. 본 홈페이지는 회사 및 앱 서비스 소개를 위한 정적 사이트이며, 각 앱 서비스의 세부 기능은 앱별로 다를 수 있습니다.',
        s2h: '2. 이용자의 책임',
        s2b: '이용자는 불법, 허위, 사기, 모욕, 차별, 스팸, 타인의 권리를 침해하는 행위를 해서는 안 되며, 관련 법령과 본 약관을 준수하여 서비스를 이용해야 합니다.',
        s3h: '3. 사용자 간 연결 시 주의',
        s3b: 'H2H 서비스 특성상 사용자 간 만남과 소통에는 신중함과 책임이 필요합니다. AppFactory는 사용자 간 직접적인 상호작용의 결과를 보증하지 않으며, 이용자는 안전에 유의해야 합니다.',
        s4h: '4. 지식재산권',
        s4b: 'AppFactory의 명칭, 로고, 디자인 및 서비스 관련 콘텐츠에 대한 지식재산권은 AppFactory 또는 정당한 권리자에게 있습니다.',
        s5h: '5. 서비스 변경·중단 및 책임의 한계',
        s5b: 'AppFactory는 서비스 품질 개선, 보안, 운영상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다. 서비스는 "있는 그대로" 제공되며, 법령이 허용하는 범위에서 AppFactory는 서비스 이용으로 발생하는 간접적 손해에 대해 책임을 지지 않습니다.',
        s6h: '6. 약관의 변경',
        s6b: '본 약관은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.'
      },
      deletePage: {
        title: '계정 삭제 요청',
        intro: '본 페이지는 AppFactory가 운영하는 앱의 계정 삭제 요청 안내입니다. AppFactory 홈페이지에는 별도의 계정이 없으므로, 여기서 안내하는 삭제는 홈페이지 계정이 아니라 AppFactory 앱 계정에 대한 것입니다.',
        s1h: '삭제 요청 방법',
        s1b: '앱에서 계정 삭제 기능을 제공하는 경우 앱 안에서 직접 삭제할 수 있습니다. 앱 내 기능을 사용할 수 없거나 문제가 있는 경우, 아래 이메일로 요청해 주세요. 요청 시 앱 이름, 가입 이메일, 닉네임 또는 사용자 ID, 삭제 요청 내용을 함께 보내주시면 도움이 됩니다.',
        emailSubject: '제목 예시: “Account Deletion Request - S Partner / MBTI Swipe”',
        s2h: '삭제되는 데이터',
        s2b: '요청이 확인되면 계정 정보와 사용자가 작성한 콘텐츠 등 관련 개인정보가 삭제됩니다. 단, 법령 준수, 보안, 분쟁 대응, 부정 이용 방지 등을 위해 일부 기록은 일정 기간 동안 보관될 수 있습니다.',
        s3h: '처리 기간',
        s3b: '계정 삭제 요청은 일반적으로 요청 확인 후 합리적인 기간 내에 처리됩니다.'
      }
    },

    /* ----------------------------- ENGLISH ----------------------------- */
    en: {
      legal: {
        updated: 'Last updated: June 14, 2026',
        contactHeading: 'Contact',
        contactBody: 'For any questions about this policy, please email us at: ',
        disclaimer: 'This document is not legal advice; it is a general draft to help prepare app store submissions. Please review it against applicable law for actual operation.',
        appPointerH: 'App-Specific Policies',
        appPointerB: 'Detailed policies for each app operated by AppFactory (S Partner, MBTI Swipe) are available on the App Policies pages.',
        appPointerLink: 'View app policies →'
      },
      privacyPage: {
        title: 'Privacy Policy',
        intro: 'This Privacy Policy applies to the AppFactory homepage and the H2H apps that AppFactory builds and operates. AppFactory is not a development agency — it is a service company that operates its own H2H apps.',
        s1h: '1. About the Homepage',
        s1b: 'The AppFactory homepage is a static company information site with no sign-up, login, payment, board, comments, or contact form. Visitors do not enter personal information directly on the homepage. When you contact us by email, we only see the information you provide (such as your email address, name, and message). Cookies, basic access logs, and security logs may also be processed through hosting or analytics tools.',
        s2h: '2. Information Apps May Collect',
        s2b: 'Each app operated by AppFactory may collect personal information needed for its features, for example: account information, email, nickname, profile information, interests, activity area, app usage records, device information, and reports/inquiries. The items collected vary by app and are described in each app’s privacy policy.',
        s3h: '3. How Information Is Used',
        s3b: 'Collected information is used to provide H2H services, operate connection features between users, manage accounts, ensure safety and prevent abuse, respond to reports and inquiries, and improve our services.',
        s4h: '4. Third-Party Services',
        s4b: 'To provide app services, trusted third-party services such as Firebase, Google Play Services, Apple App Store, Cloudflare Pages, and analytics may be used. Each service processes data under its own policy, and AppFactory does not sell your personal information.',
        s5h: '5. Your Rights & Data Retention',
        s5b: 'You may request access to, correction of, or deletion of your personal information. Personal information is retained for as long as needed to provide the service, and related data is deleted upon request, except information that must be retained by law for the required period.',
        s6h: '6. Children’s Privacy',
        s6b: 'AppFactory apps are not directed to children under the minimum age set by applicable law, and we do not knowingly collect personal information from such children.'
      },
      termsPage: {
        title: 'Terms of Service',
        intro: 'These Terms govern the use of the AppFactory homepage and the H2H app services operated by AppFactory. By using the services, you agree to these Terms.',
        s1h: '1. About the Service',
        s1b: 'AppFactory is a service company that builds and operates its own H2H apps connecting people to people. This homepage is a static site introducing the company and its app services, and the specific features of each app may differ.',
        s2h: '2. User Responsibilities',
        s2b: 'You must not engage in illegal, false, fraudulent, abusive, discriminatory, spam, or rights-infringing behavior, and you must use the services in compliance with applicable law and these Terms.',
        s3h: '3. Caution When Connecting With Others',
        s3b: 'Because these are H2H services, meeting and communicating with other users requires care and responsibility. AppFactory does not guarantee the outcome of direct interactions between users; please stay safe.',
        s4h: '4. Intellectual Property',
        s4b: 'Rights to the AppFactory name, logo, design, and service-related content belong to AppFactory or the rightful owners.',
        s5h: '5. Changes, Suspension & Limitation of Liability',
        s5b: 'AppFactory may modify or discontinue all or part of the services as needed for quality, security, or operational reasons. The services are provided “as is,” and to the extent permitted by law, AppFactory is not liable for indirect damages arising from use of the services.',
        s6h: '6. Changes to These Terms',
        s6b: 'We may update these Terms as needed and will announce changes on this page.'
      },
      deletePage: {
        title: 'Delete Account Request',
        intro: 'This page explains how to request deletion of an account in an app operated by AppFactory. The AppFactory homepage has no account of its own, so the deletion described here applies to your AppFactory app account, not a homepage account.',
        s1h: 'How to Request Deletion',
        s1b: 'If the app provides an in-app account deletion feature, you can delete your account directly within the app. If the in-app feature is unavailable or not working, please send a request to the email below. It helps if you include the app name, your sign-up email, your nickname or user ID, and your deletion request.',
        emailSubject: 'Example subject: “Account Deletion Request - S Partner / MBTI Swipe”',
        s2h: 'Data That Will Be Deleted',
        s2b: 'Once your request is confirmed, related personal information such as your account details and content you created will be deleted. Some records may be retained for a limited period for legal compliance, security, dispute resolution, and abuse prevention.',
        s3h: 'Processing Time',
        s3b: 'Account deletion requests are generally processed within a reasonable period after the request is confirmed.'
      }
    },

    /* ----------------------------- JAPANESE ----------------------------- */
    ja: {
      legal: {
        updated: '最終更新日: 2026年6月14日',
        contactHeading: 'お問い合わせ',
        contactBody: '本ポリシーに関するお問い合わせは、次のメールアドレスまでご連絡ください: ',
        disclaimer: '本書類は法的助言ではなく、一般的なアプリ提出準備のための草案です。実際の運営では適用法令に照らしてご確認ください。',
        appPointerH: 'アプリ別ポリシー',
        appPointerB: 'AppFactoryが運営する各アプリ（S Partner、MBTI Swipe）の詳細ポリシーは、アプリ別ポリシーのページでご確認いただけます。',
        appPointerLink: 'アプリ別ポリシーを見る →'
      },
      privacyPage: {
        title: 'プライバシーポリシー',
        intro: '本プライバシーポリシーは、AppFactoryホームページおよびAppFactoryが自ら開発・運営するH2Hアプリに適用されます。AppFactoryは受託開発会社ではなく、自社のH2Hアプリを運営するサービス企業です。',
        s1h: '1. ホームページについて',
        s1b: 'AppFactoryホームページは静的な会社紹介サイトで、会員登録・ログイン・決済・掲示板・コメント・お問い合わせフォームを提供しません。訪問者がホームページ上で直接個人情報を入力する仕組みではありません。メールでお問い合わせいただく場合、利用者が提供した情報（メールアドレス、氏名、問い合わせ内容など）のみを確認します。また、Cookie、基本的なアクセスログ、セキュリティログが、ホスティングまたは分析ツールを通じて処理される場合があります。',
        s2h: '2. アプリが収集する可能性のある情報',
        s2b: 'AppFactoryが運営する各アプリは、機能に応じて必要な個人情報を収集することがあります。例: アカウント情報、メール、ニックネーム、プロフィール情報、関心事、活動地域、アプリ利用履歴、端末情報、通報・問い合わせ内容。収集項目はアプリごとに異なり、詳細は各アプリのプライバシーポリシーでご案内します。',
        s3h: '3. 情報の利用目的',
        s3b: '収集した情報は、H2Hサービスの提供、利用者間の連携機能の運営、アカウント管理、安全確保と不正利用の防止、通報・問い合わせ対応、サービス改善のために利用します。',
        s4h: '4. 第三者サービス',
        s4b: 'アプリサービス提供のため、Firebase、Google Play Services、Apple App Store、Cloudflare Pages、分析（Analytics）などの信頼できる第三者サービスを利用することがあります。各サービスは自社のポリシーに従ってデータを処理し、AppFactoryは利用者の個人情報を販売しません。',
        s5h: '5. 利用者の権利とデータ保管',
        s5b: '利用者はご自身の個人情報の閲覧・訂正・削除を請求できます。個人情報はサービス提供に必要な期間保管され、削除のご依頼があれば関連データを削除します。ただし、法令により保管が求められる情報は所定の期間保管される場合があります。',
        s6h: '6. 子どもの個人情報',
        s6b: 'AppFactoryのアプリは適用法令で定める最低年齢未満の子どもを対象としておらず、当該の子どもの個人情報を故意に収集しません。'
      },
      termsPage: {
        title: '利用規約',
        intro: '本規約は、AppFactoryホームページおよびAppFactoryが運営するH2Hアプリサービスの利用条件を定めます。サービスを利用することで、本規約に同意したものとみなされます。',
        s1h: '1. サービスについて',
        s1b: 'AppFactoryは、人と人をつなぐ自社のH2Hアプリを自ら開発・運営するサービス企業です。本ホームページは会社およびアプリサービス紹介のための静的サイトであり、各アプリの具体的な機能は異なる場合があります。',
        s2h: '2. 利用者の責任',
        s2b: '利用者は、違法・虚偽・詐欺・侮辱・差別・スパム・他者の権利を侵害する行為を行ってはならず、適用法令および本規約を遵守してサービスを利用するものとします。',
        s3h: '3. 利用者間のつながりにおける注意',
        s3b: 'H2Hサービスの特性上、利用者間の出会いやコミュニケーションには慎重さと責任が必要です。AppFactoryは利用者間の直接的なやり取りの結果を保証せず、利用者は安全に十分ご留意ください。',
        s4h: '4. 知的財産権',
        s4b: 'AppFactoryの名称、ロゴ、デザインおよびサービス関連コンテンツに関する知的財産権は、AppFactoryまたは正当な権利者に帰属します。',
        s5h: '5. サービスの変更・中止および責任の制限',
        s5b: 'AppFactoryは、品質改善・セキュリティ・運営上の必要に応じて、サービスの全部または一部を変更または中止することがあります。サービスは「現状のまま」提供され、法令が認める範囲で、AppFactoryはサービスの利用により生じた間接的な損害について責任を負いません。',
        s6h: '6. 規約の変更',
        s6b: '本規約は必要に応じて変更されることがあり、変更時は本ページにてお知らせします。'
      },
      deletePage: {
        title: 'アカウント削除リクエスト',
        intro: '本ページは、AppFactoryが運営するアプリのアカウント削除リクエストのご案内です。AppFactoryホームページには独自のアカウントがないため、ここで説明する削除はホームページのアカウントではなく、AppFactoryアプリのアカウントに関するものです。',
        s1h: '削除のリクエスト方法',
        s1b: 'アプリにアカウント削除機能がある場合は、アプリ内で直接削除できます。アプリ内の機能が利用できない、または問題がある場合は、下記メールまでご依頼ください。ご依頼の際は、アプリ名、登録メールアドレス、ニックネームまたはユーザーID、削除リクエストの内容を併せてお知らせいただけると助かります。',
        emailSubject: '件名の例: 「Account Deletion Request - S Partner / MBTI Swipe」',
        s2h: '削除されるデータ',
        s2b: 'リクエストが確認されると、アカウント情報や利用者が作成したコンテンツなどの関連個人情報が削除されます。ただし、法令遵守、セキュリティ、紛争対応、不正利用防止などのため、一部の記録は一定期間保管される場合があります。',
        s3h: '処理期間',
        s3b: 'アカウント削除リクエストは、通常、リクエスト確認後の合理的な期間内に処理されます。'
      }
    },

    /* ----------------------------- VIETNAMESE ----------------------------- */
    vi: {
      legal: {
        updated: 'Cập nhật lần cuối: 14 tháng 6, 2026',
        contactHeading: 'Liên hệ',
        contactBody: 'Mọi thắc mắc về chính sách này, vui lòng gửi email tới: ',
        disclaimer: 'Tài liệu này không phải là tư vấn pháp lý; đây là bản nháp chung giúp chuẩn bị nộp lên app store. Vui lòng rà soát theo luật hiện hành khi vận hành thực tế.',
        appPointerH: 'Chính sách theo ứng dụng',
        appPointerB: 'Chính sách chi tiết của từng ứng dụng do AppFactory vận hành (S Partner, MBTI Swipe) có trên các trang Chính sách theo ứng dụng.',
        appPointerLink: 'Xem chính sách theo ứng dụng →'
      },
      privacyPage: {
        title: 'Chính sách quyền riêng tư',
        intro: 'Chính sách quyền riêng tư này áp dụng cho trang chủ AppFactory và các ứng dụng H2H do AppFactory tự xây dựng và vận hành. AppFactory không phải là công ty gia công — chúng tôi là công ty dịch vụ vận hành các ứng dụng H2H của riêng mình.',
        s1h: '1. Về trang chủ',
        s1b: 'Trang chủ AppFactory là website tĩnh giới thiệu công ty, không có đăng ký, đăng nhập, thanh toán, diễn đàn, bình luận hay biểu mẫu liên hệ. Khách truy cập không nhập thông tin cá nhân trực tiếp trên trang chủ. Khi bạn liên hệ qua email, chúng tôi chỉ thấy thông tin bạn cung cấp (như địa chỉ email, tên và nội dung). Cookie, nhật ký truy cập cơ bản và nhật ký bảo mật cũng có thể được xử lý qua công cụ lưu trữ hoặc phân tích.',
        s2h: '2. Thông tin ứng dụng có thể thu thập',
        s2b: 'Mỗi ứng dụng do AppFactory vận hành có thể thu thập thông tin cá nhân cần cho tính năng của nó, ví dụ: thông tin tài khoản, email, biệt danh, thông tin hồ sơ, sở thích, khu vực hoạt động, lịch sử sử dụng ứng dụng, thông tin thiết bị và nội dung báo cáo/liên hệ. Các mục thu thập khác nhau theo ứng dụng và được mô tả trong chính sách quyền riêng tư của từng ứng dụng.',
        s3h: '3. Cách sử dụng thông tin',
        s3b: 'Thông tin thu thập được dùng để cung cấp dịch vụ H2H, vận hành tính năng kết nối giữa người dùng, quản lý tài khoản, đảm bảo an toàn và ngăn lạm dụng, xử lý báo cáo và liên hệ, và cải thiện dịch vụ.',
        s4h: '4. Dịch vụ bên thứ ba',
        s4b: 'Để cung cấp dịch vụ ứng dụng, có thể sử dụng các dịch vụ bên thứ ba đáng tin cậy như Firebase, Google Play Services, Apple App Store, Cloudflare Pages và phân tích (Analytics). Mỗi dịch vụ xử lý dữ liệu theo chính sách riêng, và AppFactory không bán thông tin cá nhân của bạn.',
        s5h: '5. Quyền của bạn & lưu trữ dữ liệu',
        s5b: 'Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Thông tin cá nhân được lưu trong thời gian cần thiết để cung cấp dịch vụ, và dữ liệu liên quan sẽ bị xóa khi có yêu cầu, trừ thông tin bắt buộc phải lưu theo luật trong thời hạn quy định.',
        s6h: '6. Quyền riêng tư của trẻ em',
        s6b: 'Ứng dụng của AppFactory không hướng đến trẻ em dưới độ tuổi tối thiểu theo luật hiện hành, và chúng tôi không cố ý thu thập thông tin cá nhân của những trẻ em đó.'
      },
      termsPage: {
        title: 'Điều khoản sử dụng',
        intro: 'Các điều khoản này điều chỉnh việc sử dụng trang chủ AppFactory và các dịch vụ ứng dụng H2H do AppFactory vận hành. Bằng việc sử dụng dịch vụ, bạn đồng ý với các điều khoản này.',
        s1h: '1. Về dịch vụ',
        s1b: 'AppFactory là công ty dịch vụ tự xây dựng và vận hành các ứng dụng H2H kết nối con người. Trang chủ này là website tĩnh giới thiệu công ty và dịch vụ ứng dụng, và các tính năng cụ thể của mỗi ứng dụng có thể khác nhau.',
        s2h: '2. Trách nhiệm của người dùng',
        s2b: 'Bạn không được thực hiện các hành vi bất hợp pháp, sai sự thật, lừa đảo, lăng mạ, phân biệt đối xử, spam hoặc xâm phạm quyền của người khác, và phải sử dụng dịch vụ tuân thủ pháp luật hiện hành cùng các điều khoản này.',
        s3h: '3. Lưu ý khi kết nối với người khác',
        s3b: 'Do đặc thù của dịch vụ H2H, việc gặp gỡ và giao tiếp giữa người dùng đòi hỏi sự thận trọng và trách nhiệm. AppFactory không bảo đảm kết quả của những tương tác trực tiếp giữa người dùng; vui lòng giữ an toàn.',
        s4h: '4. Sở hữu trí tuệ',
        s4b: 'Quyền đối với tên gọi, logo, thiết kế và nội dung liên quan đến dịch vụ của AppFactory thuộc về AppFactory hoặc chủ sở hữu hợp pháp.',
        s5h: '5. Thay đổi, tạm ngừng & giới hạn trách nhiệm',
        s5b: 'AppFactory có thể thay đổi hoặc ngừng toàn bộ hoặc một phần dịch vụ khi cần vì chất lượng, bảo mật hoặc lý do vận hành. Dịch vụ được cung cấp “nguyên trạng”, và trong phạm vi pháp luật cho phép, AppFactory không chịu trách nhiệm cho các thiệt hại gián tiếp phát sinh từ việc sử dụng dịch vụ.',
        s6h: '6. Thay đổi điều khoản',
        s6b: 'Chúng tôi có thể cập nhật các điều khoản này khi cần và sẽ thông báo thay đổi trên trang này.'
      },
      deletePage: {
        title: 'Yêu cầu xóa tài khoản',
        intro: 'Trang này hướng dẫn cách yêu cầu xóa tài khoản trong ứng dụng do AppFactory vận hành. Trang chủ AppFactory không có tài khoản riêng, nên việc xóa được mô tả ở đây áp dụng cho tài khoản ứng dụng AppFactory của bạn, không phải tài khoản trang chủ.',
        s1h: 'Cách yêu cầu xóa',
        s1b: 'Nếu ứng dụng có tính năng xóa tài khoản trong ứng dụng, bạn có thể xóa trực tiếp trong ứng dụng. Nếu tính năng trong ứng dụng không khả dụng hoặc gặp sự cố, vui lòng gửi yêu cầu tới email bên dưới. Sẽ hữu ích nếu bạn kèm theo tên ứng dụng, email đăng ký, biệt danh hoặc ID người dùng, và nội dung yêu cầu xóa.',
        emailSubject: 'Ví dụ tiêu đề: “Account Deletion Request - S Partner / MBTI Swipe”',
        s2h: 'Dữ liệu sẽ bị xóa',
        s2b: 'Khi yêu cầu được xác nhận, các thông tin cá nhân liên quan như chi tiết tài khoản và nội dung bạn tạo sẽ bị xóa. Một số hồ sơ có thể được lưu trong thời gian giới hạn để tuân thủ pháp luật, bảo mật, giải quyết tranh chấp và ngăn chặn lạm dụng.',
        s3h: 'Thời gian xử lý',
        s3b: 'Yêu cầu xóa tài khoản thường được xử lý trong một khoảng thời gian hợp lý sau khi yêu cầu được xác nhận.'
      }
    }
  });

  /* Expose the canonical contact email for any page that needs it. */
  window.AF_EMAIL = EMAIL;
})();
