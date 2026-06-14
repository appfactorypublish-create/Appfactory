/* =========================================================================
   AppFactory — H2H Homepage
   Legal / policy page translations (privacy, terms, delete account)
   Registered into the shared i18n store defined in script.js.
   ========================================================================= */
(function () {
  'use strict';
  if (!window.AF || typeof window.AF.register !== 'function') return;

  var EMAIL = 'appfactory.publish@gmail.com';

  window.AF.register({
    /* ----------------------------- KOREAN ----------------------------- */
    ko: {
      legal: {
        updated: '최종 업데이트: 2026년 6월 14일',
        contactHeading: '문의',
        contactBody: '본 정책에 대한 문의는 아래 이메일로 보내주세요: '
      },
      privacyPage: {
        title: '개인정보 처리방침',
        intro: '본 개인정보 처리방침은 AppFactory와 AppFactory가 운영하는 H2H 앱에 적용됩니다. 본 홈페이지(회사 소개 사이트)는 회원가입, 로그인, 결제, 문의 폼을 제공하지 않으며 방문자로부터 직접 개인정보를 수집하지 않습니다. 다만 AppFactory가 운영하는 앱은 앱의 기능에 따라 일부 개인정보를 수집할 수 있습니다.',
        s1h: '1. 수집하는 정보',
        s1b: 'AppFactory 앱은 제공하는 기능에 따라 다음과 같은 정보를 수집할 수 있습니다: 계정 정보(예: 닉네임, 이메일), 사용자가 직접 입력하거나 게시하는 콘텐츠, 그리고 앱 이용에 관한 기본적인 기기·로그 정보. 각 앱은 해당 앱에 필요한 최소한의 정보만 수집합니다.',
        s2h: '2. 정보의 이용 목적',
        s2b: '수집된 정보는 H2H 서비스 제공, 사용자 간 연결 기능 운영, 계정 관리, 안전과 부정 이용 방지, 그리고 서비스 개선을 위해서만 이용됩니다.',
        s3h: '3. 정보의 공유',
        s3b: 'AppFactory는 사용자의 개인정보를 판매하지 않습니다. 법령에 따라 요구되는 경우, 또는 서비스 운영에 필요한 신뢰할 수 있는 처리 위탁사(예: 클라우드 인프라)를 제외하고 제3자에게 정보를 제공하지 않습니다.',
        s4h: '4. 데이터 보관 및 삭제',
        s4b: '개인정보는 서비스 제공에 필요한 기간 동안 보관되며, 사용자가 계정 삭제를 요청하면 관련 데이터를 삭제합니다. 계정 삭제 방법은 계정 삭제 요청 페이지를 참고하세요.',
        s5h: '5. 보안',
        s5b: 'AppFactory는 사용자 정보를 보호하기 위해 합리적인 기술적·관리적 보호 조치를 적용합니다.',
        s6h: '6. 아동의 개인정보',
        s6b: 'AppFactory 앱은 관련 법령에서 정한 최소 연령 미만의 아동을 대상으로 하지 않으며, 해당 아동의 개인정보를 고의로 수집하지 않습니다.'
      },
      termsPage: {
        title: '이용약관',
        intro: '본 약관은 AppFactory와 AppFactory가 운영하는 H2H 앱 및 서비스의 이용에 적용됩니다. 서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.',
        s1h: '1. 서비스 소개',
        s1b: 'AppFactory는 사람과 사람을 잇는 자체 H2H 앱을 직접 만들고 운영하는 서비스 회사입니다. 본 홈페이지는 회사와 그 철학을 소개하는 정적 사이트입니다.',
        s2h: '2. 이용자의 책임',
        s2b: '이용자는 관련 법령과 본 약관을 준수하여 서비스를 이용해야 하며, 타인의 권리를 침해하거나 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.',
        s3h: '3. 콘텐츠',
        s3b: '이용자가 앱에 게시한 콘텐츠에 대한 책임은 해당 이용자에게 있습니다. AppFactory는 커뮤니티의 안전을 위해 정책에 위반되는 콘텐츠를 제한할 수 있습니다.',
        s4h: '4. 지적재산권',
        s4b: 'AppFactory의 명칭, 로고, 디자인 및 서비스 관련 자료에 대한 권리는 AppFactory에 있습니다.',
        s5h: '5. 책임의 한계',
        s5b: '서비스는 “있는 그대로” 제공되며, 법령이 허용하는 범위 내에서 AppFactory는 서비스 이용으로 발생하는 간접적 손해에 대해 책임을 지지 않습니다.',
        s6h: '6. 약관의 변경',
        s6b: '본 약관은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.'
      },
      deletePage: {
        title: '계정 삭제 요청',
        intro: '본 페이지는 AppFactory가 운영하는 앱의 계정 삭제 요청 안내입니다. 본 홈페이지에는 별도의 계정이 없으므로, 여기서 안내하는 삭제는 홈페이지 계정이 아니라 AppFactory 앱 계정에 대한 것입니다.',
        s1h: '삭제 요청 방법',
        s1b: '계정 삭제를 원하시면 아래 이메일로 요청을 보내주세요. 처리를 위해 다음 정보를 함께 보내주시면 도움이 됩니다: 대상 앱 이름, 계정에 등록된 이메일 또는 닉네임.',
        emailSubject: '제목 예시: “[앱 이름] 계정 삭제 요청”',
        s2h: '삭제되는 데이터',
        s2b: '요청이 확인되면 계정 정보와 사용자가 작성한 콘텐츠 등 관련 개인정보가 삭제됩니다. 단, 법령상 보관이 요구되는 정보는 해당 기간 동안 보관될 수 있습니다.',
        s3h: '처리 기간',
        s3b: '계정 삭제 요청은 일반적으로 요청 확인 후 합리적인 기간(영업일 기준 수일) 내에 처리됩니다.'
      }
    },

    /* ----------------------------- ENGLISH ----------------------------- */
    en: {
      legal: {
        updated: 'Last updated: June 14, 2026',
        contactHeading: 'Contact',
        contactBody: 'For any questions about this policy, please email us at: '
      },
      privacyPage: {
        title: 'Privacy Policy',
        intro: 'This Privacy Policy applies to AppFactory and the H2H apps that AppFactory operates. This homepage (a company information site) has no sign-up, login, payment, or contact form, and does not collect personal information directly from visitors. However, apps operated by AppFactory may collect some personal information depending on each app’s features.',
        s1h: '1. Information We Collect',
        s1b: 'Depending on the features they provide, AppFactory apps may collect: account information (such as a nickname or email), content you choose to enter or post, and basic device and log information related to app usage. Each app collects only the minimum information it needs.',
        s2h: '2. How We Use Information',
        s2b: 'Collected information is used only to provide H2H services, operate connection features between users, manage accounts, ensure safety and prevent abuse, and improve our services.',
        s3h: '3. Sharing of Information',
        s3b: 'AppFactory does not sell your personal information. We do not share it with third parties, except where required by law or with trusted processors necessary to operate the service (such as cloud infrastructure providers).',
        s4h: '4. Data Retention & Deletion',
        s4b: 'Personal information is retained for as long as needed to provide the service. When you request account deletion, we delete the related data. See the Delete Account Request page for how to do this.',
        s5h: '5. Security',
        s5b: 'AppFactory applies reasonable technical and organizational safeguards to protect user information.',
        s6h: '6. Children’s Privacy',
        s6b: 'AppFactory apps are not directed to children under the minimum age set by applicable law, and we do not knowingly collect personal information from such children.'
      },
      termsPage: {
        title: 'Terms of Service',
        intro: 'These Terms apply to the use of AppFactory and the H2H apps and services that AppFactory operates. By using the services, you agree to these Terms.',
        s1h: '1. About the Service',
        s1b: 'AppFactory is a service company that builds and operates its own H2H apps connecting people to people. This homepage is a static site that introduces the company and its philosophy.',
        s2h: '2. User Responsibilities',
        s2b: 'You must use the services in compliance with applicable law and these Terms, and must not infringe the rights of others or interfere with the normal operation of the services.',
        s3h: '3. Content',
        s3b: 'You are responsible for the content you post in our apps. AppFactory may restrict content that violates our policies in order to keep the community safe.',
        s4h: '4. Intellectual Property',
        s4b: 'Rights to the AppFactory name, logo, design, and service materials belong to AppFactory.',
        s5h: '5. Limitation of Liability',
        s5b: 'The services are provided “as is.” To the extent permitted by law, AppFactory is not liable for indirect damages arising from use of the services.',
        s6h: '6. Changes to These Terms',
        s6b: 'We may update these Terms as needed and will announce changes on this page.'
      },
      deletePage: {
        title: 'Delete Account Request',
        intro: 'This page explains how to request deletion of an account in an app operated by AppFactory. This homepage has no account of its own, so the deletion described here applies to your AppFactory app account, not a homepage account.',
        s1h: 'How to Request Deletion',
        s1b: 'To delete your account, please send a request to the email below. To help us process it, please include: the name of the app, and the email or nickname registered to the account.',
        emailSubject: 'Example subject: “[App name] account deletion request”',
        s2h: 'Data That Will Be Deleted',
        s2b: 'Once your request is confirmed, related personal information such as your account details and content you created will be deleted. Information that must be retained by law may be kept for the required period.',
        s3h: 'Processing Time',
        s3b: 'Account deletion requests are generally processed within a reasonable period (a few business days) after the request is confirmed.'
      }
    },

    /* ----------------------------- JAPANESE ----------------------------- */
    ja: {
      legal: {
        updated: '最終更新日: 2026年6月14日',
        contactHeading: 'お問い合わせ',
        contactBody: '本ポリシーに関するお問い合わせは、次のメールアドレスまでご連絡ください: '
      },
      privacyPage: {
        title: 'プライバシーポリシー',
        intro: '本プライバシーポリシーは、AppFactoryおよびAppFactoryが運営するH2Hアプリに適用されます。本ホームページ（会社紹介サイト）は会員登録・ログイン・決済・お問い合わせフォームを提供せず、訪問者から直接個人情報を収集しません。ただし、AppFactoryが運営するアプリは、その機能に応じて一部の個人情報を収集することがあります。',
        s1h: '1. 収集する情報',
        s1b: 'AppFactoryのアプリは、提供する機能に応じて次の情報を収集することがあります: アカウント情報（ニックネーム、メールなど）、利用者が入力または投稿するコンテンツ、アプリ利用に関する基本的な端末・ログ情報。各アプリは必要最小限の情報のみを収集します。',
        s2h: '2. 情報の利用目的',
        s2b: '収集した情報は、H2Hサービスの提供、利用者間の連携機能の運営、アカウント管理、安全確保と不正利用の防止、サービス改善のためにのみ利用します。',
        s3h: '3. 情報の共有',
        s3b: 'AppFactoryは利用者の個人情報を販売しません。法令により求められる場合、またはサービス運営に必要な信頼できる委託先（クラウド基盤など）を除き、第三者に提供しません。',
        s4h: '4. データの保管と削除',
        s4b: '個人情報はサービス提供に必要な期間保管され、利用者がアカウント削除を依頼した場合は関連データを削除します。削除方法はアカウント削除リクエストのページをご覧ください。',
        s5h: '5. セキュリティ',
        s5b: 'AppFactoryは利用者情報を保護するため、合理的な技術的・組織的措置を講じます。',
        s6h: '6. 子どもの個人情報',
        s6b: 'AppFactoryのアプリは、適用法令で定める最低年齢未満の子どもを対象としておらず、当該の子どもの個人情報を故意に収集しません。'
      },
      termsPage: {
        title: '利用規約',
        intro: '本規約は、AppFactoryおよびAppFactoryが運営するH2Hアプリ・サービスの利用に適用されます。サービスを利用することで、本規約に同意したものとみなされます。',
        s1h: '1. サービスについて',
        s1b: 'AppFactoryは、人と人をつなぐ自社のH2Hアプリを自ら開発・運営するサービス企業です。本ホームページは、会社とその哲学を紹介する静的サイトです。',
        s2h: '2. 利用者の責任',
        s2b: '利用者は、適用法令および本規約を遵守してサービスを利用するものとし、他者の権利を侵害したり、サービスの正常な運営を妨げたりしてはなりません。',
        s3h: '3. コンテンツ',
        s3b: 'アプリに投稿したコンテンツの責任は当該利用者にあります。AppFactoryは、コミュニティの安全のため、ポリシーに違反するコンテンツを制限することがあります。',
        s4h: '4. 知的財産権',
        s4b: 'AppFactoryの名称、ロゴ、デザインおよびサービス関連資料に関する権利はAppFactoryに帰属します。',
        s5h: '5. 責任の制限',
        s5b: 'サービスは「現状のまま」提供されます。法令が認める範囲で、AppFactoryはサービスの利用により生じた間接的な損害について責任を負いません。',
        s6h: '6. 規約の変更',
        s6b: '本規約は必要に応じて変更されることがあり、変更時は本ページにてお知らせします。'
      },
      deletePage: {
        title: 'アカウント削除リクエスト',
        intro: '本ページは、AppFactoryが運営するアプリのアカウント削除リクエストのご案内です。本ホームページには独自のアカウントがないため、ここで説明する削除はホームページのアカウントではなく、AppFactoryアプリのアカウントに関するものです。',
        s1h: '削除のリクエスト方法',
        s1b: 'アカウント削除をご希望の場合は、下記メールアドレスまでリクエストをお送りください。処理のため、対象アプリ名、アカウントに登録されたメールまたはニックネームを併せてお知らせいただけると助かります。',
        emailSubject: '件名の例: 「［アプリ名］アカウント削除リクエスト」',
        s2h: '削除されるデータ',
        s2b: 'リクエストが確認されると、アカウント情報や利用者が作成したコンテンツなどの関連個人情報が削除されます。法令上保管が必要な情報は、所定の期間保管される場合があります。',
        s3h: '処理期間',
        s3b: 'アカウント削除リクエストは、通常、リクエスト確認後の合理的な期間（数営業日）内に処理されます。'
      }
    },

    /* ----------------------------- VIETNAMESE ----------------------------- */
    vi: {
      legal: {
        updated: 'Cập nhật lần cuối: 14 tháng 6, 2026',
        contactHeading: 'Liên hệ',
        contactBody: 'Mọi thắc mắc về chính sách này, vui lòng gửi email tới: '
      },
      privacyPage: {
        title: 'Chính sách quyền riêng tư',
        intro: 'Chính sách quyền riêng tư này áp dụng cho AppFactory và các ứng dụng H2H do AppFactory vận hành. Trang chủ này (website giới thiệu công ty) không có đăng ký, đăng nhập, thanh toán hay biểu mẫu liên hệ, và không thu thập thông tin cá nhân trực tiếp từ khách truy cập. Tuy nhiên, các ứng dụng do AppFactory vận hành có thể thu thập một số thông tin cá nhân tùy theo tính năng của từng ứng dụng.',
        s1h: '1. Thông tin chúng tôi thu thập',
        s1b: 'Tùy theo tính năng cung cấp, ứng dụng của AppFactory có thể thu thập: thông tin tài khoản (như biệt danh, email), nội dung bạn nhập hoặc đăng tải, và thông tin cơ bản về thiết bị và nhật ký liên quan đến việc sử dụng ứng dụng. Mỗi ứng dụng chỉ thu thập thông tin tối thiểu cần thiết.',
        s2h: '2. Cách chúng tôi sử dụng thông tin',
        s2b: 'Thông tin thu thập chỉ được dùng để cung cấp dịch vụ H2H, vận hành các tính năng kết nối giữa người dùng, quản lý tài khoản, đảm bảo an toàn và ngăn chặn lạm dụng, và cải thiện dịch vụ.',
        s3h: '3. Chia sẻ thông tin',
        s3b: 'AppFactory không bán thông tin cá nhân của bạn. Chúng tôi không chia sẻ cho bên thứ ba, trừ khi pháp luật yêu cầu hoặc với các đơn vị xử lý đáng tin cậy cần thiết để vận hành dịch vụ (như nhà cung cấp hạ tầng đám mây).',
        s4h: '4. Lưu trữ & xóa dữ liệu',
        s4b: 'Thông tin cá nhân được lưu trong thời gian cần thiết để cung cấp dịch vụ. Khi bạn yêu cầu xóa tài khoản, chúng tôi sẽ xóa dữ liệu liên quan. Xem trang Yêu cầu xóa tài khoản để biết cách thực hiện.',
        s5h: '5. Bảo mật',
        s5b: 'AppFactory áp dụng các biện pháp bảo vệ kỹ thuật và tổ chức hợp lý để bảo vệ thông tin người dùng.',
        s6h: '6. Quyền riêng tư của trẻ em',
        s6b: 'Ứng dụng của AppFactory không hướng đến trẻ em dưới độ tuổi tối thiểu theo luật hiện hành, và chúng tôi không cố ý thu thập thông tin cá nhân của những trẻ em đó.'
      },
      termsPage: {
        title: 'Điều khoản dịch vụ',
        intro: 'Các điều khoản này áp dụng cho việc sử dụng AppFactory và các ứng dụng, dịch vụ H2H do AppFactory vận hành. Bằng việc sử dụng dịch vụ, bạn đồng ý với các điều khoản này.',
        s1h: '1. Về dịch vụ',
        s1b: 'AppFactory là công ty dịch vụ tự xây dựng và vận hành các ứng dụng H2H kết nối con người. Trang chủ này là website tĩnh giới thiệu công ty và triết lý của công ty.',
        s2h: '2. Trách nhiệm của người dùng',
        s2b: 'Bạn phải sử dụng dịch vụ tuân thủ pháp luật hiện hành và các điều khoản này, không được xâm phạm quyền của người khác hay cản trở hoạt động bình thường của dịch vụ.',
        s3h: '3. Nội dung',
        s3b: 'Bạn chịu trách nhiệm về nội dung bạn đăng trong ứng dụng. AppFactory có thể hạn chế nội dung vi phạm chính sách để giữ an toàn cho cộng đồng.',
        s4h: '4. Sở hữu trí tuệ',
        s4b: 'Quyền đối với tên gọi, logo, thiết kế và tài liệu dịch vụ của AppFactory thuộc về AppFactory.',
        s5h: '5. Giới hạn trách nhiệm',
        s5b: 'Dịch vụ được cung cấp “nguyên trạng”. Trong phạm vi pháp luật cho phép, AppFactory không chịu trách nhiệm cho các thiệt hại gián tiếp phát sinh từ việc sử dụng dịch vụ.',
        s6h: '6. Thay đổi điều khoản',
        s6b: 'Chúng tôi có thể cập nhật các điều khoản này khi cần và sẽ thông báo thay đổi trên trang này.'
      },
      deletePage: {
        title: 'Yêu cầu xóa tài khoản',
        intro: 'Trang này hướng dẫn cách yêu cầu xóa tài khoản trong ứng dụng do AppFactory vận hành. Trang chủ này không có tài khoản riêng, nên việc xóa được mô tả ở đây áp dụng cho tài khoản ứng dụng AppFactory của bạn, không phải tài khoản trang chủ.',
        s1h: 'Cách yêu cầu xóa',
        s1b: 'Để xóa tài khoản, vui lòng gửi yêu cầu tới email bên dưới. Để giúp chúng tôi xử lý, vui lòng kèm theo: tên ứng dụng, và email hoặc biệt danh đã đăng ký cho tài khoản.',
        emailSubject: 'Ví dụ tiêu đề: “Yêu cầu xóa tài khoản [Tên ứng dụng]”',
        s2h: 'Dữ liệu sẽ bị xóa',
        s2b: 'Khi yêu cầu được xác nhận, các thông tin cá nhân liên quan như chi tiết tài khoản và nội dung bạn tạo sẽ bị xóa. Thông tin bắt buộc lưu giữ theo luật có thể được giữ trong thời hạn quy định.',
        s3h: 'Thời gian xử lý',
        s3b: 'Yêu cầu xóa tài khoản thường được xử lý trong một khoảng thời gian hợp lý (vài ngày làm việc) sau khi yêu cầu được xác nhận.'
      }
    }
  });

  /* Expose the canonical contact email for any page that needs it. */
  window.AF_EMAIL = EMAIL;
})();
