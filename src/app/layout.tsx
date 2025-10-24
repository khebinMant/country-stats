import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard de Análisis de Créditos por País",
  description: "Aplicación web para analizar datos de créditos por país y año con estadísticas y visualizaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}