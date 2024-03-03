import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

type RootLayoutProps = {
  children: React.ReactNode;
};
export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <header>
        <ThemeToggle />{" "}
      </header>
      {children}
    </>
  );
};
