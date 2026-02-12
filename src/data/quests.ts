import { Stage } from "@/types";

export const stages: Stage[] = [
  {
    id: 1,
    title: "Eligibility Check",
    description: "Check if you meet the requirements for an Australian Working Holiday visa",
    emoji: "🔍",
    color: "#3B82F6",
    quests: [
      {
        id: "1-1",
        title: "Age Verification",
        description: "Confirm you are between 18 and 30 years old at the time of application",
        emoji: "🎂",
        guideUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417/first-working-holiday-417#Eligibility",
      },
      {
        id: "1-2",
        title: "Passport",
        description: "Prepare or renew your passport with at least 6 months validity",
        emoji: "📘",
        guideUrl: "https://www.passport.go.kr/home/kor/contents.do?menuPos=2",
      },
      {
        id: "1-3",
        title: "Health Examination",
        description: "Book a health examination at a designated panel physician",
        emoji: "🏥",
        guideUrl: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health/arrange-your-health-examinations",
      },
      {
        id: "1-4",
        title: "Police Clearance",
        description: "Request a criminal record check from the police agency",
        emoji: "🔒",
        guideUrl: "https://crims.police.go.kr/",
      },
    ],
  },
  {
    id: 2,
    title: "Visa Application",
    description: "Apply for the Australian Working Holiday visa (subclass 417)",
    emoji: "📋",
    color: "#8B5CF6",
    quests: [
      {
        id: "2-1",
        title: "Create ImmiAccount",
        description: "Register an account on the Australian immigration portal",
        emoji: "👤",
        guideUrl: "https://online.immi.gov.au/lusc/register",
      },
      {
        id: "2-2",
        title: "Fill Visa Application",
        description: "Complete the Working Holiday visa application form (subclass 417)",
        emoji: "📝",
        guideUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417",
      },
      {
        id: "2-3",
        title: "Pay Visa Fee",
        description: "Pay the visa application charge of AUD 640",
        emoji: "💳",
        guideUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges/current-visa-pricing/work",
      },
      {
        id: "2-4",
        title: "Complete Health Examination",
        description: "Attend and complete the health examination appointment",
        emoji: "✅",
        guideUrl: "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health",
      },
      {
        id: "2-5",
        title: "Visa Approval",
        description: "Wait for and confirm your visa grant notification",
        emoji: "🎉",
        guideUrl: "https://online.immi.gov.au/lusc/login",
      },
    ],
  },
  {
    id: 3,
    title: "Preparation",
    description: "Get everything ready before departing for Australia",
    emoji: "🎒",
    color: "#F59E0B",
    quests: [
      {
        id: "3-1",
        title: "Book Flights",
        description: "Book your flight tickets to Australia",
        emoji: "✈️",
        guideUrl: "https://www.skyscanner.co.kr/",
      },
      {
        id: "3-2",
        title: "Travel Insurance",
        description: "Purchase overseas travel and health insurance",
        emoji: "🛡️",
        guideUrl: "https://www.worldnomads.com/",
      },
      {
        id: "3-3",
        title: "Bank Account",
        description: "Open an Australian bank account (e.g., CommBank, NAB)",
        emoji: "🏦",
        guideUrl: "https://www.commbank.com.au/moving-to-australia.html",
      },
      {
        id: "3-4",
        title: "TFN Preparation",
        description: "Prepare to apply for a Tax File Number upon arrival",
        emoji: "🔢",
        guideUrl: "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn",
      },
      {
        id: "3-5",
        title: "Initial Accommodation",
        description: "Book initial accommodation (hostel or share house)",
        emoji: "🏠",
        guideUrl: "https://www.hostelworld.com/st/australia/",
      },
      {
        id: "3-6",
        title: "International Driving Permit",
        description: "Get an international driving permit from your local authority",
        emoji: "🚗",
        guideUrl: "https://www.safedriving.or.kr/guide/larGuide051.do",
      },
      {
        id: "3-7",
        title: "Install Essential Apps",
        description: "Install essential apps: Seek, Gumtree, Google Maps",
        emoji: "📱",
        guideUrl: "https://www.seek.com.au/",
      },
    ],
  },
  {
    id: 4,
    title: "Departure",
    description: "Final steps before your adventure begins!",
    emoji: "🛫",
    color: "#10B981",
    quests: [
      {
        id: "4-1",
        title: "Packing Checklist",
        description: "Review and complete your packing checklist",
        emoji: "🧳",
      },
      {
        id: "4-2",
        title: "Arrive at Airport",
        description: "Arrive at the airport with all documents ready",
        emoji: "🏢",
      },
      {
        id: "4-3",
        title: "Board the Plane!",
        description: "Board your flight to Australia! ✈️",
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
