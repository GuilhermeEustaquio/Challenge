import type { PropsWithChildren } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}
