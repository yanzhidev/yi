import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Info, BarChart3, Target, Shield, Zap, ChevronDown } from 'lucide-react';
import { Scroll as ScrollIcon } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../utils/styles';
import { 
  getFortuneLevels
} from '../utils/fortuneAssessment/index';
import type { 
  FortuneAssessment, 
  FortuneLevel
} from '../utils/fortuneAssessment/index';

interface FortuneAssessmentDisplayProps {
  assessment: FortuneAssessment;
}

export function FortuneAssessmentDisplay({ 
  assessment 
}: FortuneAssessmentDisplayProps) {
  const { t, language } = useLanguage();
  
  const { 
    totalScore, 
    fortuneLevel, 
    overallAdvice, 
    confidence,
    detailedAnalysis,
    weights,
    hexagramTextScore,
    trigramRelationScore,
    linesPositionScore,
    changingLinesAdjustment
  } = assessment;

  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const levelConfig = getFortuneLevels(language)[fortuneLevel];
  const scoreColor = getScoreColor(totalScore);
  const confidenceColor = getConfidenceColor(confidence);
  
  // 获取翻译后的标签
  const getFortuneLevelLabel = (level: FortuneLevel) => {
    switch (level) {
      case 'extremely_auspicious':
        return t.extremelyAuspicious;
      case 'very_auspicious':
        return t.veryAuspicious;
      case 'auspicious':
        return t.auspicious;
      case 'neutral':
        return t.neutral;
      case 'inauspicious':
        return t.inauspicious;
      case 'very_inauspicious':
        return t.veryInauspicious;
      case 'extremely_inauspicious':
        return t.extremelyInauspicious;
      default:
        return levelConfig.label;
    }
  };

  return (
    <div className="space-y-0">
      {/* 吉凶等级总览 */}
      <div className="pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            {getFortuneIcon(fortuneLevel)}
            <h3 className="text-lg font-semibold text-stone-800">{t.fortuneAssessment}</h3>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-stone-500">{t.confidence}</span>
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              confidenceColor.bg, confidenceColor.text
            )}>
              {confidence}%
            </div>
          </div>
        </div>

        {/* 权重信息 */}
        {assessment.changedHexagramId && (
          <div className="mb-4 p-3 bg-stone-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-stone-700">
              <span className="font-medium">{t.benGuaWeight}：</span>
              <span className="text-stone-900 font-bold">{weights.originalWeight}%</span>
              <span className="text-stone-500">·</span>
              <span className="font-medium">{t.bianGuaWeight}：</span>
              <span className="text-stone-900 font-bold">{weights.changedWeight}%</span>
            </div>
          </div>
        )}

        {/* 吉凶等级显示 */}
        <div className="flex items-center gap-4 mb-4">
          <div 
            className={cn(
              "px-6 py-3 rounded-xl text-center font-bold text-lg shadow-sm",
              scoreColor.bg, scoreColor.text
            )}
            style={{ backgroundColor: levelConfig.color + '15', color: levelConfig.color }}
          >
            {getFortuneLevelLabel(fortuneLevel)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-stone-600">{t.overallScore}</span>
              <span className="text-2xl font-bold" style={{ color: levelConfig.color }}>
                {totalScore.toFixed(1)}
              </span>
              <span className="text-sm text-stone-500">/100</span>
            </div>
            {/* 评分进度条 */}
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${totalScore}%`,
                  backgroundColor: levelConfig.color 
                }}
              />
            </div>
          </div>
        </div>

        {/* 总体建议 */}
        <div className="bg-stone-50 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-stone-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-stone-700 leading-relaxed">
              {overallAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="border-t border-stone-200"></div>

      {/* 各维度评分 */}
      <div className="py-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-stone-700" />
          <h3 className="text-lg font-semibold text-stone-800">{t.dimensionAnalysis}</h3>
        </div>

        <div className="space-y-4">
          {/* 卦辞断语评分 */}
          <ScoreItem
            title={t.hexagramTextScore}
            score={hexagramTextScore.score}
            weight="40%"
            icon={ScrollIcon}
            color="#dc2626"
            description={hexagramTextScore.keywords.join(t.keywordSeparator)}
          />

          {/* 上下卦关系评分 */}
          <ScoreItem
            title={t.trigramRelationScore}
            score={trigramRelationScore.score}
            weight="30%"
            icon={Target}
            color="#ea580c"
            description={t.trigramRelationPattern.replace('{0}', trigramRelationScore.upperTrigram).replace('{1}', trigramRelationScore.lowerTrigram)}
          />

          {/* 爻位综合评分 */}
          <ScoreItem
            title={t.linesPositionScore}
            score={linesPositionScore.score}
            weight="30%"
            icon={Shield}
            color="#d97706"
            description={t.changingLinesPattern.replace('{0}', linesPositionScore.changingLinesCount.toString())}
          />

          {/* 变爻调整 */}
          {changingLinesAdjustment.adjustment !== 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-stone-700">{t.changingLinesAdjustment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm font-bold",
                    changingLinesAdjustment.adjustment > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {changingLinesAdjustment.adjustment > 0 ? '+' : ''}{changingLinesAdjustment.adjustment.toFixed(1)}
                  </span>
                  <span className="text-xs text-stone-500">{changingLinesAdjustment.specialCase}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 分隔线 */}
      <div className="border-t border-stone-200"></div>

      {/* SWOT 分析 */}
      <div className="py-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-stone-700" />
          <h3 className="text-lg font-semibold text-stone-800">{t.situationAnalysis}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 优势 */}
          <SWOTCard
            title={t.strengths}
            items={detailedAnalysis.strengths}
            icon={CheckCircle}
            color="green"
          />

          {/* 劣势 */}
          <SWOTCard
            title={t.weaknesses}
            items={detailedAnalysis.weaknesses}
            icon={AlertTriangle}
            color="red"
          />

          {/* 机遇 */}
          <SWOTCard
            title={t.opportunities}
            items={detailedAnalysis.opportunities}
            icon={TrendingUp}
            color="blue"
          />

          {/* 威胁 */}
          <SWOTCard
            title={t.threats}
            items={detailedAnalysis.threats}
            icon={TrendingDown}
            color="orange"
          />
        </div>
      </div>

      {/* 分隔线 */}
      <div className="border-t border-stone-200"></div>

      {/* 详细分析（可折叠） */}
      <div className="py-6">
        <button
          onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
          className="flex items-center gap-2 w-full text-left group mb-4"
        >
          <ScrollIcon className="w-4 h-4 text-stone-600" />
          <span className="text-sm text-stone-700 font-semibold">{t.detailedAnalysis}</span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-stone-500 ml-auto transition-transform duration-300",
              showDetailedAnalysis && "rotate-180"
            )} 
          />
        </button>
        
        {showDetailedAnalysis && (
          <div className="space-y-4">
            {/* 卦辞详细分析 */}
            <DetailSection
              title={t.hexagramTextAnalysis}
              content={hexagramTextScore.reasoning}
              icon={ScrollIcon}
            />

            {/* 上下卦详细分析 */}
            <DetailSection
              title={t.trigramRelationAnalysis}
              content={trigramRelationScore.reasoning}
              icon={Target}
            />

            {/* 爻位详细分析 */}
            <DetailSection
              title={t.linesPositionAnalysis}
              content={linesPositionScore.reasoning}
              icon={Shield}
            />

            {/* 变爻详细分析 */}
            {changingLinesAdjustment.adjustment !== 0 && (
              <DetailSection
                title={t.changingLinesAnalysis}
                content={changingLinesAdjustment.reasoning}
                icon={Zap}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 评分项组件
interface ScoreItemProps {
  title: string;
  score: number;
  weight: string;
  icon: any;
  color: string;
  description: string;
}

function ScoreItem({ title, score, weight, icon: Icon, color, description }: ScoreItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 flex-1">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-sm font-medium text-stone-700">{title}</span>
        <span className="text-xs text-stone-500">({weight})</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-stone-600">{description}</span>
        <div className="flex items-center gap-2">
          <div className="w-16 bg-stone-200 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${score}%`,
                backgroundColor: color 
              }}
            />
          </div>
          <span className="text-sm font-bold text-stone-700 w-10 text-right">
            {score.toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
}

// SWOT 卡片组件
interface SWOTCardProps {
  title: string;
  items: string[];
  icon: any;
  color: string;
}

function SWOTCard({ title, items, icon: Icon, color }: SWOTCardProps) {
  const { t } = useLanguage();
  
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700'
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 space-y-2",
      colorClasses[color as keyof typeof colorClasses]
    )}>
      <div className="flex items-center gap-2 font-medium text-sm">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="text-xs leading-relaxed">
            • {item}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-xs opacity-75">{t.none}</div>
        )}
      </div>
    </div>
  );
}

// 详细分析段落组件
interface DetailSectionProps {
  title: string;
  content: string;
  icon: any;
}

function DetailSection({ title, content, icon: Icon }: DetailSectionProps) {
  return (
    <div className="bg-stone-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-stone-600" />
        <h4 className="font-medium text-stone-800">{title}</h4>
      </div>
      <pre className="text-xs text-stone-700 whitespace-pre-wrap leading-relaxed font-mono">
        {content}
      </pre>
    </div>
  );
}

// 获取吉凶图标
function getFortuneIcon(level: FortuneLevel) {
  const iconProps = { className: "w-5 h-5" };
  
  switch (level) {
    case 'extremely_auspicious':
    case 'very_auspicious':
    case 'auspicious':
      return <TrendingUp {...iconProps} className="text-green-600" />;
    case 'neutral':
      return <Minus {...iconProps} className="text-stone-600" />;
    case 'inauspicious':
    case 'very_inauspicious':
    case 'extremely_inauspicious':
      return <TrendingDown {...iconProps} className="text-red-600" />;
    default:
      return <Info {...iconProps} className="text-stone-600" />;
  }
}

// 获取评分颜色
function getScoreColor(score: number) {
  if (score >= 75) return { bg: 'bg-green-100', text: 'text-green-700' };
  if (score >= 60) return { bg: 'bg-lime-100', text: 'text-lime-700' };
  if (score >= 45) return { bg: 'bg-stone-100', text: 'text-stone-700' };
  if (score >= 30) return { bg: 'bg-amber-100', text: 'text-amber-700' };
  if (score >= 15) return { bg: 'bg-orange-100', text: 'text-orange-700' };
  return { bg: 'bg-red-100', text: 'text-red-700' };
}

// 获取置信度颜色
function getConfidenceColor(confidence: number) {
  if (confidence >= 80) return { bg: 'bg-green-100', text: 'text-green-700' };
  if (confidence >= 60) return { bg: 'bg-lime-100', text: 'text-lime-700' };
  if (confidence >= 40) return { bg: 'bg-stone-100', text: 'text-stone-700' };
  return { bg: 'bg-amber-100', text: 'text-amber-700' };
}
