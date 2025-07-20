import { Poppins, Montserrat } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper' // 👈 akan dibuat

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'SEA Catering',
  description: 'Healthy Meals, Anytime, Anywhere',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="bg-white text-gray-800">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
