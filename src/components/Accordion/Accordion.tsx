import type { ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  leading?: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  activeIndex: number | null;
  onToggle: (index: number) => void;
  bordered?: boolean;
}

export function Accordion({ items, activeIndex, onToggle, bordered = true }: AccordionProps) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <article
            key={item.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
              isOpen
                ? 'border-primary/30 bg-white shadow-sm shadow-primary/10'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <button
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-slate-800 transition md:text-base"
              type="button"
              aria-expanded={isOpen}
              onClick={() => onToggle(index)}
            >
              <span className="flex items-center gap-3">
                {item.leading && <span className="shrink-0">{item.leading}</span>}
                <span>{item.title}</span>
              </span>
              <span
                className={`shrink-0 text-xl font-light text-primary transition-transform duration-200 ${
                  isOpen ? 'rotate-45' : 'rotate-0'
                }`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div
                className={`${bordered ? 'border-t border-slate-100 ' : ''}px-5 pb-5 pt-3 text-sm text-slate-600 md:text-base`}
              >
                {item.content}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
