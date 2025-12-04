import React from 'react'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <AuthProvider>
          <Navbar />
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
