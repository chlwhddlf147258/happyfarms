/* 
  [수정 가이드 - 이 파일 한 곳만 손보세요]
  - 모든 텍스트/링크/이미지/ALT/라벨/색상/폰트/간격/모션/섹션 토글은 여기서만 관리됩니다.
  - 각 항목에 [수정] 주석과 명시적인 Placeholder를 제공합니다.
*/
window.SITE = {
  /* 사이트 기본 */
  site: {
    name: "해피팜스 영농조합법인",   
    title: "해피팜스",          
    description: "체계적이고 위생적인 유기농 원재료를 통한 바른 먹거리 제공을 위해 노력하는 임실농부의 마음", 
    lang: "ko",                                 
    faviconPath: "images/logo_placeholder.svg",  
    logoPath: "images/logo_placeholder.svg", 
    heroBackgroundPath: "images/hero_background_placeholder.jpg"
  },

  /* 디자인 토큰 */
  theme: {
    colors: {                                        
      primary: "#3C7D3C",
      onPrimary: "#ffffff",
      bg: "#ffffff",            // CSS 변수 --color-bg 로 매핑
      surface: "#f5f7f8",
      text: "#1a1a1a",
      muted: "#6b7280"
    },
    font: {
      googleFontURL: "",       
      family: 'ui-sans-serif, system-ui, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif' 
    },
    containerMax: "1120px",   
    spacingBase: "8px",        
    radii: { lg: "16px" },     
    shadows: { md: "0 6px 24px rgba(0,0,0,0.08)" }
  },

  /* 접근성 라벨 */
  a11y: {
    skipToContent: "본문으로 건너뛰기",      
    primaryNav: "주요 메뉴",               
    navToggleLabelOpen: "메뉴 닫기",      
    navToggleLabelClosed: "메뉴 열기"       
  },

  /* 이미지 대체 텍스트 */
  alt: {
    logoAlt: "회사 로고",                     
    partnersRegion: "파트너 로고",          
    partnerLogoAlt: "파트너 로고",             
    aboutImageAlt: "회사/농장 이미지",           
    productImageAlt: "제품 이미지",             
    mapRegionLabel: "지도/약도"                
  },

  /* 공통 라벨 */
  labels: {
    seeMore: "자세히 보기",                   
    address: "주소",                          
    phone: "전화",                      
    email: "이메일",        
    businessRegNoLabel: "사업자등록번호",  
    close: "닫기"                       
  },

  /* 네비게이션 */
  nav: [
    { label: "홈", href: "#home" },         
    { label: "회사 소개", href: "#about" },   
    { label: "제품/서비스", href: "#products"},
    { label: "강점", href: "#process" },      
    { label: "FAQ", href: "#faq" },          
    { label: "연락처", href: "#contact" }    
  ],

  /* Hero */
  hero: {
    headline: "맛있고 건강하자.", 
    subhead: "농산물 판매하는 해피팜스입니다.", 
    ctaLabel: "제품/서비스 보기",        
    ctaHref: "#products"                       
  },

  /* 파트너 로고 */
  partners: [
    "images/partner1_placeholder.png"
  ],

  /* 회사 소개 */
  about: {
    title: "회사 소개",                              
    body: "해피팜스 영농조합법인.",    
    highlights: [
      "2021년, 작은 소망들이 하나로 모여 시작된 법인",                 
      "삶은 죽순으로 시작된 사업",                        
      "현재는 여러 아이템을 개발중"                      
    ],
    imagePath: "images/about_placeholder.jpg"      
  },

  /* 제품/서비스 섹션 */
  productsSection: {
    title: "제품/서비스",                           
    intro: "해피팜스는 현재 이런 것들을 다룹니다." 
  },

  /* 제품/서비스 목록 */
  products: [
    {
      name: "삶은 죽순",                    
      summary: "싱싱한 원물 손질 후 바로 삶아 진공 포장한 유기농 죽순",    
      imagePath: "images/product1_placeholder.jpg", 
      linkLabel: "문의하기",                      
      linkHref: "#contact"                     
    },
    {
      name: "죽순 장아찌",
      summary: "3번 끓인 소스로 깊은 맛이 일품인 죽순 장아찌",
      imagePath: "images/product2_placeholder.jpg",
      linkLabel: "문의하기",
      linkHref: "#contact"
    },
    {
      name: "명품 건강차 3종 세트",
      summary: "명품 건강차 3종(토봉령차, 조릿대잎차, 죽순잎차)",
      imagePath: "images/product3_placeholder.jpg",
      linkLabel: "문의하기",
      linkHref: "#contact"
    }
  ],

  /* 강점/프로세스 */
  process: {
    title: "우리가 잘하는 것",                  
    steps: [
      { title: "선별", desc: "산지에서 엄선된 농산물만 선별합니다." },   
      { title: "저장/포장", desc: "신선도를 지키는 보관과 친환경 포장." }, 
      { title: "신속 배송", desc: "빠르고 안전하게 전달합니다." }       
    ]
  },

  /* FAQ */
  faqSection: { title: "자주 묻는 질문" },         
  faq: [
    { q: "질문 1을 입력하세요", a: "답변 1을 입력하세요." },
    { q: "질문 2을 입력하세요", a: "답변 2를 입력하세요." },
    { q: "질문 3을 입력하세요", a: "답변 3을 입력하세요." } 
  ],

  /* 연락처 */
  contact: {
    title: "연락하기",                              
    intro: "도매/납품/제휴 문의를 환영합니다.",      
    address: "전북특별자치도 임실군 임실읍 임삼로 1300(공장)",            
    phone: "010-7776-9688",                          
    email: "chlwhddlf147258@naver.com",                     
    mailSubject: "[문의] 웹사이트에서 연락드립니다",   
    ctaLabel: "이메일 보내기",                        

    /* Kakao Roughmap 임베드 (퍼가기 코드 값으로 교체) */
    mapEmbed: {
      type: "kakao-roughmap",
      containerId: "daumRoughmapContainer1756355492605", // [수정] 제공된 컨테이너 ID
      timestamp: "1756355492605",                         // [수정]
      key: "84jwt2a4bsj",                                 // [수정]
      width: 640,                                         // 초기 px (반응형이면 무시됨)
      height: 360,
      responsive: true,                                   // [수정] 반응형 on/off
      aspectRatio: "16:9"                                  // [수정] "4:3", "21:9" 등
    }
  },

  /* SNS (사용할 것만 채우기) */
  social: {
    instagram: "",                                       
    facebook: "",                                      
    youtube: "",                                  
    linkedin: ""                             
  },

  /* 법적 고지(페이지 저장 없이 모달로) */
  legal: {
    useInlineDialogs: true,                              // [수정] false면 링크 이동
    lastUpdated: "2025-08-01",                           // [수정]
    privacy: {
      title: "개인정보처리방침",                         // [수정]
      content: `
① 수집 항목: 문의 시 제공되는 최소한의 정보(이름, 이메일, 전화번호 등)만 수집합니다.
② 이용 목적: 문의 응대, 계약 이행 및 고객 관리 목적에 한해 이용합니다.
③ 보관 기간: 목적 달성 시 즉시 파기하며, 관계 법령에 따라 필요한 경우 정해진 기간 보관합니다.
④ 제3자 제공/처리위탁: 하지 않습니다.
⑤ 이용자 권리: 열람·정정·삭제·처리정지 요청이 가능하며, 아래 이메일로 연락하실 수 있습니다.
⑥ 쿠키: 필수 쿠키만 사용하며, 분석/광고 쿠키는 사용하지 않습니다.
⑦ 방침 변경: 변경 시 본 문서를 통해 고지합니다.
문의: chlwhddlf147258@naver.com
(시행일: 2025-08-01)
      `.trim()
    },
    terms: {
      title: "이용약관",                                 // [수정]
      content: `
① 목적: 본 사이트 이용에 관한 기본 조건을 규정합니다.
② 지식재산권: 본 사이트의 콘텐츠는 저작권법에 의해 보호되며, 사전 동의 없는 복제·배포를 금지합니다.
③ 책임 제한: 본 사이트의 정보는 일반 정보 제공 목적이며, 사용에 따른 책임은 이용자에게 있습니다.
④ 금지 행위: 관련 법령 위반, 무단 크롤링, 상업적 재배포 등을 금지합니다.
⑤ 변경: 사이트 및 약관은 예고 없이 변경될 수 있습니다.
⑥ 준거법/관할: 대한민국 법을 따르며, 분쟁은 [전주지방법원]의 전속 관할로 합니다.
(시행일: 2025-08-01)
      `.trim()
    }
  },

  /* 푸터 (사업자등록번호만 노출 + 정책 모달 링크) */
  footer: {
    copyrightName: "해피팜스 영농조합법인",          // [수정]
    businessRegNo: "889-86-02370",               // [수정]
    links: [
      { kind: "privacy", label: "개인정보처리방침", href: "#" },
      { kind: "terms",   label: "이용약관",         href: "#" }
    ]
  },

  /* 기능 토글 (원치 않는 섹션은 false로 비활성화) */
  features: {
    hero: true,
    partners: false,
    about: true,
    products: true,
    process: false,
    faq: false,
    contact: true,
    social: false,
    mapEmbed: true,
    footerLinks: true,
    legalDialogs: true
  },

  /* 동작/레이아웃 옵션 */
  settings: {
    smoothScroll: true,           // [수정]
    autoHideOnEmpty: true         // [수정] 내용 비어있으면 자동 숨김
  },

  /* 모션/애니메이션 */
  motion: {
    enabled: true,                // [수정] 전체 모션 on/off
    revealOnScroll: true,         // [수정] 스크롤 리빌
    revealOnce: true,             // [수정] 한 번만
    distance: "24px",             // [수정] 이동 거리
    duration: 600,                // [수정] ms
    stagger: 80,                  // [수정] ms
    easing: "cubic-bezier(0.22,1,0.36,1)", // [수정]

    heroKenBurns: true,           // [수정]
    cardHoverLift: true,          // [수정]
    navUnderline: true            // [수정]
  }
};
