import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="w-full h-full overflow-hidden">{children}</body>
        </html>
    );
}
