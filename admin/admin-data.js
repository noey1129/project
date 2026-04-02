/* ================================================================
   LAWSIGN – ADMIN DATA
   전체 발송 내역 공유 데이터 소스 (관리자 차트 / 테이블 기반)
   sendMethod: 'certified' = 카카오 전자문서 / 'simple' = 카카오 알림톡
   ================================================================ */

var ADMIN_DOCS = [
  { id: 1,  sender: '홍길동', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'certified', sendDate: '2026-03-26', recipient: '강다은',   status: 'sent' },
  { id: 2,  sender: '김민준', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'simple',    sendDate: '2026-03-26', recipient: '이준혁',   status: 'read' },
  { id: 3,  sender: '이영희', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-03-27', recipient: '박서연',   status: 'read' },
  { id: 4,  sender: '박지수', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-27', recipient: '최민재',   status: 'sent' },
  { id: 5,  sender: '최현우', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-03-27', recipient: '정하은',   status: 'sent' },
  { id: 6,  sender: '최상엽', type: '회원권 환불', typeCls: 'adm-type--refund', sendMethod: 'certified', sendDate: '2026-03-28', recipient: '한지훈',   status: 'read' },
  { id: 7,  sender: '이승협', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-28', recipient: '오수빈',   status: 'sent' },
  { id: 8,  sender: '정수아', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'certified', sendDate: '2026-03-28', recipient: '임태양',   status: 'read' },
  { id: 9,  sender: '강민호', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'simple',    sendDate: '2026-03-29', recipient: '윤지아',   status: 'sent' },
  { id: 10, sender: '윤채원', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-03-29', recipient: '신동현',   status: 'read' },
  { id: 11, sender: '오세훈', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'certified', sendDate: '2026-03-29', recipient: '장수아',   status: 'sent' },
  { id: 12, sender: '임지현', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'simple',    sendDate: '2026-03-30', recipient: '권민준',   status: 'read' },
  { id: 13, sender: '한동훈', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-03-30', recipient: '배소희',   status: 'sent' },
  { id: 14, sender: '박소현', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-30', recipient: '류현우',   status: 'sent' },
  { id: 15, sender: '김태준', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-03-31', recipient: '노예진',   status: 'read' },
  { id: 16, sender: '이나라', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'certified', sendDate: '2026-03-31', recipient: '문성호',   status: 'sent' },
  { id: 17, sender: '최도현', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-31', recipient: '표지은',   status: 'read' },
  { id: 18, sender: '장유진', type: '회원권 환불', typeCls: 'adm-type--refund', sendMethod: 'simple',    sendDate: '2026-03-31', recipient: '허채원',   status: 'sent' },
  { id: 19, sender: '신현준', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-04-01', recipient: '남기석',   status: 'sent' },
  { id: 20, sender: '홍길동', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-04-01', recipient: '이서영',   status: 'read' },
  { id: 21, sender: '김민준', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'certified', sendDate: '2026-04-01', recipient: '조민석',   status: 'sent' },
  { id: 22, sender: '이영희', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-04-02', recipient: '송예린',   status: 'sent' },
  { id: 23, sender: '박지수', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-04-02', recipient: '고재원',   status: 'sent' },
  { id: 24, sender: '최현우', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-04-02', recipient: '마지혜',   status: 'sent' },
];
