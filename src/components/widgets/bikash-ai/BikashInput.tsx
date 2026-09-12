import { useEffect, useRef } from 'react';
import { Send, Square } from 'lucide-react';

interface BikashInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  sending: boolean;
  onAbort: () => void;
}

export default function BikashInput({
  value,
  onChange,
  onSubmit,
  sending,
  onAbort,
}: BikashInputProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow up to 4 lines.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }, [value]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (sending) return;
        onSubmit();
      }}
      className="flex items-end gap-2 border-t border-[#D7E2EA]/15 p-3"
    >
      <textarea
        ref={inputRef}
        value={value}
        rows={1}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sending) onSubmit();
          }
        }}
        placeholder="Ask Bikash anything…"
        className="flex-1 resize-none rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4 py-2 text-sm leading-snug text-[#D7E2EA] outline-none placeholder:text-[#D7E2EA]/40 focus:border-[#B600A8]"
        style={{ maxHeight: 100 }}
      />
      {sending ? (
        <button
          type="button"
          onClick={onAbort}
          aria-label="Stop"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] transition-opacity hover:bg-[#D7E2EA]/10"
        >
          <Square className="h-3.5 w-3.5 fill-current" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#B600A8] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
