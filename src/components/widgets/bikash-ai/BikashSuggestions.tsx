import { SUGGESTIONS } from './constants';

interface BikashSuggestionsProps {
  onPick: (q: string) => void;
  disabled?: boolean;
}

/**
 * Horizontally-scrolling suggestion row. Single row keeps the suggestion
 * strip to ~36px tall instead of 180px+ when wrapping — critical so the
 * message list above gets the remaining vertical space.
 */
export default function BikashSuggestions({ onPick, disabled }: BikashSuggestionsProps) {
  return (
    <div
      data-lenis-prevent
      className="shrink-0 border-t border-[#D7E2EA]/15 px-3 py-2"
    >
      <div
        className="flex w-full gap-1.5 overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            disabled={disabled}
            className="shrink-0 whitespace-nowrap rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-[11px] text-[#D7E2EA]/80 transition-colors hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA] disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
