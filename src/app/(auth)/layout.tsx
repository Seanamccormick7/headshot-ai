import Logo from "@/components/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center">{children}</div>
  );
}
