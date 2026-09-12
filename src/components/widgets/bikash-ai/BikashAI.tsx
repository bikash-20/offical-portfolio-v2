import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useBikashChat } from './useBikashChat';
import BikashPanel from './BikashPanel';
import {
  DEFAULT_PANEL_SIZE,
  loadPanelSize,
  savePanelSize,
  type PanelSize,
} from './constants';

/**
 * Floating Bikash AI widget — gradient bubble (bottom-right) that opens
 * an expandable chat panel with markdown + code + LaTeX rendering and a
 * cascading fallback chain of free OpenRouter models.
 */
export default function BikashAI() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<PanelSize>(() => loadPanelSize());
  const state = useBikashChat();

  useEffect(() => {
    if (open) savePanelSize(size);
  }, [size, open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close Bikash AI' : 'Open Bikash AI'}
        onClick={() => setOpen((o) => !o)}
        className="fixed right-5 bottom-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_10px_40px_rgba(182,0,168,0.45)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
        style={{
          background:
            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        }}
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#B600A8] opacity-30" />
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <BikashPanel
              state={state}
              size={size}
              onResize={setSize}
              onClose={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { DEFAULT_PANEL_SIZE };
