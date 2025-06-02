import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Normograma Diana Rodriguez",
	description: "Normograma Diana Rodriguez",
	icons: {
		icon: "/icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className="antialiased font-sans">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
