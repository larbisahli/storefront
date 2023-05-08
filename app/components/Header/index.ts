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
import { renderComponent } from '@lib/packages'

const Header = () => {
  const { theme } = useAppSelector(selectConfig)
  const { menu } = useAppSelector(selectMenu)

  const dispatch = useAppDispatch()

  const handleCart = () => {
    dispatch(toggleCart())
  }

  const itemsCount = useCartItemsCount()

  const handleMenu = () => {
    dispatch(toggleMenu())
  }

  return renderComponent(theme, ComponentNames.HEADER, {
    handleCart,
    handleMenu,
    itemsCount,
    menu
  })
}

export default Header
