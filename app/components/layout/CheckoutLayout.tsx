import CheckoutHeader from '@components/CheckoutHeader'
import cn from 'clsx'
import { Mulish } from 'next/font/google'
import React, { useEffect } from 'react'
import BrowserDatabase from '@dropgala/utils/BrowserDatabase'
import { localStorageKeyNames } from '@dropgala/types'
import { CartState } from '@dropgala/types/product.type'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { selectCart, setCartInit } from '@dropgala/store'

interface Props {
  children: React.ReactNode
  className?: string
}

// TODO: Try to allow the customers to dynamically choose google fonts they want to use
const inter = Mulish({
  weight: ['200', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-inter'
})

const CheckoutLayout = ({ children, className }: Props) => {
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
    <div
      className={cn(
        inter.variable,
        // Dynamic font family
        'font-lato',
        'relative'
      )}
    >
      <CheckoutHeader />
      <main
        className={cn(
          'h-[450px]',
          'max-w-screen-xl xxl:max-w-screen-xxl mx-auto',
          'relative flex-grow h-full w-full',
          className
        )}
      >
        <div className="flex flex-col flex-grow">
          <div className="mt-[50px] lg:mt-[50px] flex-auto">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutLayout
