import { CategoryType } from '@dropgala/types/category.type'
import cn from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FC, Fragment, useRef, useState } from 'react'

import Link from '../ui/Link'
import MyAccountActions from './AccountActions'
import InfoSection from './InfoSection'
import MenuDropDownComponent from './MenuDropDownComponent'
import MobileHeader from './MobileHeader'
import NoticeSection from './NoticeSection'
import SearchSection from './SearchSection'

export interface HeaderProps {
  /**
   * Menu
   */
  handleMenu: () => void
  handleCart: () => void
  menu?: CategoryType[]
}

const Header: FC<any> = ({
  handleMenu,
  handleCart,
  menu = []
}: HeaderProps) => {
  const router = useRouter()
  const { t } = useTranslation('form')

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
    console.log(menuTimer.current)
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

  return (
    <Fragment>
      <header
        className={cn(
          'text-gray-700 body-font fixed w-full z-20 bg-white border-b border-gray-300',
          {
            'shadow-mobile lg:shadow-header': true
          }
        )}
      >
        {/* DemoNotice */}
        <NoticeSection text="Demo store managed by dropgala." />
        {/* Navigation */}
        <div className="max-w-screen-xl xxl:max-w-screen-xxl mx-auto xl:px-0 px-20px ">
          {/* Info section */}
          <InfoSection email="info@dropgala.com" phone="+212 619080913" />
          {/* Nav */}
          <div className="flex items-center bg-white h-60px">
            <Link href="/" className="flex justify-center lg:w-fit w-full">
              <Image
                src="/assets/images/fixed_logo.webp"
                width="180"
                height="60"
                alt="logo"
              />
            </Link>
            <div className="hidden lg:block flex-1 max-w-[500px] m-auto">
              {/* Search field */}
              <SearchSection />
            </div>
            {/* Icons account actions */}
            <MyAccountActions handleCart={handleCart} />
          </div>
          {/* Menu Section */}
          <div className="hidden lg:flex items-center justify-center">
            {menu?.map(({ id, name }) => {
              return (
                <Link
                  key={id}
                  href="/"
                  onMouseEnter={() => handleFirstLevelCategoryEnter(id)}
                  onMouseLeave={handleFirstLevelCategoryLeave}
                  className="text-black uppercase font-medium text-sm hover:text-red-600 p-4 pb-3 pl-0"
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
      <MobileHeader handleCart={handleCart} handleMenu={handleMenu} />
    </Fragment>
  )
}

export default Header
