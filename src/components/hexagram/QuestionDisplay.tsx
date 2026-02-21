interface QuestionDisplayProps {
  question: string;
  yourQuestionLabel: string;
}

export function QuestionDisplay({ question, yourQuestionLabel }: QuestionDisplayProps) {
  if (!question) return null;

  return (
    <div className="mb-8 text-center">
      <p className="text-xs text-stone-500 tracking-wider mb-2">{yourQuestionLabel}</p>
      <p className="text-lg text-stone-800 font-medium">「{question}」</p>
    </div>
  );
}
