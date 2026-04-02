/* ================================================================
   LAWSIGN – ADMIN DATA
   전체 발송 내역 공유 데이터 소스 (관리자 차트 / 테이블 기반)
   sendMethod: 'certified' = 카카오 전자문서 / 'simple' = 카카오 알림톡
   ================================================================ */

var ADMIN_DOCS = [
  { id: 1,  sender: '홍길동', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'certified', sendDate: '2026-03-26', recipient: '강원Dorm',         status: 'sent' },
  { id: 2,  sender: '김민준', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'simple',    sendDate: '2026-03-26', recipient: '청송보양병원',     status: 'read' },
  { id: 3,  sender: '이영희', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-03-27', recipient: '스타하드리움',     status: 'read' },
  { id: 4,  sender: '박지수', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-27', recipient: '은가비 다육카페', status: 'sent' },
  { id: 5,  sender: '최현우', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-03-27', recipient: '훈촌닭가',         status: 'sent' },
  { id: 6,  sender: '최상엽', type: '회원권 환불', typeCls: 'adm-type--refund', sendMethod: 'certified', sendDate: '2026-03-28', recipient: '어도99',           status: 'read' },
  { id: 7,  sender: '이승협', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-28', recipient: '스트릿진 위지옥집', status: 'sent' },
  { id: 8,  sender: '정수아', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'certified', sendDate: '2026-03-28', recipient: '희망마트',         status: 'read' },
  { id: 9,  sender: '강민호', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'simple',    sendDate: '2026-03-29', recipient: '수성빌딩',         status: 'sent' },
  { id: 10, sender: '윤채원', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-03-29', recipient: '하늘아파트 301호', status: 'read' },
  { id: 11, sender: '오세훈', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'certified', sendDate: '2026-03-29', recipient: '드림공인중개사',   status: 'sent' },
  { id: 12, sender: '임지현', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'simple',    sendDate: '2026-03-30', recipient: '이태원상회',       status: 'read' },
  { id: 13, sender: '한동훈', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-03-30', recipient: '서울스튜디오',     status: 'sent' },
  { id: 14, sender: '박소현', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-30', recipient: '미래공인중개',     status: 'sent' },
  { id: 15, sender: '김태준', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-03-31', recipient: '행복아파트 502호', status: 'read' },
  { id: 16, sender: '이나라', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'certified', sendDate: '2026-03-31', recipient: '상록수마트',       status: 'sent' },
  { id: 17, sender: '최도현', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-03-31', recipient: '강남부동산',       status: 'read' },
  { id: 18, sender: '장유진', type: '회원권 환불', typeCls: 'adm-type--refund', sendMethod: 'simple',    sendDate: '2026-03-31', recipient: '헬스플러스',       status: 'sent' },
  { id: 19, sender: '신현준', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-04-01', recipient: '중앙법무사',       status: 'sent' },
  { id: 20, sender: '홍길동', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-04-01', recipient: '서초공인중개사',   status: 'read' },
  { id: 21, sender: '김민준', type: '대여금',    typeCls: 'adm-type--loan',     sendMethod: 'certified', sendDate: '2026-04-01', recipient: '대한신탁',         status: 'sent' },
  { id: 22, sender: '이영희', type: '층간소음',  typeCls: 'adm-type--noise',    sendMethod: 'certified', sendDate: '2026-04-02', recipient: '파크빌 203호',     status: 'sent' },
  { id: 23, sender: '박지수', type: '임대차',    typeCls: 'adm-type--rent',     sendMethod: 'simple',    sendDate: '2026-04-02', recipient: '신촌고시텔',       status: 'sent' },
  { id: 24, sender: '최현우', type: '계약관련',  typeCls: 'adm-type--contract', sendMethod: 'certified', sendDate: '2026-04-02', recipient: '서울하우징',       status: 'sent' },
];
