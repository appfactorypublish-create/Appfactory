/* =========================================================================
   AppFactory — App-specific policy system
   Data-driven renderer for per-app Privacy / Terms / Delete Account pages
   and the app policy hub (apps.html). Reuses the shared i18n language state
   (window.AF) and re-renders whenever the language changes.

   NOTE: These policy texts are general drafts to help prepare app store
   submissions. They are not legal advice.
   ========================================================================= */
(function () {
  'use strict';

  var EMAIL = 'appfactory.publish@gmail.com';
  var UPDATED = '2026-06-14';

  /* ---- Per-language common labels & section text ------------------------ */
  var T = {
    ko: {
      hubBack: '← 정책 허브',
      home: '← 홈으로',
      updated: '최종 업데이트: 2026년 6월 14일',
      privacyTitle: '개인정보 처리방침',
      termsTitle: '이용약관',
      deleteTitle: '계정 삭제 요청',
      collectLabel: '수집 가능 정보',
      purposeLabel: '이용 목적',
      noteLabel: '중요 안내',
      pIntro: '본 개인정보 처리방침은 AppFactory가 직접 만들고 운영하는 {app} 앱에 적용됩니다. AppFactory는 외주 개발사가 아니라 자체 H2H 앱을 운영하는 서비스 회사입니다.',
      pCollectLead: '{app} 앱은 제공하는 기능에 따라 다음과 같은 정보를 수집할 수 있습니다.',
      pUseLead: '수집된 정보는 다음 목적으로만 이용됩니다.',
      pThirdH: '제3자 서비스',
      pThirdB: '본 앱은 서비스 제공을 위해 Firebase, Google Play Services, Apple App Store, Cloudflare Pages, 분석(Analytics) 등 신뢰할 수 있는 제3자 서비스를 사용할 수 있습니다. 각 서비스는 자체 정책에 따라 데이터를 처리합니다.',
      pRightsH: '이용자의 권리',
      pRightsB: '이용자는 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다. 요청은 아래 이메일로 보내주세요.',
      pRetentionH: '보관 및 삭제',
      pRetentionB: '개인정보는 서비스 제공에 필요한 기간 동안 보관되며, 이용자가 삭제를 요청하면 관련 데이터를 삭제합니다. 단, 법령상 보관이 요구되는 정보는 해당 기간 동안 보관될 수 있습니다.',
      pChildrenH: '아동의 개인정보',
      pChildrenB: '본 앱은 관련 법령에서 정한 최소 연령 미만의 아동을 대상으로 하지 않으며, 해당 아동의 개인정보를 고의로 수집하지 않습니다.',
      tIntro: '본 이용약관은 AppFactory가 운영하는 {app} 앱 서비스의 이용 조건을 규정합니다. 앱을 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.',
      tServiceH: '서비스 소개',
      tServiceB: '{app}은(는) AppFactory가 직접 만들고 운영하는 H2H 앱 서비스입니다. 세부 기능은 업데이트에 따라 달라질 수 있습니다.',
      tConductH: '이용자의 책임',
      tConductB: '이용자는 불법, 허위, 사기, 모욕, 차별, 스팸, 타인의 권리를 침해하는 행위를 해서는 안 되며, 관련 법령과 본 약관을 준수하여 서비스를 이용해야 합니다.',
      tMeetH: '사용자 간 연결 시 주의',
      tMeetB: 'H2H 서비스 특성상 사용자 간 만남과 소통에는 신중함과 책임이 필요합니다. AppFactory는 사용자 간 직접적인 상호작용의 결과를 보증하지 않으며, 이용자는 안전에 유의해야 합니다.',
      tIpH: '지식재산권',
      tIpB: '서비스 및 관련 콘텐츠에 대한 지식재산권은 AppFactory 또는 정당한 권리자에게 있습니다.',
      tChangeH: '서비스 변경 및 중단',
      tChangeB: 'AppFactory는 서비스 품질 개선, 보안, 운영상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.',
      tLiabH: '책임의 한계',
      tLiabB: '서비스는 "있는 그대로" 제공되며, 법령이 허용하는 범위에서 AppFactory는 서비스 이용으로 발생하는 간접적 손해에 대해 책임을 지지 않습니다.',
      dIntro: '본 페이지는 {app} 앱의 계정 삭제 요청 안내입니다. AppFactory 홈페이지에는 별도의 계정이 없으므로, 여기서 안내하는 삭제는 {app} 앱 계정에 대한 것입니다.',
      dInAppH: '앱 내에서 삭제',
      dInAppB: '앱에서 계정 삭제 기능을 제공하는 경우, 앱 안에서 직접 계정을 삭제할 수 있습니다.',
      dEmailH: '이메일로 요청',
      dEmailB: '앱 내 삭제 기능을 사용할 수 없거나 문제가 있는 경우, 아래 이메일로 계정 삭제를 요청할 수 있습니다.',
      dSubjectLabel: '제목 예시: ',
      dInfoLabel: '보내주실 정보',
      dInfo: ['앱 이름', '가입 이메일', '닉네임 또는 사용자 ID', '삭제 요청 내용'],
      dProcessH: '처리 기간',
      dProcessB: '계정 삭제 요청은 요청 확인 후 합리적인 기간 내에 처리됩니다.',
      dRetentionH: '보관 안내',
      dRetentionB: '법령 준수, 보안, 분쟁 대응, 부정 이용 방지 등을 위해 일부 기록은 일정 기간 동안 보관될 수 있습니다.',
      contactH: '문의',
      contactB: '본 정책에 대한 문의나 개인정보 관련 요청은 다음 이메일로 보내주세요: ',
      disclaimer: '본 문서는 법률 자문이 아니며, 일반적인 앱 출시 준비를 위한 초안입니다. 실제 서비스 운영 시 관련 법령에 맞게 검토하시기 바랍니다.',
      hubTitle: '앱별 정책',
      hubLead: 'AppFactory가 직접 만들고 운영하는 H2H 앱들의 정책입니다. 각 앱의 개인정보 처리방침, 이용약관, 계정 삭제 요청 안내를 앱별로 제공합니다. Google Play / Apple App Store 제출용 정책 URL로 사용할 수 있습니다.',
      hubNote: 'AppFactory 홈페이지는 회사 및 앱 소개를 위한 정적 사이트로, 회원가입·로그인·결제·게시판·댓글·문의폼이 없습니다. 문의는 이메일로만 받습니다.',
      linkPrivacy: '개인정보 처리방침',
      linkTerms: '이용약관',
      linkDelete: '계정 삭제 요청'
    },
    en: {
      hubBack: '← Policy Hub',
      home: '← Back to home',
      updated: 'Last updated: June 14, 2026',
      privacyTitle: 'Privacy Policy',
      termsTitle: 'Terms of Service',
      deleteTitle: 'Delete Account Request',
      collectLabel: 'Information that may be collected',
      purposeLabel: 'Purposes of use',
      noteLabel: 'Important notice',
      pIntro: 'This Privacy Policy applies to the {app} app, which is built and operated by AppFactory. AppFactory is not a development agency — it is a service company that operates its own H2H apps.',
      pCollectLead: 'Depending on the features it provides, the {app} app may collect the following information.',
      pUseLead: 'Collected information is used only for the following purposes.',
      pThirdH: 'Third-Party Services',
      pThirdB: 'To provide the service, this app may use trusted third-party services such as Firebase, Google Play Services, Apple App Store, Cloudflare Pages, and analytics. Each service processes data under its own policy.',
      pRightsH: 'Your Rights',
      pRightsB: 'You may request access to, correction of, or deletion of your personal information. Please send requests to the email below.',
      pRetentionH: 'Retention & Deletion',
      pRetentionB: 'Personal information is retained for as long as needed to provide the service. When you request deletion, we delete the related data, except information that must be retained by law for the required period.',
      pChildrenH: 'Children’s Privacy',
      pChildrenB: 'This app is not directed to children under the minimum age set by applicable law, and we do not knowingly collect personal information from such children.',
      tIntro: 'These Terms govern your use of the {app} app service operated by AppFactory. By using the app, you agree to these Terms.',
      tServiceH: 'About the Service',
      tServiceB: '{app} is an H2H app service built and operated by AppFactory. Specific features may change with updates.',
      tConductH: 'User Responsibilities',
      tConductB: 'You must not engage in illegal, false, fraudulent, abusive, discriminatory, spam, or rights-infringing behavior, and you must use the service in compliance with applicable law and these Terms.',
      tMeetH: 'Caution When Connecting With Others',
      tMeetB: 'Because this is an H2H service, meeting and communicating with other users requires care and responsibility. AppFactory does not guarantee the outcome of direct interactions between users; please stay safe.',
      tIpH: 'Intellectual Property',
      tIpB: 'Intellectual property rights in the service and its content belong to AppFactory or the rightful owners.',
      tChangeH: 'Changes & Suspension',
      tChangeB: 'AppFactory may modify or discontinue all or part of the service as needed for quality, security, or operational reasons.',
      tLiabH: 'Limitation of Liability',
      tLiabB: 'The service is provided “as is.” To the extent permitted by law, AppFactory is not liable for indirect damages arising from use of the service.',
      dIntro: 'This page explains how to request deletion of your {app} account. The AppFactory homepage has no account of its own, so the deletion described here applies to your {app} app account.',
      dInAppH: 'Delete In-App',
      dInAppB: 'If the app provides an in-app account deletion feature, you can delete your account directly within the app.',
      dEmailH: 'Request by Email',
      dEmailB: 'If the in-app deletion feature is unavailable or not working, you can request account deletion by email below.',
      dSubjectLabel: 'Example subject: ',
      dInfoLabel: 'Information to include',
      dInfo: ['App name', 'Sign-up email', 'Nickname or user ID', 'Your deletion request'],
      dProcessH: 'Processing Time',
      dProcessB: 'Account deletion requests are processed within a reasonable period after the request is confirmed.',
      dRetentionH: 'Retention Notice',
      dRetentionB: 'Some records may be retained for a limited period for legal compliance, security, dispute resolution, and abuse prevention.',
      contactH: 'Contact',
      contactB: 'For questions about this policy or privacy-related requests, please email: ',
      disclaimer: 'This document is not legal advice; it is a general draft to help prepare app store submissions. Please review it against applicable law for actual operation.',
      hubTitle: 'App Policies',
      hubLead: 'Policies for the H2H apps that AppFactory builds and operates. Each app has its own Privacy Policy, Terms of Service, and Delete Account guide. These can be used as policy URLs for Google Play / Apple App Store submission.',
      hubNote: 'The AppFactory homepage is a static company/app information site with no sign-up, login, payment, board, comments, or contact form. Inquiries are handled by email only.',
      linkPrivacy: 'Privacy Policy',
      linkTerms: 'Terms of Service',
      linkDelete: 'Delete Account Request'
    },
    ja: {
      hubBack: '← ポリシー一覧',
      home: '← ホームへ',
      updated: '最終更新日: 2026年6月14日',
      privacyTitle: 'プライバシーポリシー',
      termsTitle: '利用規約',
      deleteTitle: 'アカウント削除リクエスト',
      collectLabel: '収集する可能性のある情報',
      purposeLabel: '利用目的',
      noteLabel: '重要なお知らせ',
      pIntro: '本プライバシーポリシーは、AppFactoryが自ら開発・運営する{app}アプリに適用されます。AppFactoryは受託開発会社ではなく、自社のH2Hアプリを運営するサービス企業です。',
      pCollectLead: '{app}アプリは、提供する機能に応じて次の情報を収集することがあります。',
      pUseLead: '収集した情報は、次の目的のためにのみ利用します。',
      pThirdH: '第三者サービス',
      pThirdB: '本アプリはサービス提供のため、Firebase、Google Play Services、Apple App Store、Cloudflare Pages、分析（Analytics）などの信頼できる第三者サービスを利用することがあります。各サービスは自社のポリシーに従ってデータを処理します。',
      pRightsH: '利用者の権利',
      pRightsB: '利用者はご自身の個人情報の閲覧・訂正・削除を請求できます。ご請求は下記メールまでご連絡ください。',
      pRetentionH: '保管と削除',
      pRetentionB: '個人情報はサービス提供に必要な期間保管され、利用者が削除を依頼した場合は関連データを削除します。ただし、法令により保管が求められる情報は所定の期間保管される場合があります。',
      pChildrenH: '子どもの個人情報',
      pChildrenB: '本アプリは適用法令で定める最低年齢未満の子どもを対象としておらず、当該の子どもの個人情報を故意に収集しません。',
      tIntro: '本利用規約は、AppFactoryが運営する{app}アプリサービスの利用条件を定めます。アプリを利用することで、本規約に同意したものとみなされます。',
      tServiceH: 'サービスについて',
      tServiceB: '{app}は、AppFactoryが自ら開発・運営するH2Hアプリサービスです。具体的な機能は更新により変わることがあります。',
      tConductH: '利用者の責任',
      tConductB: '利用者は、違法・虚偽・詐欺・侮辱・差別・スパム・他者の権利を侵害する行為を行ってはならず、適用法令および本規約を遵守して利用するものとします。',
      tMeetH: '利用者間のつながりにおける注意',
      tMeetB: 'H2Hサービスの特性上、利用者間の出会いやコミュニケーションには慎重さと責任が必要です。AppFactoryは利用者間の直接的なやり取りの結果を保証せず、利用者は安全に十分ご留意ください。',
      tIpH: '知的財産権',
      tIpB: 'サービスおよび関連コンテンツに関する知的財産権は、AppFactoryまたは正当な権利者に帰属します。',
      tChangeH: 'サービスの変更・中止',
      tChangeB: 'AppFactoryは、品質改善・セキュリティ・運営上の必要に応じて、サービスの全部または一部を変更または中止することがあります。',
      tLiabH: '責任の制限',
      tLiabB: 'サービスは「現状のまま」提供されます。法令が認める範囲で、AppFactoryはサービスの利用により生じた間接的な損害について責任を負いません。',
      dIntro: '本ページは{app}アプリのアカウント削除リクエストのご案内です。AppFactoryホームページには独自のアカウントがないため、ここで説明する削除は{app}アプリのアカウントに関するものです。',
      dInAppH: 'アプリ内で削除',
      dInAppB: 'アプリにアカウント削除機能がある場合は、アプリ内で直接アカウントを削除できます。',
      dEmailH: 'メールでリクエスト',
      dEmailB: 'アプリ内の削除機能が利用できない、または問題がある場合は、下記メールでアカウント削除を依頼できます。',
      dSubjectLabel: '件名の例: ',
      dInfoLabel: 'お送りいただく情報',
      dInfo: ['アプリ名', '登録メールアドレス', 'ニックネームまたはユーザーID', '削除リクエストの内容'],
      dProcessH: '処理期間',
      dProcessB: 'アカウント削除リクエストは、リクエスト確認後の合理的な期間内に処理されます。',
      dRetentionH: '保管に関するお知らせ',
      dRetentionB: '法令遵守、セキュリティ、紛争対応、不正利用防止などのため、一部の記録は一定期間保管される場合があります。',
      contactH: 'お問い合わせ',
      contactB: '本ポリシーに関するお問い合わせや個人情報に関するご請求は、次のメールまでご連絡ください: ',
      disclaimer: '本書類は法的助言ではなく、一般的なアプリ提出準備のための草案です。実際の運営では適用法令に照らしてご確認ください。',
      hubTitle: 'アプリ別ポリシー',
      hubLead: 'AppFactoryが自ら開発・運営するH2Hアプリのポリシーです。各アプリのプライバシーポリシー、利用規約、アカウント削除のご案内をアプリごとに提供します。Google Play / Apple App Store提出用のポリシーURLとして利用できます。',
      hubNote: 'AppFactoryホームページは会社およびアプリ紹介のための静的サイトで、会員登録・ログイン・決済・掲示板・コメント・お問い合わせフォームはありません。お問い合わせはメールのみで受け付けます。',
      linkPrivacy: 'プライバシーポリシー',
      linkTerms: '利用規約',
      linkDelete: 'アカウント削除リクエスト'
    },
    vi: {
      hubBack: '← Trang chính sách',
      home: '← Về trang chủ',
      updated: 'Cập nhật lần cuối: 14 tháng 6, 2026',
      privacyTitle: 'Chính sách quyền riêng tư',
      termsTitle: 'Điều khoản sử dụng',
      deleteTitle: 'Yêu cầu xóa tài khoản',
      collectLabel: 'Thông tin có thể được thu thập',
      purposeLabel: 'Mục đích sử dụng',
      noteLabel: 'Lưu ý quan trọng',
      pIntro: 'Chính sách quyền riêng tư này áp dụng cho ứng dụng {app} do AppFactory tự xây dựng và vận hành. AppFactory không phải là công ty gia công — chúng tôi là công ty dịch vụ vận hành các ứng dụng H2H của riêng mình.',
      pCollectLead: 'Tùy theo tính năng cung cấp, ứng dụng {app} có thể thu thập các thông tin sau.',
      pUseLead: 'Thông tin thu thập chỉ được dùng cho các mục đích sau.',
      pThirdH: 'Dịch vụ bên thứ ba',
      pThirdB: 'Để cung cấp dịch vụ, ứng dụng có thể sử dụng các dịch vụ bên thứ ba đáng tin cậy như Firebase, Google Play Services, Apple App Store, Cloudflare Pages và phân tích (Analytics). Mỗi dịch vụ xử lý dữ liệu theo chính sách riêng của họ.',
      pRightsH: 'Quyền của người dùng',
      pRightsB: 'Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Vui lòng gửi yêu cầu tới email bên dưới.',
      pRetentionH: 'Lưu trữ & xóa',
      pRetentionB: 'Thông tin cá nhân được lưu trong thời gian cần thiết để cung cấp dịch vụ. Khi bạn yêu cầu xóa, chúng tôi sẽ xóa dữ liệu liên quan, trừ thông tin bắt buộc phải lưu theo luật trong thời hạn quy định.',
      pChildrenH: 'Quyền riêng tư của trẻ em',
      pChildrenB: 'Ứng dụng không hướng đến trẻ em dưới độ tuổi tối thiểu theo luật hiện hành và chúng tôi không cố ý thu thập thông tin cá nhân của những trẻ em đó.',
      tIntro: 'Các điều khoản này điều chỉnh việc bạn sử dụng dịch vụ ứng dụng {app} do AppFactory vận hành. Bằng việc sử dụng ứng dụng, bạn đồng ý với các điều khoản này.',
      tServiceH: 'Về dịch vụ',
      tServiceB: '{app} là dịch vụ ứng dụng H2H do AppFactory tự xây dựng và vận hành. Các tính năng cụ thể có thể thay đổi theo bản cập nhật.',
      tConductH: 'Trách nhiệm của người dùng',
      tConductB: 'Bạn không được thực hiện các hành vi bất hợp pháp, sai sự thật, lừa đảo, lăng mạ, phân biệt đối xử, spam hoặc xâm phạm quyền của người khác, và phải tuân thủ pháp luật hiện hành cùng các điều khoản này.',
      tMeetH: 'Lưu ý khi kết nối với người khác',
      tMeetB: 'Do đặc thù của dịch vụ H2H, việc gặp gỡ và giao tiếp giữa người dùng đòi hỏi sự thận trọng và trách nhiệm. AppFactory không bảo đảm kết quả của những tương tác trực tiếp giữa người dùng; vui lòng giữ an toàn.',
      tIpH: 'Sở hữu trí tuệ',
      tIpB: 'Quyền sở hữu trí tuệ đối với dịch vụ và nội dung liên quan thuộc về AppFactory hoặc chủ sở hữu hợp pháp.',
      tChangeH: 'Thay đổi & tạm ngừng',
      tChangeB: 'AppFactory có thể thay đổi hoặc ngừng toàn bộ hoặc một phần dịch vụ khi cần vì chất lượng, bảo mật hoặc lý do vận hành.',
      tLiabH: 'Giới hạn trách nhiệm',
      tLiabB: 'Dịch vụ được cung cấp “nguyên trạng”. Trong phạm vi pháp luật cho phép, AppFactory không chịu trách nhiệm cho các thiệt hại gián tiếp phát sinh từ việc sử dụng dịch vụ.',
      dIntro: 'Trang này hướng dẫn cách yêu cầu xóa tài khoản {app} của bạn. Trang chủ AppFactory không có tài khoản riêng, nên việc xóa mô tả ở đây áp dụng cho tài khoản ứng dụng {app} của bạn.',
      dInAppH: 'Xóa trong ứng dụng',
      dInAppB: 'Nếu ứng dụng có tính năng xóa tài khoản trong ứng dụng, bạn có thể xóa tài khoản trực tiếp trong ứng dụng.',
      dEmailH: 'Yêu cầu qua email',
      dEmailB: 'Nếu tính năng xóa trong ứng dụng không khả dụng hoặc gặp sự cố, bạn có thể yêu cầu xóa tài khoản qua email bên dưới.',
      dSubjectLabel: 'Ví dụ tiêu đề: ',
      dInfoLabel: 'Thông tin cần gửi',
      dInfo: ['Tên ứng dụng', 'Email đăng ký', 'Biệt danh hoặc ID người dùng', 'Nội dung yêu cầu xóa'],
      dProcessH: 'Thời gian xử lý',
      dProcessB: 'Yêu cầu xóa tài khoản được xử lý trong một khoảng thời gian hợp lý sau khi yêu cầu được xác nhận.',
      dRetentionH: 'Thông báo lưu trữ',
      dRetentionB: 'Một số hồ sơ có thể được lưu trong thời gian giới hạn để tuân thủ pháp luật, bảo mật, giải quyết tranh chấp và ngăn chặn lạm dụng.',
      contactH: 'Liên hệ',
      contactB: 'Mọi thắc mắc về chính sách này hoặc yêu cầu liên quan đến quyền riêng tư, vui lòng gửi email tới: ',
      disclaimer: 'Tài liệu này không phải là tư vấn pháp lý; đây là bản nháp chung giúp chuẩn bị nộp lên app store. Vui lòng rà soát theo luật hiện hành khi vận hành thực tế.',
      hubTitle: 'Chính sách theo ứng dụng',
      hubLead: 'Chính sách cho các ứng dụng H2H do AppFactory tự xây dựng và vận hành. Mỗi ứng dụng có Chính sách quyền riêng tư, Điều khoản sử dụng và hướng dẫn Xóa tài khoản riêng. Có thể dùng làm URL chính sách để nộp lên Google Play / Apple App Store.',
      hubNote: 'Trang chủ AppFactory là website tĩnh giới thiệu công ty và ứng dụng, không có đăng ký, đăng nhập, thanh toán, diễn đàn, bình luận hay biểu mẫu liên hệ. Mọi liên hệ chỉ qua email.',
      linkPrivacy: 'Chính sách quyền riêng tư',
      linkTerms: 'Điều khoản sử dụng',
      linkDelete: 'Yêu cầu xóa tài khoản'
    }
  };

  /* ---- Per-app data ----------------------------------------------------- */
  var APPS = {
    's-partner': {
      id: 's-partner', name: 'S Partner', matching: true,
      subject: 'Account Deletion Request - S Partner',
      slug: { privacy: 's-partner-privacy', terms: 's-partner-terms', del: 's-partner-delete-account' },
      desc: {
        ko: '스포츠 파트너와 운동 모임을 잇는 H2H 매칭 앱',
        en: 'An H2H matching app connecting sports partners and workout meetups',
        ja: 'スポーツパートナーや運動仲間をつなぐH2Hマッチングアプリ',
        vi: 'Ứng dụng kết nối H2H cho bạn tập thể thao và nhóm vận động'
      },
      collected: {
        ko: ['이메일 또는 로그인 정보', '닉네임', '프로필 사진', '운동 종목', '활동 지역', '자기소개', '파트너 모집 게시글', '외부 메신저 연결 정보(예: 카카오 오픈프로필, 텔레그램 링크)', '앱 사용 기록', '신고 및 문의 내용', '기기 및 로그 정보'],
        en: ['Email or login information', 'Nickname', 'Profile photo', 'Sport / activity type', 'Activity area', 'Self-introduction', 'Partner recruitment posts', 'External messenger links (e.g., KakaoTalk open profile, Telegram link)', 'App usage records', 'Reports and inquiries', 'Device and log information'],
        ja: ['メールまたはログイン情報', 'ニックネーム', 'プロフィール写真', '運動種目', '活動地域', '自己紹介', 'パートナー募集の投稿', '外部メッセンジャーの連絡先（例: カカオオープンプロフィール、テレグラムのリンク）', 'アプリ利用履歴', '通報・問い合わせ内容', '端末およびログ情報'],
        vi: ['Email hoặc thông tin đăng nhập', 'Biệt danh', 'Ảnh hồ sơ', 'Môn thể thao', 'Khu vực hoạt động', 'Giới thiệu bản thân', 'Bài đăng tìm bạn tập', 'Liên kết messenger bên ngoài (vd: KakaoTalk open profile, link Telegram)', 'Lịch sử sử dụng ứng dụng', 'Nội dung báo cáo và liên hệ', 'Thông tin thiết bị và nhật ký']
      },
      purposes: {
        ko: ['스포츠 파트너 매칭', '모집 게시글 표시', '사용자 프로필 제공', '안전한 서비스 운영', '신고 및 문의 대응', '서비스 개선'],
        en: ['Matching sports partners', 'Displaying recruitment posts', 'Providing user profiles', 'Operating the service safely', 'Handling reports and inquiries', 'Improving the service'],
        ja: ['スポーツパートナーのマッチング', '募集投稿の表示', 'ユーザープロフィールの提供', '安全なサービス運営', '通報・問い合わせ対応', 'サービス改善'],
        vi: ['Ghép bạn tập thể thao', 'Hiển thị bài đăng tuyển', 'Cung cấp hồ sơ người dùng', 'Vận hành dịch vụ an toàn', 'Xử lý báo cáo và liên hệ', 'Cải thiện dịch vụ']
      },
      notes: {
        ko: ['본 앱은 앱 내 직접 채팅을 제공하지 않으며, 사용자가 입력한 외부 연락 링크(예: 카카오 오픈프로필, 텔레그램)를 통해 사용자 간 연결이 이루어질 수 있습니다. 외부 서비스 이용 시 해당 서비스의 정책이 적용됩니다.'],
        en: ['This app does not provide in-app direct chat. Users may be connected through external contact links they enter (e.g., KakaoTalk open profile, Telegram). When you use an external service, that service’s policy applies.'],
        ja: ['本アプリはアプリ内の直接チャットを提供せず、利用者が入力した外部連絡リンク（例: カカオオープンプロフィール、テレグラム）を通じて利用者同士がつながる場合があります。外部サービスの利用時には当該サービスのポリシーが適用されます。'],
        vi: ['Ứng dụng không cung cấp trò chuyện trực tiếp trong ứng dụng. Người dùng có thể được kết nối qua các liên kết liên hệ bên ngoài do họ nhập (vd: KakaoTalk open profile, Telegram). Khi dùng dịch vụ bên ngoài, chính sách của dịch vụ đó được áp dụng.']
      }
    },

    'mbti': {
      id: 'mbti', name: 'MBTI Swipe', matching: false,
      subject: 'Account Deletion Request - MBTI Swipe',
      slug: { privacy: 'mbti-privacy', terms: 'mbti-terms', del: 'mbti-delete-account' },
      desc: {
        ko: '상황 카드 기반의 성향 테스트 · 엔터테인먼트 앱',
        en: 'A situation-card based personality test / entertainment app',
        ja: 'シチュエーションカード型の性格テスト・エンタメアプリ',
        vi: 'Ứng dụng trắc nghiệm tính cách / giải trí dựa trên thẻ tình huống'
      },
      collected: {
        ko: ['테스트 응답', '결과 유형', '언어 설정', '앱 사용 기록', '기기 및 로그 정보'],
        en: ['Test responses', 'Result type', 'Language setting', 'App usage records', 'Device and log information'],
        ja: ['テストの回答', '結果タイプ', '言語設定', 'アプリ利用履歴', '端末およびログ情報'],
        vi: ['Câu trả lời bài test', 'Loại kết quả', 'Cài đặt ngôn ngữ', 'Lịch sử sử dụng ứng dụng', 'Thông tin thiết bị và nhật ký']
      },
      purposes: {
        ko: ['성향 테스트 결과 제공', '콘텐츠 추천 및 테스트 개선', '서비스 안정성 개선', '오류 분석'],
        en: ['Providing personality test results', 'Recommending content and improving tests', 'Improving service stability', 'Error analysis'],
        ja: ['性格テスト結果の提供', 'コンテンツのおすすめとテスト改善', 'サービス安定性の改善', 'エラー分析'],
        vi: ['Cung cấp kết quả trắc nghiệm tính cách', 'Gợi ý nội dung và cải thiện bài test', 'Cải thiện độ ổn định dịch vụ', 'Phân tích lỗi']
      },
      notes: {
        ko: ['본 앱은 의학적·심리학적 진단을 제공하지 않으며, 엔터테인먼트 및 자기 이해를 위한 콘텐츠입니다.', '현재 광고/분석 식별자를 사용하지 않을 수 있으나, 서비스 개선을 위해 향후 사용할 수 있습니다.'],
        en: ['This app does not provide medical or psychological diagnosis; it is content for entertainment and self-understanding.', 'Advertising/analytics identifiers may not be used at present, but may be used in the future to improve the service.'],
        ja: ['本アプリは医学的・心理学的な診断を提供せず、エンターテインメントおよび自己理解のためのコンテンツです。', '現在は広告・分析用の識別子を使用していない場合がありますが、サービス改善のため将来使用する可能性があります。'],
        vi: ['Ứng dụng không cung cấp chẩn đoán y tế hay tâm lý; đây là nội dung mang tính giải trí và tự hiểu bản thân.', 'Hiện tại có thể không sử dụng mã nhận dạng quảng cáo/phân tích, nhưng có thể sử dụng trong tương lai để cải thiện dịch vụ.']
      }
    },

    'pickleball': {
      id: 'pickleball', name: 'Pickleball Partner Match', matching: true,
      subject: 'Account Deletion Request - Pickleball Partner Match',
      slug: { privacy: 'pickleball-privacy', terms: 'pickleball-terms', del: 'pickleball-delete-account' },
      desc: {
        ko: '피클볼을 즐기는 사람들을 잇는 H2H 매칭 앱',
        en: 'An H2H matching app connecting pickleball players',
        ja: 'ピックルボールを楽しむ人々をつなぐH2Hマッチングアプリ',
        vi: 'Ứng dụng kết nối H2H cho người chơi pickleball'
      },
      collected: {
        ko: ['이메일 또는 로그인 정보', '닉네임', '프로필 사진', '활동 지역', '경기 수준', '선호 시간대', '파트너 모집 게시글', '외부 연락 링크', '신고 및 문의 내용', '앱 사용 기록', '기기 및 로그 정보'],
        en: ['Email or login information', 'Nickname', 'Profile photo', 'Activity area', 'Play level', 'Preferred time slots', 'Partner recruitment posts', 'External contact links', 'Reports and inquiries', 'App usage records', 'Device and log information'],
        ja: ['メールまたはログイン情報', 'ニックネーム', 'プロフィール写真', '活動地域', 'プレーレベル', '希望する時間帯', 'パートナー募集の投稿', '外部連絡リンク', '通報・問い合わせ内容', 'アプリ利用履歴', '端末およびログ情報'],
        vi: ['Email hoặc thông tin đăng nhập', 'Biệt danh', 'Ảnh hồ sơ', 'Khu vực hoạt động', 'Trình độ chơi', 'Khung giờ ưa thích', 'Bài đăng tìm bạn chơi', 'Liên kết liên hệ bên ngoài', 'Nội dung báo cáo và liên hệ', 'Lịch sử sử dụng ứng dụng', 'Thông tin thiết bị và nhật ký']
      },
      purposes: {
        ko: ['피클볼 파트너 매칭', '모임 및 게시글 표시', '사용자 안전', '신고 및 문의 대응', '서비스 개선'],
        en: ['Matching pickleball partners', 'Displaying meetups and posts', 'User safety', 'Handling reports and inquiries', 'Improving the service'],
        ja: ['ピックルボールのパートナーマッチング', '集まり・投稿の表示', 'ユーザーの安全', '通報・問い合わせ対応', 'サービス改善'],
        vi: ['Ghép bạn chơi pickleball', 'Hiển thị buổi gặp và bài đăng', 'An toàn người dùng', 'Xử lý báo cáo và liên hệ', 'Cải thiện dịch vụ']
      },
      notes: {
        ko: ['본 앱은 사용자가 입력한 외부 연락 링크를 통해 사용자 간 연결이 이루어질 수 있습니다. 외부 서비스 이용 시 해당 서비스의 정책이 적용됩니다.'],
        en: ['Users may be connected through external contact links they enter. When you use an external service, that service’s policy applies.'],
        ja: ['本アプリは利用者が入力した外部連絡リンクを通じて利用者同士がつながる場合があります。外部サービスの利用時には当該サービスのポリシーが適用されます。'],
        vi: ['Người dùng có thể được kết nối qua các liên kết liên hệ bên ngoài do họ nhập. Khi dùng dịch vụ bên ngoài, chính sách của dịch vụ đó được áp dụng.']
      }
    }
  };

  var APP_ORDER = ['s-partner', 'mbti', 'pickleball'];

  /* ---- HTML helpers ----------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function tpl(str, app) { return esc(str).replace(/\{app\}/g, esc(app)); }
  function ul(items) {
    return '<ul class="pol-list">' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }
  function h2(t) { return '<h2>' + esc(t) + '</h2>'; }
  function p(t) { return '<p>' + esc(t) + '</p>'; }
  function sublabel(t) { return '<p class="pol-sublabel">' + esc(t) + '</p>'; }
  function emailLink() { return '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>'; }
  function contactBlock(t) {
    return '<div class="callout"><h2 class="mt-0">' + esc(t.contactH) + '</h2>' +
      '<p class="email-line"><span>' + esc(t.contactB) + '</span>' + emailLink() + '</p></div>';
  }
  function disclaimerBlock(t) {
    return '<p class="pol-disclaimer">' + esc(t.disclaimer) + '</p>';
  }

  /* ---- Builders --------------------------------------------------------- */
  function buildPrivacy(app, lang) {
    var t = T[lang], html = '';
    html += '<p class="intro">' + tpl(t.pIntro, app.name) + '</p>';
    html += h2(t.collectLabel) + p(tpl(t.pCollectLead, app.name)) + ul(app.collected[lang]);
    html += h2(t.purposeLabel) + p(t.pUseLead) + ul(app.purposes[lang]);
    (app.notes[lang] || []).forEach(function (n) {
      html += '<div class="callout"><p class="pol-note"><strong>' + esc(t.noteLabel) + ':</strong> ' + esc(n) + '</p></div>';
    });
    html += h2(t.pThirdH) + p(t.pThirdB);
    html += h2(t.pRightsH) + p(t.pRightsB);
    html += h2(t.pRetentionH) + p(t.pRetentionB);
    html += h2(t.pChildrenH) + p(t.pChildrenB);
    html += contactBlock(t);
    html += disclaimerBlock(t);
    return html;
  }

  function buildTerms(app, lang) {
    var t = T[lang], html = '';
    html += '<p class="intro">' + tpl(t.tIntro, app.name) + '</p>';
    html += h2(t.tServiceH) + p(tpl(t.tServiceB, app.name));
    html += h2(t.tConductH) + p(t.tConductB);
    if (app.matching) html += h2(t.tMeetH) + p(t.tMeetB);
    html += h2(t.tIpH) + p(t.tIpB);
    html += h2(t.tChangeH) + p(t.tChangeB);
    html += h2(t.tLiabH) + p(t.tLiabB);
    html += contactBlock(t);
    html += disclaimerBlock(t);
    return html;
  }

  function buildDelete(app, lang) {
    var t = T[lang], html = '';
    html += '<p class="intro">' + tpl(t.dIntro, app.name) + '</p>';
    html += h2(t.dInAppH) + p(t.dInAppB);
    html += h2(t.dEmailH) + p(t.dEmailB);
    html += '<div class="callout">' +
      '<p class="email-line mb-8"><span>' + esc(t.contactB) + '</span>' + emailLink() + '</p>' +
      '<p class="subject-hint pol-subject">' + esc(t.dSubjectLabel) + '“' + esc(app.subject) + '”</p>' +
      sublabel(t.dInfoLabel) + ul(t.dInfo) +
      '</div>';
    html += h2(t.dProcessH) + p(t.dProcessB);
    html += h2(t.dRetentionH) + p(t.dRetentionB);
    html += contactBlock(t);
    html += disclaimerBlock(t);
    return html;
  }

  var BUILDERS = { privacy: buildPrivacy, terms: buildTerms, del: buildDelete };
  var TITLES = { privacy: 'privacyTitle', terms: 'termsTitle', del: 'deleteTitle' };

  /* ---- Render a single app policy page ---------------------------------- */
  function renderPolicyPage(lang) {
    var body = document.querySelector('[data-app]');
    if (!body) return;
    var appId = body.getAttribute('data-app');
    var type = body.getAttribute('data-type'); // privacy | terms | del
    var app = APPS[appId];
    if (!app || !BUILDERS[type]) return;
    var t = T[lang] || T.en;

    var title = app.name + ' — ' + t[TITLES[type]];
    document.title = title + ' | AppFactory';

    var h1 = document.querySelector('[data-policy-title]');
    if (h1) h1.textContent = app.name + ' ' + t[TITLES[type]];
    var sub = document.querySelector('[data-policy-app]');
    if (sub) sub.textContent = app.desc[lang] || app.desc.en;
    var up = document.querySelector('[data-policy-updated]');
    if (up) up.textContent = t.updated;
    var back = document.querySelector('[data-policy-back]');
    if (back) back.textContent = t.hubBack;

    var container = document.querySelector('[data-policy-body]');
    if (container) container.innerHTML = BUILDERS[type](app, lang);
  }

  /* ---- Render the app policy hub (apps.html) ---------------------------- */
  function renderHub(lang) {
    var host = document.querySelector('[data-app-hub]');
    if (!host) return;
    var t = T[lang] || T.en;

    var head = document.querySelector('[data-hub-title]');
    if (head) head.textContent = t.hubTitle;
    var lead = document.querySelector('[data-hub-lead]');
    if (lead) lead.textContent = t.hubLead;
    var note = document.querySelector('[data-hub-note]');
    if (note) note.textContent = t.hubNote;
    document.title = t.hubTitle + ' | AppFactory';

    var html = '';
    APP_ORDER.forEach(function (id) {
      var app = APPS[id];
      html += '<article class="app-card">' +
        '<h3 class="app-card-name">' + esc(app.name) + '</h3>' +
        '<p class="app-card-desc">' + esc(app.desc[lang] || app.desc.en) + '</p>' +
        '<div class="app-card-links">' +
          '<a href="/apps/' + id + '/privacy">' + esc(t.linkPrivacy) + '</a>' +
          '<a href="/apps/' + id + '/terms">' + esc(t.linkTerms) + '</a>' +
          '<a href="/apps/' + id + '/delete-account">' + esc(t.linkDelete) + '</a>' +
        '</div>' +
      '</article>';
    });
    host.innerHTML = html;
  }

  function renderAll(lang) {
    renderPolicyPage(lang);
    renderHub(lang);
  }

  /* ---- Hook into the shared language state ------------------------------ */
  function currentLang() {
    try { return (window.AF && window.AF.getLang) ? window.AF.getLang() : 'en'; } catch (e) { return 'en'; }
  }
  window.addEventListener('af:lang', function (e) { renderAll((e && e.detail) || currentLang()); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { renderAll(currentLang()); });
  } else {
    renderAll(currentLang());
  }
})();
