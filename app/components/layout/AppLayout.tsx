import Header from '@components/Header'
import CartDrawer from '@components/CartDrawer'
import MenuDrawer from '@components/MenuDrawer'
import cn from 'clsx'
import { Lato, Mulish, Merriweather, Roboto } from 'next/font/google'
import React from 'react'
import Footer from '@components/Footer'
import { useEffect } from 'react'
import BrowserDatabase from '@dropgala/utils/BrowserDatabase'
import { localStorageKeyNames } from '@dropgala/types'
import { CartState } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { selectCart, setCartInit } from '@dropgala/store'
import { isEmpty } from '@dropgala/utils/lodashFunctions'

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
  const cartState = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const data = BrowserDatabase.getItem<CartState>(
      localStorageKeyNames.CART_TOTALS
    )
    if (data && isEmpty(cartState?.items)) {
      dispatch(setCartInit({ state: data }))
    }
  }, [])
  return (
    <div className="relative">
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Header />
      <CartDrawer />
      <MenuDrawer />
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
