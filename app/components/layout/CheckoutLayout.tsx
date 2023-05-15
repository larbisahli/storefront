import CheckoutHeader from '@components/CheckoutHeader'
import cn from 'clsx'
import { Lato } from 'next/font/google'
import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

// TODO: Try to allow the customers to dynamically choose google fonts they want to use
const inter = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-inter'
})

const CheckoutLayout = ({ children, className }: Props) => {
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
