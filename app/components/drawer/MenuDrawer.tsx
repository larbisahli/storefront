import cn from 'clsx'
import React from 'react'
import { toggleCart } from '@dropgala/store'
import { useAppSelector, useAppDispatch } from '@hooks/use-store'
import { CloseIcon } from '@assets'
import { renderComponent } from '@lib/packages'
import { ComponentNames } from '@dropgala/types/enums.type'

const STOREFRONT_THEME = '@dropgala/luma'

const MenuDrawer = () => {
  const { isOpen, isMenu } = useAppSelector((state) => state.drawer)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(toggleCart())
  }

  return (
    <React.Fragment>
      {isOpen && isMenu && (
        <div
          className="overlay overlay-menu"
          role="button"
          onClick={handleClose}
        />
      )}
      <div className={cn('drawer drawer-menu', { open: isOpen && isMenu })}>
        <div className="flex justify-end">
          <button className="px-4 py-3 text-gray-800" onClick={handleClose}>
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        <div className="h-full overflow-auto">
          {renderComponent(
            STOREFRONT_THEME,
            ComponentNames.MENU_DRAWER_VIEW,
            {}
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default MenuDrawer
