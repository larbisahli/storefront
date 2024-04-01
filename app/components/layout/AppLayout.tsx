import Header from '@components/Header'
import CartDrawer from '@components/CartDrawer'
import MenuDrawer from '@components/MenuDrawer'
import cn from 'clsx'
import { Lato, Mulish, Merriweather, Roboto } from 'next/font/google'
import React from 'react'
import Footer from '@components/Footer'

interface Props {
  children: React.ReactNode
  className?: string
}

// TODO: Try to allow the customers to dynamically choose google fonts they want to use
const inter = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const AppLayout = ({ children, className }: Props) => {
  return (
    <div className="relative">
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Header />
      {/* <CartDrawer />
      <MenuDrawer /> */}
      <main
        className={cn(
          'h-[450px]',
          'max-w-screen-xl xxl:max-w-screen-xxl mx-auto', // max-width is 1400px
          'relative flex-grow h-full w-full',
          className
        )}
      >
        <div className="flex flex-col flex-grow">
          <div className="mt-[101px] lg:mt-[150px] flex-auto">
            <div className="z-40"></div>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
