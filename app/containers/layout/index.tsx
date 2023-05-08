import Header from '@components/Header'
import CartDrawer from '@components/drawer/CartDrawer'
import MenuDrawer from '@components/drawer/MenuDrawer'
import Footer from '@dropgala/luma/components/Footer'
import cn from 'clsx'
import { Lato } from 'next/font/google'
import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

// TODO: Try to allow the customers to choose google fonts they want to use
const inter = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-inter'
})

const Layout = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        inter.variable,
        // Dynamic font family
        'font-lato',
        'relative'
      )}
    >
      <Header />
      <CartDrawer />
      <MenuDrawer />
      <main
        className={cn(
          'h-[450px]',
          'max-w-screen-xl xxl:max-w-screen-xxl mx-auto',
          'relative flex-grow h-full w-full',
          className
        )}
      >
        <div className="flex flex-col flex-grow">
          <div className="mt-[110px] lg:mt-[190px] flex-auto">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
