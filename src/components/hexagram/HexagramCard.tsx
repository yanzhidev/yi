import { cn } from '../../utils/styles';
import { HexagramBasicInfo } from './HexagramBasicInfo';
import { HexagramText } from './HexagramText';
import { HexagramImage } from './HexagramImage';
import { HexagramInterpretation } from './HexagramInterpretation';
import { ChangingLinesInterpretation } from './ChangingLinesInterpretation';
import { LineRelationsDisplay } from './LineRelationsDisplay';
import type { HexagramCastResult } from '../../utils/iching';

interface HexagramCardProps {
  result: HexagramCastResult;
  hexagram: any;
  title: string;
  variant?: 'original' | 'changed';
  isKeyHexagram?: boolean;
  showInterpretation?: boolean;
  showLineRelations?: boolean;
  onToggleInterpretation?: () => void;
  onToggleLineRelations?: () => void;
  isKeyLine?: (position: number) => boolean;
  language: string;
  translations: any;
}

export function HexagramCard({
  result,
  hexagram,
  title,
  variant = 'original',
  isKeyHexagram = false,
  showInterpretation = false,
  showLineRelations = false,
  onToggleInterpretation,
  onToggleLineRelations,
  isKeyLine,
  language,
  translations
}: HexagramCardProps) {
  if (!hexagram) return null;

  const isChangedVariant = variant === 'changed';
  const bgColor = isChangedVariant ? 'bg-amber-50' : 'bg-white';
  const borderColor = isChangedVariant ? 'border-amber-200' : 'border-stone-200';

  const changingLinesCount = variant === 'original' && result.changingLines.length > 0 ? result.changingLines.length : undefined;
  const changingLinesCountLabel = variant === 'original' && result.changingLines.length > 0 ? translations.changingLinesCount : undefined;

  return (
    <div className={cn("rounded-3xl p-8 shadow-md border", bgColor, borderColor)}>
      <HexagramBasicInfo
        result={result}
        hexagram={hexagram}
        title={title}
        changingLinesCount={changingLinesCount}
        changingLinesCountLabel={changingLinesCountLabel}
        isKeyHexagram={isKeyHexagram}
        variant={variant}
      />

      <HexagramText
        hexagram={hexagram}
        isKeyHexagram={isKeyHexagram}
        variant={variant}
        translations={{
          guaText: translations.guaText,
          tuan: translations.tuan,
          daXiang: translations.daXiang,
          keyInterpretation: translations.keyInterpretation
        }}
      />

      <HexagramImage
        hexagram={hexagram}
        altText={translations.daxiangImageAlt.replace('{0}', hexagram.name)}
      />

      <HexagramInterpretation
        hexagram={hexagram}
        isExpanded={showInterpretation}
        onToggle={onToggleInterpretation || (() => {})}
        variant={variant}
        translations={{
          interpretation: translations.interpretation,
          plainTranslation: translations.plainTranslation,
          lifeInspiration: translations.lifeInspiration,
          decisionAdvice: translations.decisionAdvice
        }}
      />

      {variant === 'original' && (
        <>
          <ChangingLinesInterpretation
            result={result}
            currentHexagram={hexagram}
            changedHexagram={isChangedVariant ? hexagram : null}
            isKeyLine={isKeyLine || (() => false)}
            translations={{
              lineInterpretation: translations.lineInterpretation,
              changingLines: translations.changingLines,
              changedHexagram: translations.changedHexagram,
              keyInterpretation: translations.keyInterpretation,
              yaoText: translations.yaoText,
              xiang: translations.xiang
            }}
          />

          <LineRelationsDisplay
            result={result}
            currentHexagram={hexagram}
            isExpanded={showLineRelations}
            onToggle={onToggleLineRelations || (() => {})}
            language={language}
            translations={{
              lineRelationsInterpretation: translations.lineRelationsInterpretation,
              changingLine: translations.changingLine,
              dangWei: translations.dangWei,
              notDangWei: translations.notDangWei,
              dangWeiAnalysis: translations.dangWeiAnalysis,
              yingRelation: translations.yingRelation,
              chengChengRelation: translations.chengChengRelation,
              modernInterpretation: translations.modernInterpretation
            }}
          />
        </>
      )}
    </div>
  );
}
