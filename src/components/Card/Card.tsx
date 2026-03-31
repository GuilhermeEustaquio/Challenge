import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}

export function Card({ title, description, image, children }: CardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-md ring-1 ring-slate-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/20">
      {image && <img src={image} alt={title} className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />}
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold text-dark">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        {children}
      </div>
    </article>
  );
}
