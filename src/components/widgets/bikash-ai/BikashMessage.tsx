import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sparkles } from 'lucide-react';

interface BikashMessageProps {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

/**
 * Detect a language tag at the start of a fenced code block.
 * Returns the trimmed code without the fence, plus the language.
 */
function parseCodeBlock(raw: string): { lang: string; code: string } {
  // raw starts with ```lang\n ... \n```
  const firstLineEnd = raw.indexOf('\n');
  const firstLine = raw.slice(0, firstLineEnd).trim();
  const lang = firstLine.replace(/^```/, '').trim() || 'text';
  const code = raw
    .slice(firstLineEnd + 1)
    .replace(/```\s*$/, '')
    .replace(/\n$/, '');
  return { lang, code };
}

function CodeBlock({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [meta] = (className ?? '').split(' ');
  const lang = (meta || 'text').replace('language-', '');
  const code = useMemo(() => {
    const text = String(children ?? '').replace(/\n$/, '');
    return text;
  }, [children]);

  // For very short "code" inside inline contexts, fall back to inline styling.
  const isInline = !code.includes('\n') && code.length < 60 && lang === 'text';

  if (isInline) {
    return <code className={className}>{children}</code>;
  }

  return (
    <SyntaxHighlighter
      language={lang || 'text'}
      style={oneDark}
      customStyle={{
        margin: 0,
        padding: '10px 12px',
        background: '#1a1b26',
        fontSize: 12,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
      wrapLongLines={false}
    >
      {code}
    </SyntaxHighlighter>
  );
}

function BikashMessageInner({ role, content, streaming }: BikashMessageProps) {
  if (role === 'user') {
    return (
      <div className="ml-auto max-w-[88%] min-w-0 rounded-2xl rounded-br-md bg-[#B600A8]/35 px-4 py-2.5 text-sm leading-relaxed text-white shadow-[0_4px_16px_rgba(182,0,168,0.25)] break-words">
        {content}
      </div>
    );
  }

  const isEmpty = !content && streaming;

  return (
    <div className="mr-auto flex max-w-[92%] min-w-0 gap-2">
      <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#18011F] via-[#7621B0] to-[#BE4C00] text-white">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="bikash-md min-w-0 flex-1 rounded-2xl rounded-bl-md bg-[#D7E2EA]/10 px-4 py-2.5 text-[#D7E2EA] shadow-[inset_0_0_0_1px_rgba(215,226,234,0.06)]">
        {isEmpty ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#D7E2EA]/70" />
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#D7E2EA]/70 [animation-delay:120ms]" />
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#D7E2EA]/70 [animation-delay:240ms]" />
          </span>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code: CodeBlock as never,
              a: ({ children, href }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export const BikashMessage = memo(BikashMessageInner);

export { parseCodeBlock };
