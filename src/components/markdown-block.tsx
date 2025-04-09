import { memo } from 'react';

import ReactMarkdown from 'react-markdown';

interface MarkdownBlockProps {
  content: string;
}

export const MarkdownBlock = memo<MarkdownBlockProps>(
  ({ content }) => {
    return (
      <ReactMarkdown
        components={{
          a: ({ children, ...props }) => {
            return (
              <a
                {...props}
                className="text-brand-5 hover:text-brand-4 active:text-brand-6"
                target="_blank"
                rel="noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.content === nextProps.content;
  },
);

MarkdownBlock.displayName = 'MarkdownBlock';
