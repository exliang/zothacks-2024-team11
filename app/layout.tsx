import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: {
    default: 'Your #1 Personal Supporter & Mood Analyzer',
    template: `%s - Next.js AI Chatbot`
  },
  description: 'A mood tracker helper ready to improve your quality of life!',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cream' },
    { media: '(prefers-color-scheme: dark)', color: 'green' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Navbar />
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}

            <main className="flex flex-1 flex-col" style={{ backgroundColor: '#e5f2c9'}}>{children} 
            </main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
