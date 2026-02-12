"use client";

import { useState } from "react";

interface TipItem {
  id: string;
  text: string;
  detail?: string;
}

interface TipCategory {
  id: string;
  title: string;
  emoji: string;
  tips: TipItem[];
}

const TIP_CATEGORIES: TipCategory[] = [
  {
    id: "arrival",
    title: "도착 후 할 일 TOP 5",
    emoji: "🛬",
    tips: [
      {
        id: "tfn",
        text: "TFN 신청 (온라인으로 28일 이내)",
        detail:
          "Tax File Number는 호주에서 합법적으로 일하기 위해 필수입니다. ATO 웹사이트에서 온라인으로 신청 가능하며, 도착 후 28일 이내에 신청해야 합니다.",
      },
      {
        id: "bank",
        text: "은행 계좌 개설 (신분증 지참)",
        detail:
          "Commonwealth Bank, ANZ, Westpac, NAB 중 선택하세요. 입국 후 6주 이내에 개설하면 여권만으로 가능합니다. 6주가 지나면 추가 신분증이 필요합니다.",
      },
      {
        id: "sim",
        text: "SIM 카드 구매 (Optus, Vodafone 추천)",
        detail:
          "공항이나 편의점에서 구매 가능합니다. Optus와 Vodafone이 가성비가 좋고, Telstra는 커버리지가 넓지만 비싼 편입니다. 월 AUD 30~40 정도면 충분합니다.",
      },
      {
        id: "medicare",
        text: "Medicare 신청 (한국-호주 상호협정)",
        detail:
          "한국과 호주는 의료 상호협정이 있어 Medicare에 가입할 수 있습니다. Medicare 오피스를 방문하여 여권, 비자, 한국 건강보험 증명서를 지참하세요.",
      },
      {
        id: "transport",
        text: "교통카드 구매 (Opal, Myki 등 도시별)",
        detail:
          "시드니: Opal Card, 멜버른: Myki, 브리즈번: Go Card, 퍼스: SmartRider. 편의점이나 역에서 구매 가능하며, 온라인 충전도 됩니다.",
      },
    ],
  },
  {
    id: "job",
    title: "일자리 구하기 팁",
    emoji: "💼",
    tips: [
      {
        id: "seek",
        text: "Seek, Indeed, Gumtree 매일 체크",
        detail:
          "Seek과 Indeed는 전문 구인구직 사이트이고, Gumtree는 호주판 중고나라지만 일자리 정보도 많습니다. 매일 아침 확인하는 습관을 들이세요.",
      },
      {
        id: "resume",
        text: "이력서는 호주 스타일로 (사진 넣지 않기)",
        detail:
          "호주 이력서에는 사진, 나이, 성별을 넣지 않습니다. 간결하게 2페이지 이내로 작성하고, 경력과 스킬 위주로 구성하세요.",
      },
      {
        id: "rsa",
        text: "RSA/RSG 자격증 따기 (바/카페 필수)",
        detail:
          "Responsible Service of Alcohol(RSA)은 주류 판매 업장에서 일하려면 필수입니다. 온라인으로 하루만에 취득 가능하며, 주(State)마다 별도로 취득해야 합니다.",
      },
      {
        id: "farm",
        text: "농장 일자리 (88일 조건 충족용)",
        detail:
          "세컨드 비자를 위해 지정 지역에서 88일 이상 일해야 합니다. Harvest Trail, MADEC 등의 사이트에서 농장 일자리를 찾을 수 있습니다.",
      },
      {
        id: "hostel",
        text: "워킹호스텔 활용하기",
        detail:
          "워킹호스텔은 숙소와 일자리를 동시에 제공합니다. 농장 시즌에 맞춰 이동하면 일자리를 구하기 훨씬 수월합니다.",
      },
    ],
  },
  {
    id: "life",
    title: "생활 꿀팁",
    emoji: "🏡",
    tips: [
      {
        id: "wage",
        text: "호주 평균 시급: AUD 23.23 (2024 기준)",
        detail:
          "호주의 최저 시급은 AUD 23.23입니다. 주말이나 공휴일에는 1.5~2배의 페널티 레이트가 적용됩니다. 캐주얼 직원은 추가 25%의 로딩이 붙습니다.",
      },
      {
        id: "grocery",
        text: "Woolworths/Coles에서 장보기",
        detail:
          "호주의 양대 대형마트입니다. 매주 수요일에 할인 품목이 바뀌니 카탈로그를 확인하세요. ALDI도 저렴한 대안입니다.",
      },
      {
        id: "share",
        text: "쉐어하우스 구하기: Flatmates, Fairy Floss",
        detail:
          "Flatmates.com.au가 가장 대표적인 쉐어하우스 사이트입니다. Fairy Floss Real Estate(페이스북)도 많이 이용됩니다. 보증금(Bond)은 보통 2주 렌트입니다.",
      },
      {
        id: "wifi",
        text: "무료 와이파이: 도서관, 맥도날드",
        detail:
          "호주 공립 도서관은 무료 와이파이와 컴퓨터를 제공합니다. 맥도날드, 스타벅스, 쇼핑센터에서도 무료 와이파이를 이용할 수 있습니다.",
      },
      {
        id: "emergency",
        text: "비상 연락처: 000 (경찰/구급/소방)",
        detail:
          "호주의 긴급 전화번호는 000입니다. 한국 대사관 긴급연락처도 미리 저장해두세요. 시드니: (02) 9210-0200, 멜버른: (03) 9639-0300.",
      },
    ],
  },
];

function TipAccordion({ tip }: { tip: TipItem }): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left"
    >
      <div className="flex items-start gap-2 py-2">
        <span className="mt-0.5 text-sm text-blue-500">
          {isOpen ? "▼" : "▶"}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700">{tip.text}</p>
          {isOpen && tip.detail && (
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {tip.detail}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function TipsPage(): React.ReactElement {
  return (
    <div className="relative min-h-screen px-4 py-8">
      {/* Cloud decorations */}
      <span className="cloud-float-slow pointer-events-none absolute top-12 left-6 text-4xl opacity-60">
        ☁️
      </span>
      <span className="cloud-float pointer-events-none absolute top-24 right-8 text-3xl opacity-50">
        ☁️
      </span>

      <main className="relative z-10 mx-auto max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            💡 워홀 꿀팁
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            호주 워킹홀리데이 생활에 꼭 필요한 정보 모음
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {TIP_CATEGORIES.map((category) => (
            <section key={category.id} className="glass-card p-5">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800">
                <span>{category.emoji}</span>
                {category.title}
              </h2>
              <div className="divide-y divide-slate-100">
                {category.tips.map((tip) => (
                  <TipAccordion key={tip.id} tip={tip} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer spacing for bottom nav */}
        <div className="h-8" />
      </main>
    </div>
  );
}
