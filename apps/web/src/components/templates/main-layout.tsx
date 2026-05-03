import { Header } from '../organisms/header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {children}
        </div>
      </main>
      <footer className="border-t border-border py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by TechLead. The source code is available on GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
}
