import { SUGGESTIONS } from './constants';

interface BikashSuggestionsProps {
  onPick: (q: string) => void;
  disabled?: boolean;
}

export default function BikashSuggestions({ onPick, disabled }: BikashSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-t border-[#D7E2EA]/15 px-4 py-3">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          disabled={disabled}
          className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-[11px] text-[#D7E2EA]/80 transition-colors hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA] disabled:opacity-50"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
