import { RotateCcw, Sparkles, X } from 'lucide-react';

interface BikashHeaderProps {
  configured: boolean;
  activeModel: string | null;
  onClose: () => void;
  onReset: () => void;
}

function shortModelName(id: string | null): string {
  if (!id) return '';
  // "meta-llama/llama-3.3-70b-instruct:free" → "llama-3.3-70b"
  const noPrefix = id.includes('/') ? id.split('/')[1] : id;
  return noPrefix.replace(/:free$/, '').replace(/-instruct$/, '');
}

export default function BikashHeader({
  configured,
  activeModel,
  onClose,
  onReset,
}: BikashHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[#D7E2EA]/15 px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#18011F] via-[#7621B0] to-[#BE4C00] text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium uppercase tracking-widest text-[#D7E2EA]">
            Bikash · AI Twin
          </span>
          <span className="truncate text-[10px] uppercase tracking-widest text-[#D7E2EA]/55">
            {!configured
              ? 'Setup required'
              : activeModel
              ? `↳ ${shortModelName(activeModel)} (free)`
              : 'Free OpenRouter cascade'}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset chat"
          title="Reset chat"
          className="grid h-7 w-7 place-items-center rounded-md text-[#D7E2EA]/55 transition-colors hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-7 w-7 place-items-center rounded-md text-[#D7E2EA]/55 transition-colors hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
