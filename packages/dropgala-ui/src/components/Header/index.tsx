import cn from 'clsx'
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { mediaURL } from '@dropgala/utils/utils'
import {
  StoreProps,
  selectCart,
  selectConfig,
  selectMenu,
  setDefaultCurrency,
  toggleCart,
  toggleMenu
} from '@dropgala/store'
import Image from '../common/Image'
import Link from '../common/Link'
import { ConfigType } from '@dropgala/types/config.type'
import dynamic from 'next/dynamic'
import { getComponentFromChildren } from '@dropgala/utils/helpers'
import { ModuleGroup } from '@dropgala/types'
import BuilderPlaceholder from '../common/builderPlaceholder'

const MyAccountActions = dynamic(() => import('./Header/AccountActions'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const InfoSection = dynamic(() => import('./Header/InfoSection'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const MenuDropDownComponent = dynamic(
  () => import('./Header/MenuDropDownComponent'),
  {
    loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
    ssr: false
  }
)

const MobileHeader = dynamic(() => import('./Header/MobileHeader'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const SearchSection = dynamic(() => import('./Header/SearchSection'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

interface Props extends StoreProps {
  children: JSX.Element[]
}

export const Wrapper = ({ children }: { children: JSX.Element }) => {
  return children
}

const Header: FC<Props> = ({
  useAppSelector,
  useAppDispatch,
  children,
  ...props
}) => {
  const storeConfig = useAppSelector(selectConfig)
  const { device, isMobileHeaderTransition } = storeConfig
  const { menu } = useAppSelector(selectMenu)
  const { item, totalQuantity } = useAppSelector(selectCart)

  const dispatch = useAppDispatch()

  const handleCart = useCallback(() => {
    dispatch(toggleCart())
  }, [])

  const handleMenu = useCallback(() => {
    dispatch(toggleMenu())
  }, [])

  const handleDefaultCurrency = useCallback(
    (defaultCurrency: ConfigType['defaultCurrency']) => {
      dispatch(setDefaultCurrency({ defaultCurrency }))
    },
    []
  )

  const itemsCount = totalQuantity

  const menuTimer = useRef<undefined | ReturnType<typeof setTimeout>>(undefined)

  const [selectedFirstLevelCategory, setSelectedFirstLevelCategory] = useState<
    number | null
  >(null)

  const handleFirstLevelCategoryEnter = (categoryId: number) => {
    // cancel the timeout
    clearTimeout(menuTimer.current)
    setSelectedFirstLevelCategory(categoryId)
  }

  const handleMenuDropEvent = () => {
    const menuDropNode = document.getElementById('menu-drop')
    menuDropNode?.removeEventListener('mouseleave', handleMenuDropEvent)
    setSelectedFirstLevelCategory(null)
  }

  const handleFirstLevelCategoryLeave = () => {
    const menuDropNode = document.getElementById('menu-drop')
    menuDropNode?.addEventListener('mouseenter', () => {
      // cancel the timeout
      clearTimeout(menuTimer.current)
    })
    menuDropNode?.addEventListener('mouseleave', handleMenuDropEvent)
    // wait 500ms and then run func()
    menuTimer.current = setTimeout(() => {
      handleMenuDropEvent()
    }, 500)
  }

  const storeLogo = !!storeConfig?.logo?.length
    ? `${mediaURL}/${storeConfig?.logo[0].image}`
    : '/assets/images/default_logo.webp'

  const renderPromoBanner = () => {
    const PromoBanner = getComponentFromChildren(
      children,
      ModuleGroup.PROMO_BANNER
    )
    if (!PromoBanner) return null
    return PromoBanner
  }

  return (
    <Fragment>
      <header
        className={cn(
          'text-gray-700 body-font fixed w-full z-20 bg-white border-b border-gray-300'
        )}
      >
        {/* PromoBanner */}
        {renderPromoBanner()}
        {/* Navigation */}
        <div className="max-w-default mx-auto relative group">
          <BuilderPlaceholder {...props} isEdit isRemove />
          {/* Info section */}
          <InfoSection
            storeConfig={storeConfig}
            handleDefaultCurrency={handleDefaultCurrency}
          />
          {/* Nav */}
          <div className="flex items-center bg-white h-60px relative px-2">
            <div className="flex relative justify-center overflow-hidden">
              <Link href="/">
                <div className="relative">
                  <Image
                    isCustomUrl
                    src={storeLogo}
                    objectFit="cover"
                    height={device?.isDesktop ? 45 : 30}
                    width={device?.isDesktop ? 45 : 30}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>
            <div className="hidden lg:block flex-1 max-w-[500px] m-auto">
              {/* Search field */}
              <SearchSection />
            </div>
            {/* Icons account actions */}
            <MyAccountActions handleCart={handleCart} itemsCount={itemsCount} />
          </div>
          {/* Menu Section */}
          <div className="hidden desktop:flex items-center justify-center">
            {menu?.map(({ id, name, urlKey }) => {
              return (
                <Link
                  key={id}
                  href={{
                    pathname: '/category/[slug]',
                    query: { slug: urlKey }
                  }}
                  onMouseEnter={() => handleFirstLevelCategoryEnter(id)}
                  onMouseLeave={handleFirstLevelCategoryLeave}
                  className="text-black uppercase font-semibold text-sm hover:text-red-600 p-4 pb-3 pl-0"
                >
                  {name}
                </Link>
              )
            })}
          </div>
          {/* MENU DROPDOWN */}
          <MenuDropDownComponent
            menu={menu}
            selectedFirstLevelCategory={selectedFirstLevelCategory}
          />
        </div>
      </header>
      <MobileHeader
        handleCart={handleCart}
        handleMenu={handleMenu}
        itemsCount={itemsCount}
        isMobileHeaderTransition={isMobileHeaderTransition}
      />
    </Fragment>
  )
}

export default Header
