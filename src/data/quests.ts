import { Stage } from "@/types";

export const stages: Stage[] = [
  {
    id: 1,
    title: "자격 확인",
    description: "호주 워킹홀리데이 비자 자격 요건을 확인하세요",
    emoji: "🔍",
    color: "#3B82F6",
    quests: [
      {
        id: "1-1",
        title: "나이 확인",
        description: "신청 시 만 18-30세인지 확인하세요",
        emoji: "🎂",
        guideUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417/first-working-holiday-417#Eligibility",
      },
      {
        id: "1-2",
        title: "여권 준비",
        description: "유효기간 6개월 이상 남은 여권을 준비하세요",
        emoji: "📘",
        guideUrl: "https://www.passport.go.kr/home/kor/contents.do?menuPos=2",
      },
      {
        id: "1-3",
        title: "건강검진 예약",
        description: "지정 병원에서 건강검진을 예약하세요",
        emoji: "🏥",
        guideUrl: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health/arrange-your-health-examinations",
      },
      {
        id: "1-4",
        title: "범죄경력 조회",
        description: "경찰청에서 범죄경력증명서를 발급받으세요",
        emoji: "🔒",
        guideUrl: "https://crims.police.go.kr/",
      },
    ],
  },
  {
    id: 2,
    title: "비자 신청",
    description: "호주 워킹홀리데이 비자(subclass 417)를 신청하세요",
    emoji: "📋",
    color: "#8B5CF6",
    quests: [
      {
        id: "2-1",
        title: "ImmiAccount 가입",
        description: "호주 이민성 포털에 계정을 만드세요",
        emoji: "👤",
        guideUrl: "https://online.immi.gov.au/lusc/register",
      },
      {
        id: "2-2",
        title: "비자 신청서 작성",
        description: "워킹홀리데이 비자 신청서를 작성하세요",
        emoji: "📝",
        guideUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417",
      },
      {
        id: "2-3",
        title: "비자비 결제",
        description: "비자 신청비 AUD 640을 결제하세요",
        emoji: "💳",
        guideUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges/current-visa-pricing/work",
      },
      {
        id: "2-4",
        title: "건강검진 완료",
        description: "예약한 건강검진을 완료하세요",
        emoji: "✅",
        guideUrl: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health",
      },
      {
        id: "2-5",
        title: "비자 승인 확인",
        description: "비자 승인 통보를 확인하세요",
        emoji: "🎉",
        guideUrl: "https://online.immi.gov.au/lusc/login",
      },
    ],
  },
  {
    id: 3,
    title: "출발 준비",
    description: "호주로 떠나기 전 필요한 것들을 준비하세요",
    emoji: "🎒",
    color: "#F59E0B",
    quests: [
      {
        id: "3-1",
        title: "항공권 예약",
        description: "호주행 항공편을 예약하세요",
        emoji: "✈️",
        guideUrl: "https://www.skyscanner.co.kr/",
      },
      {
        id: "3-2",
        title: "해외여행보험 가입",
        description: "해외 체류 기간 동안의 보험에 가입하세요",
        emoji: "🛡️",
        guideUrl: "https://www.worldnomads.com/",
      },
      {
        id: "3-3",
        title: "호주 은행계좌 개설",
        description: "CommBank 등 호주 은행 계좌를 미리 개설하세요",
        emoji: "🏦",
        guideUrl: "https://www.commbank.com.au/moving-to-australia.html",
      },
      {
        id: "3-4",
        title: "TFN 신청 준비",
        description: "세금번호(Tax File Number) 신청을 준비하세요",
        emoji: "🔢",
        guideUrl: "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn",
      },
      {
        id: "3-5",
        title: "초기 숙소 예약",
        description: "도착 후 머물 호스텔이나 쉐어하우스를 예약하세요",
        emoji: "🏠",
        guideUrl: "https://www.hostelworld.com/st/australia/",
      },
      {
        id: "3-6",
        title: "국제면허증 발급",
        description: "도로교통공단에서 국제운전면허증을 발급받으세요",
        emoji: "🚗",
        guideUrl: "https://www.safedriving.or.kr/guide/larGuide051.do",
      },
      {
        id: "3-7",
        title: "필수 앱 설치",
        description: "Seek, Gumtree, Google Maps 등 필수 앱을 설치하세요",
        emoji: "📱",
        guideUrl: "https://www.seek.com.au/",
      },
    ],
  },
  {
    id: 4,
    title: "출발!",
    description: "드디어 호주로 떠나는 날!",
    emoji: "🛫",
    color: "#10B981",
    quests: [
      {
        id: "4-1",
        title: "짐싸기 확인",
        description: "짐싸기 체크리스트를 확인하세요",
        emoji: "🧳",
      },
      {
        id: "4-2",
        title: "공항 도착",
        description: "서류를 챙기고 공항에 도착하세요",
        emoji: "🏢",
      },
      {
        id: "4-3",
        title: "비행기 탑승!",
        description: "호주행 비행기에 탑승하세요! ✈️",
        emoji: "🎊",
      },
    ],
  },
];

export function getAllQuests(): string[] {
  return stages.flatMap((stage) => stage.quests.map((quest) => quest.id));
}

export function getQuestCountByStage(stageId: number): number {
  const stage = stages.find((s) => s.id === stageId);
  return stage ? stage.quests.length : 0;
}

export function getTotalQuestCount(): number {
  return stages.reduce((acc, stage) => acc + stage.quests.length, 0);
}
