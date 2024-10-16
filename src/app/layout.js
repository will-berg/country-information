import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

export const metadata = {
    title: "Country Info",
    description: "A Next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="my-3 mx-10">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
