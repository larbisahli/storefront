// import { useAppDispatch, useAppSelector } from '@hooks/use-store';
// import { openMenu, slideCart } from '@store/drawer/index';
import cn from 'clsx';
// import DrawerMenu from 'containers/drawer/views/menus';
import React from 'react';

const MenuDrawer = () => {
  // const menu = useAppSelector((state) => state.drawer.menu);

  // const dispatch = useAppDispatch();

  const menu = false

  // const handleClose = () => {
  //   dispatch(openMenu(false));
  // };
  return (
    <React.Fragment>
      {menu && (
        <div
          className="overlay overlay-menu"
          role="button"
          // onClick={handleClose}
        />
      )}
      <div className={cn('drawer drawer-menu', { open: menu })}>
        {/* <DrawerMenu /> */}
      </div>
    </React.Fragment>
  );
}

export default MenuDrawer
