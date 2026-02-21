interface KeyInterpretationNoteProps {
  message: string;
  keyInterpretationLabel: string;
}

export function KeyInterpretationNote({ message, keyInterpretationLabel }: KeyInterpretationNoteProps) {
  if (!message) return null;

  return (
    <div className="mb-8 text-center">
      <div className="inline-block text-xs text-amber-700 bg-amber-50 rounded-lg px-4 py-2 max-w-lg">
        <span className="font-medium">{keyInterpretationLabel}：</span>
        <span className="text-amber-600 ml-1">{message}</span>
      </div>
    </div>
  );
}
