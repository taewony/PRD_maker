"use client";

import { useState } from 'react';

const questions = [
  "1. 무엇을 만들고 싶은가요? (앱의 핵심 기능과 정체성)",
  "2. 왜 이 앱을 만들려고 하시나요? 어떤 문제를 해결하고 싶으신가요? (개발 동기 및 문제 정의)",
  "3. 이 앱이 제공하는 핵심 가치는 무엇인가요? (한 문장으로 요약)",
  "4. 이 앱의 주요 사용자는 누구인가요? (타겟 고객 정의)",
  "5. 사용자는 어떤 상황에서 이 문제를 겪게 되나요? (문제 발생 시나리오)",
  "6. 현재 사용자들은 이 문제를 어떻게 해결하고 있나요? (기존 해결책 또는 대체재)",
  "7. 우리 앱이 문제를 성공적으로 해결했다는 것을 어떻게 확인할 수 있을까요? (성공 지표)",
  "8. 사용자들이 기존 방식을 버리고 우리 앱을 사용하게 만들 마케팅/전략은 무엇인가요? (고객 확보 전략)",
  "9. 사용하고 싶은 주요 기술 스택은 무엇인가요? (개발 환경)",
];

const exampleAnswers = [
  "사용자가 질문에 답하기만 하면, 전문적인 PRD(제품 요구사항 문서)와 단계별 실행 계획서, 그리고 AI 개발용 프롬프트를 자동으로 생성해주는 웹 앱",
  "초기 아이디어를 구체적인 개발 문서로 만드는 과정은 시간이 많이 걸리고, 특히 비개발자나 주니어 개발자에게는 막막한 일입니다. 이 과정을 자동화하여 누구나 쉽게 아이디어를 개발 초기 단계로 가져갈 수 있도록 돕고 싶습니다.",
  "아이디어를 10분 만에 실행 가능한 개발 계획으로 전환해주는 AI 기반 PRD 자동 생성 도우미",
  "사이드 프로젝트를 시작하려는 1인 개발자, 기획자, 학생, 스타트업 창업가",
  "좋은 아이디어가 떠올랐지만, 막상 개발에 착수하려고 하면 어디서부터 시작해야 할지, 어떤 내용을 정리해야 할지 몰라 프로젝트 진행이 막히는 상황",
  "Notion, Google Docs, 혹은 메모장에 생각을 파편적으로 정리하거나, 체계적인 문서화 없이 머릿속 구상만으로 개발을 시작하여 중간에 방향을 잃는 경우가 많습니다.",
  "사용자가 앱을 통해 생성된 README.md와 CONTEXT.md 결과물을 보고 '이대로 개발을 시작하면 되겠다'고 느끼며, 실제로 다운로드하여 사용하는 비율이 높게 나타날 때",
  "GitHub에 프로젝트를 공개하고 개발자 커뮤니티(예: 생활코딩, OKKY)나 사이드 프로젝트 모임에 홍보합니다. '10분 만에 아이디어 문서화'라는 명확한 가치를 전달하여 사용자의 참여를 유도합니다.",
  "Next.js, Tailwind CSS, TypeScript",
];

const exampleReadme = `\n# PRD Maker: AI 기반 제품 요구사항 문서(PRD) 자동 생성기\n\n## 1. 프로젝트 개요 (Overview)\n\n'PRD Maker'는 사용자의 아이디어를 전문적인 제품 요구사항 문서(PRD), 구체적인 실행 계획(CONTEXT.md), 그리고 AI 개발용 프롬프트로 자동 변환해주는 웹 애플리케이션입니다. 사용자는 9가지 핵심 질문에 답변하는 것만으로, 복잡한 문서 작업 없이 아이디어를 즉시 개발 가능한 청사진으로 만들 수 있습니다.\n\n## 2. 해결하려는 문제 (Problem Statement)\n\n많은 예비 창업가, 기획자, 개발자들이 훌륭한 아이디어를 가지고 있음에도 불구, 이를 체계적인 개발 문서로 구체화하는 데 큰 어려움을 겪습니다.\n- **시간 소모:** PRD 작성에는 많은 시간과 노력이 필요합니다.\n- **전문성 부족:** 어떤 항목을 포함해야 할지, 어떻게 구조화해야 할지 막막합니다.\n- **개발 지연:** 문서화 작업이 지연되면서 실제 개발 착수 또한 늦어집니다.\n이로 인해 수많은 아이디어들이 실행 단계로 나아가지 못하고 사장되는 문제를 해결하고자 합니다.\n\n## 3. 목표 (Goals)\n\n- **문서화 시간 80% 단축:** 사용자가 10분 이내에 PRD 초안을 완성할 수 있도록 돕습니다.\n- **개발 착수율 증대:** 아이디어를 가진 누구나 쉽게 개발 계획을 수립하고 실행에 옮기도록 장벽을 낮춥니다.\n- **표준화된 계획 제공:** AI 협업에 최적화된 단계별 실행 계획을 제공하여 개발 효율성을 높입니다.\n\n## 4. 사용자 요구사항 (User Requirements)\n\n### 4.1. 주요 기능 (Features)\n- **질문 기반 PRD 생성:** 9가지 핵심 질문에 대한 답변을 입력받아 PRD를 자동 생성합니다.\n- **실행 계획(CONTEXT) 생성:** 생성된 PRD를 기반으로, AI가 이해하고 실행할 수 있는 단계별 개발 계획을 생성합니다.\n- **AI 프롬프트 제공:** 위 두 문서를 생성하기 위해 사용된 최종 프롬프트를 사용자에게 제공하여, 다른 AI 툴에서도 활용할 수 있도록 합니다.\n- **결과물 편집 및 저장:** 생성된 모든 텍스트(PRD, CONTEXT, Prompt)를 사용자가 직접 편집하고, .md 또는 .txt 파일로 다운로드할 수 있습니다.\n\n### 4.2. 사용자 스토리 (User Stories)\n- **As a 1인 개발자,** 나는 사이드 프로젝트 아이디어를 빠르게 문서화하고 개발 계획을 세워, 즉시 코딩에 착수하고 싶다.\n- **As a 비전공 기획자,** 나는 내 아이디어를 개발자가 명확히 이해할 수 있는 전문적인 문서로 만들어, 원활하게 소통하고 싶다.\n\n## 5. 기술 스택 (Tech Stack)\n- **Frontend:** Next.js, Tailwind CSS, TypeScript\n\n`;

const exampleContext = `\n### Project: PRD Maker 웹 앱 개발 실행 계획\n\n#### Phase 1: 프로젝트 초기 설정 및 기본 UI 구현 (1일차)\n\n1.  **[환경설정]** \`create-next-app\`을 사용하여 TypeScript, Tailwind CSS 기반의 Next.js 프로젝트를 생성합니다.\n    -   \`npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias\`\n2.  **[UI]** \`src/app/page.tsx\` 파일에 메인 페이지의 기본 레이아웃을 구성합니다.\n    -   헤더: 'PRD Maker' 타이틀\n    -   메인: 질문 폼이 위치할 영역\n    -   푸터: 저작권 및 간단한 정보\n3.  **[UI]** 9가지 질문과 답변을 입력할 \`<textarea>\`로 구성된 폼을 하드코딩하여 구현합니다.\n    -   \`useState\`를 사용하여 각 답변을 상태로 관리합니다.\n\n#### Phase 2: 프롬프트 생성 및 결과 표시 기능 구현 (2일차)\n\n4.  **[기능]** 모든 질문에 답변이 입력되었는지 확인하는 로직을 구현하고, 충족 시 '프롬프트 생성' 버튼을 활성화합니다.\n5.  **[기능]** '프롬프트 생성' 버튼 클릭 시, \`handleGeneratePrompt\` 함수를 실행하여 상세 프롬프트를 생성하고, \`prompt\` 상태에 저장합니다.\n6.  **[UI]** 생성된 프롬프트를 화면에 표시하는 영역을 구현합니다.\n    -   프롬프트 텍스트가 잘 보이도록 검은색으로 스타일을 지정합니다.\n    -   프롬프트 영역 하단에 '문서 생성하기' 버튼을 추가합니다.\n\n#### Phase 3: 최종 문서 생성 및 부가 기능 구현 (3일차)\n\n7.  **[기능]** '문서 생성하기' 버튼 클릭 시, \`handleGenerateDocuments\` 함수를 실행하여 미리 준비된 예시 README와 CONTEXT를 각 상태에 저장합니다.\n8.  **[UI]** 생성된 README와 CONTEXT를 각각 별도의 카드 UI로 화면에 표시합니다.\n9.  **[기능]** 각 결과물(Prompt, README, CONTEXT)을 클립보드에 복사하는 'Copy' 버튼과, 파일로 저장하는 'Save' 버튼 기능을 구현합니다.\n    -   'Save' 기능은 \`Blob\`과 \`URL.createObjectURL\`을 사용합니다.\n\n#### Phase 4: (선택) LLM 연동 및 고도화\n\n10. **[연동]** OpenAI API 연동을 위한 API 라우트(\`/api/generate\`)를 생성합니다.\n11. **[기능]** '문서 생성하기' 로직을 수정하여, 프롬프트를 이 API로 전송하고 실제 AI의 응답을 받아 화면에 표시하도록 변경합니다.\n`;


export default function Home() {
  const [answers, setAnswers] = useState<string[]>(exampleAnswers);
  const [prompt, setPrompt] = useState<string>('');
  const [readme, setReadme] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [showExamples, setShowExamples] = useState<boolean>(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const isAllAnswered = answers.every(answer => answer.trim() !== '');

  const handleGeneratePrompt = () => {
    const qaSection = questions
      .map((q, i) => {
        return `${q}\n답변: ${answers[i]}`;
      })
      .join('\n\n---\n\n');

    const generatedPrompt = `\n당신은 20년차 시니어 개발자이자 뛰어난 프로덕트 매니저(PM)입니다.\n당신의 임무는 사용자의 아이디어를 기반으로, 즉시 개발에 착수할 수 있는 매우 구체적이고 전문적인 프로젝트 문서를 작성하는 것입니다.\n\n아래 사용자의 답변을 바탕으로, 다음 두 가지 문서를 생성해주세요.\n\n1.  **README.md (제품 요구사항 문서, PRD):**\n    *   이 문서가 그 자체로 완결된 PRD가 되어야 합니다.\n    *   포함할 내용: 프로젝트 개요, 해결하려는 문제, 목표, 사용자 요구사항(주요 기능, 사용자 스토리 포함), 기술 스택 등 전문적인 내용을 모두 포함해주세요.\n    *   누가 읽어도 명확하게 이해할 수 있도록 논리적이고 체계적으로 작성해주세요.\n\n2.  **CONTEXT.md (단계별 실행 계획):**\n    *   이 프로젝트를 처음부터 완성까지 개발하기 위한, 구체적이고 단계적인 실행 계획(Step-by-step plan)을 작성해주세요.\n    *   각 단계는 CLI 기반 AI 개발툴이 이해하고 바로 실행할 수 있을 정도로 명확하고 상세해야 합니다. (예: "[환경설정] create-next-app을 사용하여...")\n    *   개발 단계를 현실적으로 구분하고(예: Phase 1, 2, 3), 각 단계별로 수행할 작업을 구체적으로 명시해주세요.\n\n---\n[사용자 답변]\n\n${qaSection}\n---\n\n위 내용을 바탕으로, "readme"와 "context"를 key로 하는 JSON 객체 형식으로 최종 결과물을 출력해주세요. 모든 문서는 반드시 한국어로 작성되어야 합니다.\n`;
    setPrompt(generatedPrompt);
    setShowExamples(true); // Show examples when prompt is generated
    setReadme(exampleReadme);
    setContext(exampleContext);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('클립보드에 복사되었습니다!');
  };

  const handleSave = (filename: string, text: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">PRD Maker</h1>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`} className="block text-lg font-medium mb-2">
              {question}
            </label>
            <textarea
              id={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
      </div>

      {isAllAnswered && (
        <div className="mt-8 text-center">
          <button
            onClick={handleGeneratePrompt}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            프롬프트 생성
          </button>
        </div>
      )}

      {prompt && (
        <div className="mt-8 p-6 bg-gray-100 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">1. AI 프롬프트</h2>
            <div>
              <button onClick={() => handleCopy(prompt)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">복사</button>
              <button onClick={() => handleSave('prompt.txt', prompt)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">저장</button>
            </div>
          </div>
          <pre className="bg-white p-4 rounded-md whitespace-pre-wrap text-black">{prompt}</pre>
          
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <h3 className="font-bold">2. 다음 단계 안내</h3>
            <p>1. 위 &apos;저장&apos; 버튼을 눌러 <code className="font-bold">prompt.txt</code> 파일을 로컬 PC의 프로젝트 폴더에 저장하세요.</p>
            <p>2. 로컬 PC의 Gemini CLI에게 다음 명령을 내려 최종 문서를 생성하세요:</p>
            <p className="mt-2"><code className="bg-gray-200 p-1 rounded">&quot;prompt.txt 파일을 읽고 README.md와 CONTEXT.md를 만들어줘&quot;</code></p>
          </div>
        </div>
      )}

      {showExamples && (
        <>
          <div className="mt-8 p-6 bg-gray-50 rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">최종 결과물 예시 (README.md)</h2>
            <div className="bg-white p-4 rounded-md whitespace-pre-wrap text-black border">{readme}</div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">최종 결과물 예시 (CONTEXT.md)</h2>
            <div className="bg-white p-4 rounded-md whitespace-pre-wrap text-black border">{context}</div>
          </div>
        </>
      )}
    </main>
  );
}