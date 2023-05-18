import {
  selectConfig,
  selectMenu,
  toggleCart,
  toggleMenu
} from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import {
  useAppDispatch,
  useAppSelector,
  useCartItemsCount
} from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

const Header = () => {
  const storeConfig = useAppSelector(selectConfig)
  const { menu } = useAppSelector(selectMenu)

  const dispatch = useAppDispatch()

  const handleCart = () => {
    dispatch(toggleCart())
  }

  const itemsCount = useCartItemsCount()

  const handleMenu = () => {
    dispatch(toggleMenu())
  }

  return renderRemoteComponent(storeConfig.theme, ComponentNames.HEADER, {
    handleCart,
    handleMenu,
    itemsCount,
    storeConfig,
    menu
  })
}

export default Header
