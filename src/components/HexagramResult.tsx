import { assessFortune } from '../utils/fortuneAssessment/index';
import { useLanguage } from '../contexts/LanguageContext';
import { useHexagramInterpretation } from '../hooks/useHexagramInterpretation';
import {
  QuestionDisplay,
  KeyInterpretationNote,
  HexagramCard,
  FortuneAssessmentSection
} from './hexagram';
import { 
  getHexagramById, 
  type HexagramCastResult
} from '../utils/iching';

interface HexagramDisplayProps {
  result: HexagramCastResult;
  question: string;
  showInterpretation: boolean;
  showChangedInterpretation: boolean;
  showLineRelations: boolean;
  onToggleInterpretation: () => void;
  onToggleChangedInterpretation: () => void;
  onToggleLineRelations: () => void;
}

export function HexagramResult({ 
  result, 
  question, 
  showInterpretation, 
  showChangedInterpretation,
  showLineRelations,
  onToggleInterpretation,
  onToggleChangedInterpretation,
  onToggleLineRelations
}: HexagramDisplayProps) {
  const { t, language } = useLanguage();
  const { keyInterpretationInfo, isKeyLine, isKeyMainGua, isKeyChangedGua } = useHexagramInterpretation(result);

  // 获取卦象数据
  const currentHexagram = getHexagramById(result.hexagramId);
  const changedHexagram = result.changedHexagramId ? getHexagramById(result.changedHexagramId) : null;

  // 计算吉凶判断
  const fortuneAssessment = assessFortune(result, undefined, language);

  return (
    <>
      {/* 显示已输入的问题 */}
      <QuestionDisplay 
        question={question}
        yourQuestionLabel={t.yourQuestion}
      />

      {/* 变爻重点解读规则 */}
      {keyInterpretationInfo && (
        <KeyInterpretationNote 
          message={keyInterpretationInfo.message}
          keyInterpretationLabel={t.keyInterpretationNote}
        />
      )}

      {/* 本卦 */}
      <HexagramCard
        result={result}
        hexagram={currentHexagram}
        title={t.originalHexagram}
        variant="original"
        isKeyHexagram={isKeyMainGua}
        showInterpretation={showInterpretation}
        showLineRelations={showLineRelations}
        onToggleInterpretation={onToggleInterpretation}
        onToggleLineRelations={onToggleLineRelations}
        isKeyLine={isKeyLine}
        language={language}
        translations={t}
      />

      {/* 变卦（如果有） */}
      {changedHexagram && result.changingLines.length > 0 && (
        <HexagramCard
          result={result}
          hexagram={changedHexagram}
          title={t.changedHexagram}
          variant="changed"
          isKeyHexagram={isKeyChangedGua}
          showInterpretation={showChangedInterpretation}
          onToggleInterpretation={onToggleChangedInterpretation}
          language={language}
          translations={t}
        />
      )}

      {/* 吉凶判断 */}
      <FortuneAssessmentSection
        assessment={fortuneAssessment}
        translations={{
          fortuneAssessment: t.fortuneAssessment
        }}
      />
    </>
  );
}
