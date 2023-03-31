import React, { Fragment, memo } from 'react'
import cn from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { renderComponent } from '@lib/packages'
import { ComponentNames } from '@dropgala/types/enums'

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

const Layout = ({ children, className }: Props) => {
  return (
    <>
      {renderComponent(STOREFRONT_THEME, ComponentNames.HEADER, {})}
      <main
        className={cn(
          'max-w-[1300px] 2xxl:max-w-[1500px] mx-auto',
          'relative flex-grow h-full w-full',
          className
        )}
      >
        <div className="flex flex-col flex-grow">
          <div className="pt-80px flex-auto">{children}</div>
        </div>
      </main>
    </>
  )
}

export default memo(Layout)
