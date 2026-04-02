/* ================================================================
   LAWSIGN – SEND HISTORY DATA
   발송 현황 더미 데이터
   ================================================================ */

var HISTORY_DATA = [
  /* ── 오늘/이번주/이번달 (2026-04-02) ── */
  {
    id: 4,
    title: '임대차 계약 해지 통보',
    channel: 'kakao_edoc',
    channelLabel: '카카오톡 전자문서',
    status: 'read',
    statusLabel: '읽음',
    recipient: '최민준',
    sendDate: '2026-04-02',
    sendDateTime: '2026. 04. 02  09:15',
    receiveDateTime: '2026. 04. 02  09:20',
    readDateTime: '2026. 04. 02  10:05'
  },
  {
    id: 5,
    title: '보증금 반환 촉구',
    channel: 'kakao_alim',
    channelLabel: '카카오 알림',
    status: 'sent',
    statusLabel: '발송됨',
    recipient: '정수빈',
    sendDate: '2026-04-02',
    sendDateTime: '2026. 04. 02  11:40',
    receiveDateTime: null,
    readDateTime: null
  },
  /* ── 이번주/이번달 (2026-04-01) ── */
  {
    id: 6,
    title: '관리비 미납 시정 요구',
    channel: 'kakao_alim',
    channelLabel: '카카오 알림',
    status: 'received',
    statusLabel: '수신됨',
    recipient: '한지수',
    sendDate: '2026-04-01',
    sendDateTime: '2026. 04. 01  14:20',
    receiveDateTime: '2026. 04. 01  14:25',
    readDateTime: null
  },
  /* ── 이번주 (2026-03-30) ── */
  {
    id: 7,
    title: '층간소음 경고 통보',
    channel: 'kakao_edoc',
    channelLabel: '카카오톡 전자문서',
    status: 'read',
    statusLabel: '읽음',
    recipient: '오세훈',
    sendDate: '2026-03-30',
    sendDateTime: '2026. 03. 30  16:00',
    receiveDateTime: '2026. 03. 30  16:10',
    readDateTime: '2026. 03. 31  08:30'
  },
  {
    id: 8,
    title: '대여금 반환 청구',
    channel: 'kakao_alim',
    channelLabel: '카카오 알림',
    status: 'failed',
    statusLabel: '실패',
    recipient: '임채원',
    sendDate: '2026-03-28',
    sendDateTime: '2026. 03. 28  10:55',
    receiveDateTime: null,
    readDateTime: null
  },
  /* ── 기존 3건 (2025년) ── */
  {
    id: 1,
    title: '부동산 매매 계약 해체 통보',
    channel: 'kakao_edoc',
    channelLabel: '카카오톡 전자문서',
    status: 'sent',
    statusLabel: '발송됨',
    recipient: '김영수',
    sendDate: '2025-12-01',
    sendDateTime: '2025. 12. 01  14:30',
    receiveDateTime: null,
    readDateTime: null
  },
  {
    id: 2,
    title: '임대차 보증금 반환 청구',
    channel: 'kakao_edoc',
    channelLabel: '카카오톡 전자문서',
    status: 'read',
    statusLabel: '읽음',
    recipient: '박철수',
    sendDate: '2025-11-20',
    sendDateTime: '2025. 11. 20  10:15',
    receiveDateTime: '2025. 11. 20  11:00',
    readDateTime: '2025. 11. 21  09:00'
  },
  {
    id: 3,
    title: '층간소음 시정 요구',
    channel: 'kakao_alim',
    channelLabel: '카카오 알림',
    status: 'read',
    statusLabel: '읽음',
    recipient: '이영희',
    sendDate: '2025-11-10',
    sendDateTime: '2025. 11. 10  11:00',
    receiveDateTime: '2025. 11. 10  11:30',
    readDateTime: '2025. 11. 11  10:30'
  },
  {
    id: 9,
    title: '계약 불이행 손해배상 청구',
    channel: 'kakao_edoc',
    channelLabel: '카카오톡 전자문서',
    status: 'received',
    statusLabel: '수신됨',
    recipient: '강민서',
    sendDate: '2025-10-22',
    sendDateTime: '2025. 10. 22  09:00',
    receiveDateTime: '2025. 10. 22  09:15',
    readDateTime: null
  },
  {
    id: 10,
    title: '월세 연체 독촉장',
    channel: 'kakao_alim',
    channelLabel: '카카오 알림',
    status: 'failed',
    statusLabel: '실패',
    recipient: '윤서준',
    sendDate: '2025-09-15',
    sendDateTime: '2025. 09. 15  13:45',
    receiveDateTime: null,
    readDateTime: null
  },
  /* ── 발송 실패 추가 ── */
  {
    id: 11,
    title: '회원권 환불 청구',
    channel: 'kakao_edoc',
    channelLabel: '카카오톡 전자문서',
    status: 'failed',
    statusLabel: '실패',
    recipient: '정민호',
    sendDate: '2026-03-31',
    sendDateTime: '2026. 03. 31  09:30',
    receiveDateTime: null,
    readDateTime: null
  },
  {
    id: 12,
    title: '임대차 계약 해지 통보',
    channel: 'kakao_alim',
    channelLabel: '카카오 알림',
    status: 'failed',
    statusLabel: '실패',
    recipient: '한지현',
    sendDate: '2026-03-27',
    sendDateTime: '2026. 03. 27  15:10',
    receiveDateTime: null,
    readDateTime: null
  }
];
