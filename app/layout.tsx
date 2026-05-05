import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Maya Clinic | Ваше здоровье — наш приоритет',
    template: '%s | Maya Clinic',
  },
  description: 'Maya Clinic предоставляет комплексные медицинские услуги, включая общие осмотры, дерматологию, стоматологию, педиатрию, кардиологию и многое другое. Запишитесь на прием сегодня.',
  keywords: ['клиника', 'здравоохранение', 'медицина', 'врач', 'Бангкок', 'Таиланд', 'медосмотр', 'дерматология', 'стоматология', 'педиатрия'],
  authors: [{ name: 'Maya Clinic' }],
  creator: 'Maya Clinic',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Maya Clinic',
    title: 'Maya Clinic | Ваше здоровье — наш приоритет',
    description: 'Комплексные медицинские услуги в Бангкоке. Запишитесь на прием сегодня.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maya Clinic | Ваше здоровье — наш приоритет',
    description: 'Комплексные медицинские услуги в Бангкоке. Запишитесь на прием сегодня.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}