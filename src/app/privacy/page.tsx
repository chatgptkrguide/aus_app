import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 호주 워홀 메이트",
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps): React.ReactElement {
  return (
    <section className="glass-card p-5 mb-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage(): React.ReactElement {
  return (
    <div className="relative min-h-screen px-4 py-8">
      <span className="cloud-float-slow pointer-events-none absolute top-12 left-6 text-4xl opacity-60">
        ☁️
      </span>
      <span className="cloud-float pointer-events-none absolute top-24 right-8 text-3xl opacity-50">
        ☁️
      </span>

      <main className="relative z-10 mx-auto max-w-md">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            개인정보처리방침
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            시행일: 2026년 2월 13일
          </p>
        </div>

        <Section title="1. 개요">
          <p>
            &quot;호주 워홀 메이트&quot;(이하 &quot;본 앱&quot;)는 호주
            워킹홀리데이 준비를 돕는 웹 애플리케이션입니다. 본 앱은 사용자의
            개인정보 보호를 중요하게 생각하며, 아래와 같이 개인정보처리방침을
            안내드립니다.
          </p>
        </Section>

        <Section title="2. 수집하는 개인정보">
          <p>
            본 앱은 <strong>개인정보를 수집하지 않습니다.</strong> 서버로
            전송되는 데이터가 없으며, 모든 데이터는 사용자의 기기 내에서만
            처리됩니다.
          </p>
        </Section>

        <Section title="3. 로컬 저장 데이터">
          <p>
            본 앱은 사용자 경험 향상을 위해 다음 데이터를 기기 내
            localStorage에 저장합니다:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>퀘스트 진행률</li>
            <li>게임 상태 (경험치, 레벨)</li>
            <li>출발 예정일</li>
          </ul>
          <p>
            이 데이터는 사용자의 브라우저에만 저장되며, 외부 서버로 전송되지
            않습니다.
          </p>
        </Section>

        <Section title="4. 제3자 제공">
          <p>
            본 앱은 사용자의 데이터를 <strong>제3자에게 제공하지 않습니다.</strong>
          </p>
        </Section>

        <Section title="5. 외부 서비스">
          <p>
            본 앱은 폰트 렌더링을 위해 Google Fonts(Noto Sans KR)를 사용합니다.
            이 과정에서 Google 서버에 폰트 파일 요청이 발생할 수 있으나,
            사용자의 개인정보는 전송되지 않습니다.
          </p>
        </Section>

        <Section title="6. 데이터 삭제">
          <p>저장된 데이터는 다음 방법으로 삭제할 수 있습니다:</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>앱 내 설정 &gt; 진행률 초기화</li>
            <li>브라우저 설정에서 사이트 데이터 삭제</li>
          </ul>
        </Section>

        <Section title="7. 개발자 정보">
          <p>
            <strong>개발자:</strong> chatgptkrguide
          </p>
          <p>
            <strong>문의:</strong>{" "}
            <a
              href="https://github.com/chatgptkrguide/aus_app/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              GitHub Issues
            </a>
          </p>
        </Section>

        <Section title="8. 방침 변경">
          <p>
            본 개인정보처리방침은 관련 법령 또는 서비스 변경에 따라 수정될 수
            있으며, 변경 시 앱 내에서 공지합니다.
          </p>
        </Section>

        <div className="text-center text-xs text-gray-400 mt-6 pb-4">
          <p>최종 업데이트: 2026년 2월 13일</p>
        </div>
      </main>
    </div>
  );
}
