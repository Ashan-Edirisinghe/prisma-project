import React from 'react'
import Navbar from '@/components/Navbar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <Navbar />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
