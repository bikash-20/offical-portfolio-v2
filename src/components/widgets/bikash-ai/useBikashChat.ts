import { useCallback, useRef, useState } from 'react';
import {
  BIKASH_SYSTEM_PROMPT,
  chatWithCascade,
  isOpenRouterConfigured,
  type ChatMessage,
} from '../../../lib/openrouter';
import { GREETING } from './constants';

export interface UiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

let msgCounter = 0;
const nextId = () => `m-${Date.now()}-${msgCounter++}`;

export interface BikashChatState {
  messages: UiMessage[];
  input: string;
  sending: boolean;
  activeModel: string | null;
  configured: boolean;
  send: (text?: string) => Promise<void>;
  abort: () => void;
  setInput: (v: string) => void;
  reset: () => void;
}

export function useBikashChat(): BikashChatState {
  const [messages, setMessages] = useState<UiMessage[]>(() => [
    { id: nextId(), role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([{ id: nextId(), role: 'assistant', content: GREETING }]);
    setInput('');
    setSending(false);
    setActiveModel(null);
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const send = useCallback(
    async (text?: string) => {
      const userText = (text ?? input).trim();
      if (!userText || sending) return;

      setInput('');
      setSending(true);
      setActiveModel(null);

      const userMsg: UiMessage = { id: nextId(), role: 'user', content: userText };
      const placeholder: UiMessage = {
        id: nextId(),
        role: 'assistant',
        content: '',
      };

      // Snapshot current history at send-time so we don't depend on stale state.
      const historySnapshot = messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
      const nextHistory: ChatMessage[] = [
        { role: 'system', content: BIKASH_SYSTEM_PROMPT },
        ...historySnapshot,
        { role: 'user', content: userText },
      ];

      setMessages((prev) => [...prev, userMsg, placeholder]);

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const reply = await chatWithCascade(
          nextHistory,
          ctrl.signal,
          (model) => setActiveModel(model)
        );
        setMessages((prev) =>
          prev.map((m) =>
            m.id === placeholder.id ? { ...m, content: reply } : m
          )
        );
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === placeholder.id
                ? {
                    ...m,
                    content: '_(request aborted)_ — try again whenever.',
                  }
                : m
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === placeholder.id
                ? {
                    ...m,
                    content:
                      'Something went wrong talking to the free models. ' +
                      ((err as Error).message ?? ''),
                  }
                : m
            )
          );
        }
      } finally {
        setSending(false);
        setActiveModel(null);
      }
    },
    [input, messages, sending]
  );

  return {
    messages,
    input,
    sending,
    activeModel,
    configured: isOpenRouterConfigured(),
    send,
    abort,
    setInput,
    reset,
  };
}
