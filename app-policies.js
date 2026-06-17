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

  var EMAIL = 'connect@appfactory.vn';
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
      tPaymentH: '결제 및 유료 기능',
      tPaymentB: '일부 앱 또는 향후 기능에는 유료 서비스가 포함될 수 있으며, 결제 조건은 해당 앱 또는 스토어 화면에서 별도로 안내됩니다.',
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
      hubLead: 'AppFactory는 자체 H2H 앱 서비스를 운영합니다. 각 앱은 기능과 운영 방식에 따라 개인정보 처리 항목과 이용 조건이 다를 수 있으므로, 아래에서 앱별 개인정보 처리방침과 이용약관을 확인할 수 있습니다.',
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
      tPaymentH: 'Payments & Paid Features',
      tPaymentB: 'Some apps or future features may include paid services. Where they apply, payment terms are provided separately within the relevant app or on the app store screen.',
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
      hubLead: 'AppFactory operates its own H2H app services. Each app may have different data practices, payment conditions, and service rules depending on its features and operation. You can review each app’s Privacy Policy and Terms of Service below.',
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
      tPaymentH: '決済・有料機能',
      tPaymentB: '一部のアプリや今後の機能には有料サービスが含まれる場合があり、決済条件は該当アプリまたはストア画面で別途ご案内します。',
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
      hubLead: 'AppFactoryは独自のH2Hアプリサービスを運営しています。各アプリは機能や運営方式によって、個人情報の取り扱いや利用条件が異なる場合があります。以下からアプリ別のプライバシーポリシーと利用規約をご確認いただけます。',
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
      tPaymentH: 'Thanh toán & tính năng trả phí',
      tPaymentB: 'Một số ứng dụng hoặc tính năng trong tương lai có thể bao gồm dịch vụ trả phí; khi áp dụng, điều kiện thanh toán được hướng dẫn riêng trong ứng dụng liên quan hoặc trên màn hình app store.',
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
      hubLead: 'AppFactory vận hành các dịch vụ ứng dụng H2H riêng. Tùy theo tính năng và cách vận hành, mỗi ứng dụng có thể có chính sách xử lý dữ liệu, điều kiện thanh toán và quy tắc sử dụng khác nhau. Bạn có thể xem Chính sách quyền riêng tư và Điều khoản sử dụng của từng ứng dụng bên dưới.',
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
      // Full, formal Korean privacy policy (Korean PIPA-based). This is an
      // authoritative legal document and overrides the generic privacy
      // template for every language (S Partner targets Korean users).
      privacyDoc: {
        title: '에스 파트너매치(Sports PartnerMatch) 개인정보 처리방침',
        effective: '시행일자: 2026년 7월 1일',
        render: sPartnerPrivacyKo
      },
      termsDoc: {
        title: '에스 파트너매치(Sports PartnerMatch) 서비스 이용약관',
        effective: '시행일자: 2026년 7월 1일',
        render: sPartnerTermsKo
      },
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
    }
  };

  var APP_ORDER = ['s-partner', 'mbti'];

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

  /* ---- S Partner: full formal Korean privacy policy --------------------- */
  function sPartnerPrivacyKo() {
    return '' +
      '<h2>제1조 (목적)</h2>' +
      '<p>APPFACTORY VIETNAM CO., LTD.(이하 "회사"라 합니다)은 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 개인정보 보호법 제30조에 따라 다음과 같이 개인정보 처리방침을 수립·공개합니다. 회사는 대한민국 이용자를 대상으로 "에스 파트너매치(Sports PartnerMatch)" 서비스를 제공하며, 베트남에 소재한 법인으로서 대한민국 개인정보 보호법을 준수합니다.</p>' +

      '<h2>제2조 (수집하는 개인정보의 항목 및 수집방법)</h2>' +
      '<p>회사는 회원가입, 원활한 고객 상담, 각종 서비스 제공을 위해 서비스 이용 초기 단계 및 이용 과정에서 아래와 같은 개인정보를 수집하고 있습니다.</p>' +
      '<p class="pol-sublabel">수집 항목</p>' +
      '<ul class="pol-list">' +
        '<li><strong>필수 항목:</strong> 이메일 주소, 비밀번호(자체 가입 시), 닉네임, 생년월일, 성별, 프로필 사진(최소 1장 이상)</li>' +
        '<li><strong>소셜 연동 가입 시 수집 항목:</strong> (카카오/구글) 계정 고유 식별자, 프로필 정보(이름, 프로필 사진)</li>' +
        '<li><strong>선택 항목(매칭 정확도 향상 목적):</strong> 키, 체형, 직업, 학력, 흡연/음주 여부, 운동 종목·관심사, 자기소개 문구</li>' +
      '</ul>' +
      '<p class="pol-sublabel">서비스 이용 과정에서 자동 생성 및 수집될 수 있는 항목</p>' +
      '<ul class="pol-list">' +
        '<li>기기 식별자(UUID, ADID/IDFA), OS 버전, 단말기 모델명, IP 주소, 쿠키, 서비스 이용 기록, 불량 이용 기록</li>' +
      '</ul>' +
      '<p class="pol-sublabel">기기 권한을 통한 수집 항목</p>' +
      '<ul class="pol-list">' +
        '<li><strong>위치 정보:</strong> 위치기반 매칭 기능 활성화 시, 단말기의 GPS 및 Wi-Fi 정보를 통한 실시간 위치 정보</li>' +
        '<li><strong>카메라 및 갤러리(저장공간):</strong> 프로필 사진 등록 및 매칭 상대방과의 채팅 내 이미지 전송 시 접근</li>' +
      '</ul>' +

      '<h2>제3조 (개인정보의 수집 및 이용목적)</h2>' +
      '<p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>' +
      '<ul class="pol-list">' +
        '<li><strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 만 14세 미만 아동의 가입 제한, 고충처리 및 분쟁 조정을 위한 기록 보존</li>' +
        '<li><strong>서비스 제공:</strong> 위치 기반 맞춤형 매칭 서비스 제공, 프로필 노출, 인앱 결제 및 정기 구독 서비스 제공, 콘텐츠 구매 인증</li>' +
        '<li><strong>이용자 보호:</strong> 신고·차단 기능 운영, 부적절한 콘텐츠 및 이용자 제재, 안전한 커뮤니티 환경 유지</li>' +
        '<li><strong>신규 서비스 개발 및 마케팅(선택 동의 시):</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공</li>' +
      '</ul>' +

      '<h2>제4조 (개인정보의 처리 위탁)</h2>' +
      '<p>회사는 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리 업무를 외부 전문업체에 위탁하고 있으며, 위탁계약 체결 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.</p>' +
      '<div class="pol-table-wrap"><table class="pol-table">' +
        '<thead><tr><th>수탁업체 (위탁받는 자)</th><th>위탁 업무 내용</th><th>위탁하는 개인정보 항목</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>Google LLC (Firebase)</td><td>회원 인증, 데이터베이스(Firestore) 저장, 클라우드 기능(서버리스) 운영, 푸시 알림</td><td>제2조에 명시된 수집 항목 일체, 기기 식별자, 서비스 이용 기록</td></tr>' +
          '<tr><td>RevenueCat, Inc.</td><td>인앱 구독 결제 관리 및 구독 상태 검증</td><td>인앱 결제 영수증 번호, 구독 상태 데이터, 유저 고유 식별자</td></tr>' +
          '<tr><td>Google LLC / Apple Inc.</td><td>앱마켓을 통한 인앱 결제 처리</td><td>결제 영수증 정보, 인앱 구매 내역</td></tr>' +
        '</tbody>' +
      '</table></div>' +

      '<h2>제5조 (개인정보의 국외 이전)</h2>' +
      '<p>회사는 대한민국 이용자에게 안정적인 서비스를 제공하기 위해 운영 주체인 베트남 법인으로 고유 식별자를 포함한 개인정보를 이전하여 처리합니다. 클라우드 데이터베이스 인프라의 경우, 국내 이용자의 원활한 네트워크 속도 및 데이터 주권 보장을 위해 대한민국 내 리전에 저장됩니다.</p>' +
      '<ul class="pol-list">' +
        '<li><strong>회사(운영 및 처리 주체):</strong> APPFACTORY VIETNAM CO., LTD. (베트남 호치민시)</li>' +
        '<li><strong>클라우드 인프라 제공사:</strong> Google LLC — 데이터 저장 리전: 대한민국 서울 (asia-northeast3)</li>' +
        '<li><strong>이전되는 개인정보 항목:</strong> 제2조에 따라 수집되는 회원 정보 일체</li>' +
        '<li><strong>이전 일시 및 방법:</strong> 서비스 이용 시점에 정보통신망을 통해 운영 주체(베트남) 및 인프라 서버(한국 서울)로 전송</li>' +
        '<li><strong>이전받는 자의 이용목적 및 보유기간:</strong> 제3조의 목적 범위 내에서 제6조의 보유기간 동안</li>' +
        '<li><strong>국외 이전 거부 방법 및 절차:</strong> 이용자는 개인정보의 국외 이전을 거부할 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다. 국외 이전을 거부하고자 하시는 경우, 앱 내 \'회원 탈퇴(계정 삭제)\' 기능을 이용하시거나 개인정보 보호책임자(<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>)에게 이메일로 연락해 주시기 바랍니다.</li>' +
      '</ul>' +

      '<h2>제6조 (개인정보의 보유 및 이용기간)</h2>' +
      '<p>회사는 이용자로부터 개인정보를 수집할 때 동의받은 보유·이용기간 또는 법령에 따른 보유·이용기간 내에서 개인정보를 처리·보존합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>' +
      '<ul class="pol-list">' +
        '<li><strong>회원 가입 및 관리:</strong> 앱 탈퇴 시까지. 단, 부정 가입 및 변칙 탈퇴를 통한 부정 이용 재발 방지를 위해 탈퇴일로부터 30일간 회원의 식별 정보(이메일, 기기 식별자, 불량 이용 기록)를 분리 보관 후 파기합니다.</li>' +
      '</ul>' +
      '<p>관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 일정 기간 회원정보를 보관합니다.</p>' +
      '<ul class="pol-list">' +
        '<li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>' +
        '<li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>' +
        '<li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래등에서의 소비자보호에 관한 법률)</li>' +
        '<li>표시/광고에 관한 기록: 6개월 (전자상거래등에서의 소비자보호에 관한 법률)</li>' +
        '<li>서비스 접속 기록(로그인 기록): 3개월 (통신비밀보호법)</li>' +
      '</ul>' +

      '<h2>제7조 (개인정보의 파기절차 및 방법)</h2>' +
      '<p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 파기방법은 다음과 같습니다.</p>' +
      '<ul class="pol-list">' +
        '<li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>' +
        '<li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>' +
      '</ul>' +

      '<h2>제8조 (이용자의 권리와 그 행사방법)</h2>' +
      '<ul class="pol-list">' +
        '<li>이용자는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</li>' +
        '<li>제1항에 따른 권리 행사는 앱 내 \'프로필 수정\' 및 \'회원 탈퇴(계정 삭제)\' 기능을 통해 직접 수행하시거나, 개인정보 보호책임자에게 이메일을 통해 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</li>' +
        '<li>이용자가 회원 탈퇴(계정 삭제)를 요청하는 경우, 회사는 인증·프로필·작성 게시물·차단 목록 등 관련 개인정보를 삭제합니다. 다만 신고(모더레이션) 기록은 이용자 보호 및 부정 이용 방지를 위해 개인 식별자를 익명화한 형태로 보존될 수 있습니다.</li>' +
        '<li>이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 회사는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.</li>' +
      '</ul>' +

      '<h2>제9조 (개인정보의 안전성 확보 조치)</h2>' +
      '<p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>' +
      '<ul class="pol-list">' +
        '<li><strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적 직원 교육 등</li>' +
        '<li><strong>기술적 조치:</strong> 개인정보처리시스템 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>' +
        '<li><strong>물리적 조치:</strong> 데이터 보관 시스템 등에 대한 접근통제</li>' +
      '</ul>' +

      '<h2>제10조 (개인정보 보호책임자 및 안내)</h2>' +
      '<p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 고충처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>' +
      '<ul class="pol-list">' +
        '<li><strong>담당 부서:</strong> Customer Support Team</li>' +
        '<li><strong>이메일 주소:</strong> <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
        '<li><strong>회사 정식 소재지:</strong> 베트남 호치민시 (APPFACTORY VIETNAM CO., LTD.)</li>' +
      '</ul>' +

      '<h2>제11조 (개인정보 처리방침 변경)</h2>' +
      '<p>본 개인정보 처리방침은 2026년 7월 1일부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 수정이 있을 시에는 변경사항의 시행 7일 전부터 앱 내 공지사항을 통해 고지할 것입니다.</p>';
  }

  /* ---- S Partner: full formal Korean terms of service ------------------- */
  function sPartnerTermsKo() {
    return '' +
      '<h2>제1조 (목적)</h2>' +
      '<p>본 약관은 APPFACTORY VIETNAM CO., LTD.(이하 "회사"라 합니다)이 제공하는 모바일 애플리케이션 "에스 파트너매치(Sports PartnerMatch)" 및 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>' +

      '<h2>제2조 (용어의 정의)</h2>' +
      '<p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>' +
      '<ul class="pol-list">' +
        '<li><strong>"서비스"</strong>라 함은 회사가 모바일 기기를 통해 제공하는 매칭 및 커뮤니티 서비스를 의미합니다.</li>' +
        '<li><strong>"회원"</strong>이라 함은 본 약관에 동의하고 가입 절차를 마친 후 회사의 서비스를 이용하는 고객을 의미합니다.</li>' +
        '<li><strong>"아이템"</strong>이라 함은 서비스 내에서 특정 기능(프로필 열람, 매칭 신청 등)을 이용하기 위해 회원이 유료로 구매하는 디지털 재화를 의미합니다.</li>' +
        '<li><strong>"정기 구독"</strong>이라 함은 회원이 매월 또는 일정 주기마다 결제를 진행하여 특정 기간 동안 지속적인 서비스 혜택을 누리는 유료 상품을 의미합니다.</li>' +
      '</ul>' +

      '<h2>제3조 (약관의 효력 및 변경)</h2>' +
      '<ul class="pol-list">' +
        '<li>본 약관은 회원이 서비스에 가입할 때 동의함으로써 효력이 발생합니다. 소셜 로그인(카카오, 구글)을 통한 가입 역시 본 약관에 동의한 것으로 간주합니다.</li>' +
        '<li>회사는 관계법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>' +
        '<li>약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 적용일자 7일 전(회원에게 불리하거나 중대한 사항의 변경은 30일 전)부터 앱 내 공지사항을 통해 고지합니다.</li>' +
        '<li>회원이 개정일 이후에도 서비스를 계속 이용할 경우 개정 약관에 동의한 것으로 봅니다.</li>' +
      '</ul>' +

      '<h2>제4조 (이용계약의 성립 및 제한)</h2>' +
      '<p>이용계약은 회원이 되고자 하는 자가 본 약관의 내용에 동의하고, 회사가 요구하는 프로필 정보를 입력하여 가입 신청을 한 후, 회사가 이를 승낙함으로써 성립합니다.</p>' +
      '<p>회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.</p>' +
      '<ul class="pol-list">' +
        '<li>만 14세 미만 아동이 신청하는 경우</li>' +
        '<li>타인의 명의, 사진 또는 개인정보를 도용하여 신청한 경우</li>' +
        '<li>가입 신청 시 허위의 정보를 기재하거나, 회사가 제시하는 프로필 검증 기준을 충족하지 못한 경우</li>' +
        '<li>이전에 본 약관 위반 등으로 회원자격을 상실한 적이 있는 경우</li>' +
      '</ul>' +

      '<h2>제5조 (회원의 의무 및 금지행위)</h2>' +
      '<p>회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다. 위반 시 회사는 사전 통보 없이 서비스 이용 제한, 계정 영구 정지, 강제 탈퇴 등의 조치를 취할 수 있습니다.</p>' +
      '<ul class="pol-list">' +
        '<li>회원가입 및 프로필 작성 시 타인의 사진, 학력, 직업, 자산 등 개인정보를 도용하여 허위 사실을 기재하는 행위</li>' +
        '<li>기혼자이거나 법적으로 매칭 서비스 이용에 부적합한 신분임을 숨기고 가입하여 활동하는 행위</li>' +
        '<li>대가성 조건 만남, 성매매 알선, 금전 요구, 사기 행위 및 타 서비스(인스타그램, 오픈채팅 등)로 유인하여 영업 및 마케팅을 하는 행위</li>' +
        '<li>음란성·폭력성이 담긴 사진이나 비속어, 모욕적인 언사가 포함된 메시지를 프로필에 등록하거나 매칭 상대방에게 전송하는 행위</li>' +
        '<li>회사 및 제3자의 지식재산권을 침해하거나, 서비스의 안정적인 운영을 방해하는 해킹 및 매크로 프로그램 이용 행위</li>' +
      '</ul>' +

      '<h2>제6조 (이용자 생성 콘텐츠 및 신고·차단)</h2>' +
      '<ul class="pol-list">' +
        '<li>회원이 서비스 내에 게시·전송하는 프로필, 사진, 메시지 등 일체의 콘텐츠(이하 "이용자 콘텐츠")에 대한 책임은 이를 게시한 회원에게 있습니다.</li>' +
        '<li>회사는 다른 회원의 부적절한 콘텐츠나 행위를 신고할 수 있는 기능과, 특정 회원을 차단할 수 있는 기능을 제공합니다.</li>' +
        '<li>회사는 신고된 콘텐츠가 제5조의 금지행위에 해당한다고 판단되는 경우 해당 콘텐츠를 삭제하거나 게시 회원의 이용을 제한할 수 있습니다.</li>' +
        '<li>회사는 콘텐츠 검토 및 이용자 보호를 위해 신고 기록을 보존할 수 있으며, 회원 탈퇴 시 해당 기록의 개인 식별자는 익명화하여 처리합니다.</li>' +
      '</ul>' +

      '<h2>제7조 (유료 서비스 및 인앱 결제)</h2>' +
      '<ul class="pol-list">' +
        '<li>회원은 구글 플레이스토어, 애플 앱스토어 등 앱마켓 사업자가 제공하는 결제 수단(인앱 결제)을 통해 유료 아이템 및 정기 구독 서비스를 구매할 수 있습니다.</li>' +
        '<li>대금 결제, 청구 및 납부는 각 앱마켓 사업자의 정책 및 결제 수단별 운영사의 기준에 따릅니다.</li>' +
      '</ul>' +

      '<h2>제8조 (청약철회 및 환불 규정)</h2>' +
      '<p>본 약관은 전자상거래등에서의 소비자보호에 관한 법률(전자상거래법) 및 콘텐츠이용자보호지침을 준수하며, 디지털 결제의 특성을 반영합니다.</p>' +
      '<p class="pol-sublabel">청약철회(환불)가 가능한 경우</p>' +
      '<p>회원이 구매한 유료 "아이템" 또는 "정기 구독 서비스"는 구매일로부터 7일 이내에 한 번도 사용하지 않은 경우에 한하여 청약철회(환불 신청)를 할 수 있습니다.</p>' +
      '<p class="pol-sublabel">청약철회(환불)가 불가능한 경우 (전자상거래법 제17조 제2항 근거)</p>' +
      '<ul class="pol-list">' +
        '<li><strong>즉시 소비형 아이템:</strong> 구매 즉시 효력이 발생하거나 프로필 열람, 매칭 신청 등에 일부라도 사용된 아이템은 청약철회가 불가합니다.</li>' +
        '<li><strong>패키지 상품:</strong> 여러 아이템이 묶인 패키지 상품 중 일부 아이템이라도 사용한 경우, 나머지 미사용 부분에 대해서도 환불이 제한됩니다.</li>' +
        '<li><strong>정기 구독 상품:</strong> 구독 기간이 개시되어 구독 혜택을 이미 적용받은 경우, 해당 월의 잔여 일수에 대한 중도 해지 및 일할 계산 환불은 원칙적으로 불가능합니다. 회원은 다음 결제일에 대금이 청구되지 않도록 \'구독 해지\'만 신청할 수 있습니다. 단, 앱마켓 사업자(구글, 애플)의 자체 환불 정책이 본 약관보다 우선하여 적용될 수 있습니다.</li>' +
        '<li><strong>지급(보너스) 아이템:</strong> 이벤트, 출석 체크, 가입 보상 등 회사가 무상으로 지급한 아이템은 환불 및 현금 전환이 불가능합니다.</li>' +
      '</ul>' +
      '<p class="pol-sublabel">환불 조치 및 절차</p>' +
      '<ul class="pol-list">' +
        '<li>인앱 결제의 특성상 회사가 직접 결제 금액을 취소할 수 없으므로, 환불 신청은 회원이 직접 구글 플레이스토어 및 애플 앱스토어 고객센터를 통해 접수하여 진행해야 합니다.</li>' +
        '<li>앱마켓의 환불 승인이 완료되면 회사는 환불된 금액에 해당하는 앱 내 아이템을 회수합니다.</li>' +
        '<li>이용 시 시스템은 \'유상(결제) 아이템\'이 \'무상(이벤트) 아이템\'보다 먼저 차감되도록 설계되어 있으며, 남은 아이템이 무상 아이템뿐일 경우 환불 대상에서 제외됩니다.</li>' +
      '</ul>' +

      '<h2>제9조 (이용제한 회원에 대한 유료 상품 처리)</h2>' +
      '<p>회원이 제5조(금지행위)를 위반하여 계정이 영구 정지 또는 강제 탈퇴 조치되는 경우, 해당 회원이 보유하고 있던 모든 유료 아이템 및 정기 구독 권한은 즉시 소멸하며 회사는 이에 대해 환불할 의무를 지지 않습니다.</p>' +

      '<h2>제10조 (위치기반 서비스 제공)</h2>' +
      '<ul class="pol-list">' +
        '<li>회사는 회원의 실시간 위치 정보를 활용하여 가까운 거리의 회원을 추천하는 위치기반 서비스를 제공합니다.</li>' +
        '<li>회원은 단말기 설정을 통해 위치 정보 제공을 언제든지 거부할 수 있으나, 이 경우 위치 기반 매칭 기능 이용이 제한될 수 있습니다.</li>' +
      '</ul>' +

      '<h2>제11조 (면책조항)</h2>' +
      '<ul class="pol-list">' +
        '<li>회사는 회원 간의 매칭 기회를 제공할 뿐, 회원이 프로필에 게재한 정보(사진, 글, 학력 등)의 신뢰도 및 정확성에 대해서는 보증하지 않습니다.</li>' +
        '<li>회사는 천재지변, 디바이스 오류, 앱마켓 시스템 장애 등 회사의 귀책사유가 없는 서비스 중단에 대해 책임을 지지 않습니다.</li>' +
        '<li>회사는 회원 상호 간 또는 회원과 제3자 상호 간에 서비스를 매개로 하여 발생한 분쟁(오프라인 만남 시 발생한 사고, 금전 거래, 사기 행위 등)에 대해 회사의 고의 또는 중과실이 없는 한 책임을 지지 않습니다.</li>' +
      '</ul>' +

      '<h2>제12조 (준거법 및 재판관할)</h2>' +
      '<ul class="pol-list">' +
        '<li>회사와 회원 간에 제기된 소송은 대한민국법을 준거법으로 합니다.</li>' +
        '<li>회사와 회원 간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원을 제1심 관할법원으로 합니다.</li>' +
      '</ul>' +

      '<h2>부칙</h2>' +
      '<p>본 약관은 2026년 7월 1일부터 시행합니다.</p>';
  }

  /* ---- Builders --------------------------------------------------------- */
  function buildPrivacy(app, lang) {
    if (app.privacyDoc) return app.privacyDoc.render();
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
    if (app.termsDoc) return app.termsDoc.render();
    var t = T[lang], html = '';
    html += '<p class="intro">' + tpl(t.tIntro, app.name) + '</p>';
    html += h2(t.tServiceH) + p(tpl(t.tServiceB, app.name));
    html += h2(t.tConductH) + p(t.tConductB);
    if (app.matching) html += h2(t.tMeetH) + p(t.tMeetB);
    html += h2(t.tPaymentH) + p(t.tPaymentB);
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
    var h1 = document.querySelector('[data-policy-title]');
    var sub = document.querySelector('[data-policy-app]');
    var up = document.querySelector('[data-policy-updated]');
    var back = document.querySelector('[data-policy-back]');
    var container = document.querySelector('[data-policy-body]');

    // Formal, authoritative document (e.g. S Partner privacy & terms):
    // Korean-only title / effective date / body, regardless of language.
    var formalDoc = (type === 'privacy' && app.privacyDoc) ||
                    (type === 'terms' && app.termsDoc) || null;
    if (formalDoc) {
      document.title = formalDoc.title + ' | AppFactory';
      if (h1) h1.textContent = formalDoc.title;
      if (sub) sub.textContent = app.desc.ko;
      if (up) { up.textContent = formalDoc.effective; up.classList.add('pol-effective'); }
      if (back) back.textContent = t.hubBack;
      if (container) container.innerHTML = formalDoc.render();
      return;
    }

    var title = app.name + ' — ' + t[TITLES[type]];
    document.title = title + ' | AppFactory';
    if (h1) h1.textContent = app.name + ' ' + t[TITLES[type]];
    if (sub) sub.textContent = app.desc[lang] || app.desc.en;
    if (up) up.textContent = t.updated;
    if (back) back.textContent = t.hubBack;
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
