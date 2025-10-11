import { WhopApp } from "@whop/react/components";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Community Quest - Engagement Leaderboard",
	description: "Track community engagement, earn points, and unlock rewards with Community Quest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				data-whop-app="community-quest"
			>
				<WhopApp>{children}</WhopApp>
				{/* Admin/Config Links */}
				<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
					<a 
						href="/admin"
						className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
						title="Admin Dashboard"
					>
						⚙️ Admin
					</a>
					<a 
						href="/webhook-config"
						className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
						title="Webhook Configuration"
					>
						🔗 Config
					</a>
				</div>
			</body>
		</html>
	);
}
