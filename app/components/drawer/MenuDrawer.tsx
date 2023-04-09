import { CloseIcon } from '@assets'
import Overlay from '@components/common/Overlay'
import {
  selectConfig,
  selectDrawer,
  selectMenu,
  toggleCart
} from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { useAppDispatch, useAppSelector } from '@hooks/use-store'
import { renderComponent } from '@lib/packages'
import cn from 'clsx'
import React from 'react'

const MenuDrawer = () => {
  const { isOpen, isMenu } = useAppSelector(selectDrawer)
  const { theme } = useAppSelector(selectConfig)
  const { menu } = useAppSelector(selectMenu)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(toggleCart())
  }

  const isMenuOpen = isOpen && isMenu

  return (
    <React.Fragment>
      <Overlay isOpen={isMenuOpen} onClose={handleClose} />
      <div className={cn('drawer drawer-menu', { open: isMenuOpen })}>
        <div className="flex justify-end">
          <button className="px-4 py-3 text-gray-800" onClick={handleClose}>
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        {renderComponent(theme, ComponentNames.MENU_DRAWER_VIEW, { menu })}
      </div>
    </React.Fragment>
  )
}

export default MenuDrawer
