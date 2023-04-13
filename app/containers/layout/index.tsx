import CartDrawer from '@components/drawer/CartDrawer'
import MenuDrawer from '@components/drawer/MenuDrawer'
import {
  selectConfig,
  selectMenu,
  toggleCart,
  toggleMenu
} from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppDispatch, useAppSelector } from '@hooks/use-store'
import { renderComponent } from '@lib/packages'
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
  const { theme } = useAppSelector(selectConfig)
  const { menu } = useAppSelector(selectMenu)

  const dispatch = useAppDispatch()

  const handleCart = () => {
    dispatch(toggleCart())
  }

  const handleMenu = () => {
    dispatch(toggleMenu())
  }

  return (
    <div
      className={cn(
        inter.variable,
        // Dynamic font family
        'font-lato',
        'relative'
      )}
    >
      {renderComponent(theme, ComponentNames.HEADER, {
        handleCart,
        handleMenu,
        menu
      })}
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
      {renderComponent(theme, ComponentNames.FOOTER, {})}
    </div>
  )
}

export default Layout
