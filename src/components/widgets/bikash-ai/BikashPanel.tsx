import { useEffect, useRef } from 'react';
import { BikashMessage } from './BikashMessage';
import BikashInput from './BikashInput';
import BikashSuggestions from './BikashSuggestions';
import BikashHeader from './BikashHeader';
import {
  MIN_PANEL_SIZE,
  MAX_PANEL_SIZE,
  type PanelSize,
} from './constants';
import type { BikashChatState } from './useBikashChat';

interface BikashPanelProps {
  state: BikashChatState;
  size: PanelSize;
  onResize: (next: PanelSize) => void;
  onClose: () => void;
}

export default function BikashPanel({ state, size, onResize, onClose }: BikashPanelProps) {
  const { messages, input, sending, configured, activeModel, send, abort, setInput, reset } =
    state;

  const listRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // Resize handle drag (bottom-right corner).
  useEffect(() => {
    const handle = panelRef.current?.querySelector<HTMLDivElement>(
      '.bikash-resize-handle'
    );
    if (!handle) return;

    let startX = 0;
    let startY = 0;
    let startW = 0;
    let startH = 0;
    let dragging = false;

    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const next: PanelSize = {
        w: Math.min(MAX_PANEL_SIZE.w, Math.max(MIN_PANEL_SIZE.w, startW + dx)),
        h: Math.min(MAX_PANEL_SIZE.h, Math.max(MIN_PANEL_SIZE.h, startH + dy)),
      };
      onResize(next);
    };
    const onUp = () => {
      dragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    const onDown = (e: MouseEvent) => {
      e.preventDefault();
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startW = size.w;
      startH = size.h;
      document.body.style.cursor = 'nwse-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };
    handle.addEventListener('mousedown', onDown);
    return () => {
      handle.removeEventListener('mousedown', onDown);
    };
  }, [onResize, size.h, size.w]);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-24 right-5 z-50 flex flex-col overflow-hidden rounded-2xl border border-[#D7E2EA]/20 bg-[#0C0C0C]/95 shadow-2xl backdrop-blur-xl sm:right-6"
      style={{
        width: size.w,
        height: size.h,
        maxWidth: 'calc(100vw - 2.5rem)',
        maxHeight: 'calc(100vh - 8rem)',
      }}
    >
      <BikashHeader
        configured={configured}
        activeModel={activeModel}
        onClose={onClose}
        onReset={reset}
      />

      {!configured && (
        <div className="border-b border-amber-400/20 bg-amber-400/5 px-4 py-2.5 text-[11px] leading-relaxed text-amber-200/90">
          Add <code>VITE_OPENROUTER_API_KEY</code> to a
          <code> .env.local</code> file and restart the dev server to enable
          live responses.
        </div>
      )}

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <BikashMessage
            key={m.id}
            role={m.role}
            content={m.content}
            streaming={m.role === 'assistant' && sending && !m.content}
          />
        ))}
      </div>

      {messages.length <= 1 && (
        <BikashSuggestions onPick={send} disabled={sending} />
      )}

      <BikashInput
        value={input}
        onChange={setInput}
        onSubmit={() => send()}
        sending={sending}
        onAbort={abort}
      />

      <div className="bikash-resize-handle" aria-hidden="true" />
    </div>
  );
}
