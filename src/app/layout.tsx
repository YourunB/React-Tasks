import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty characters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}