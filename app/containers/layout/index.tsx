import { ComponentNames } from '@dropgala/types/enums.type'
import { renderComponent } from '@lib/packages'
import cn from 'clsx'
// import { ComponentType, useEffect, useState } from 'react'
import { Lato } from 'next/font/google'
import React, { memo } from 'react'

const STOREFRONT_THEME = '@dropgala/luma'

interface Props {
  children: React.ReactNode
  className?: string
}

// {isCheckout ? (
//   <CheckoutHeader />
// ) : (
//   <Fragment>
//     <Header />
//     <Drawer />
//     <CartDrawer />
//   </Fragment>
// )}

// Allow the customers to choose google fonts they want to use
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
      {renderComponent(STOREFRONT_THEME, ComponentNames.HEADER, {})}
      <main
        className={cn(
          'bg-red-500 h-[450px]',
          'max-w-screen-xl xxl:max-w-screen-xxl mx-auto',
          'relative flex-grow h-full w-full',
          className
        )}
      >
        <div className="flex flex-col flex-grow">
          <div className="mt-[200px] flex-auto">{children}</div>
        </div>
      </main>
      {renderComponent(STOREFRONT_THEME, ComponentNames.FOOTER, {})}
    </div>
  )
}

export default memo(Layout)
