import "./globals.css";
import MainLayout from "@/components/MainLayout";

export const metadata = {
  title: "HVAC Management",
  description: "Production HVAC Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

