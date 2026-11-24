import { AppCommandPalette } from "@/components/app/command-palette";

/** The signed-in app. Each screen draws Talvo's shell itself (see TalvoFrame); ⌘K is shared. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppCommandPalette />
      {children}
    </>
  );
}
