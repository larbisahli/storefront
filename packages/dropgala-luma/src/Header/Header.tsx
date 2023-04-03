import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import CartIcon from '../assets/icons/cart-icon'
import { HeartEmpty } from '../assets/icons/heart'
import UserIcon from '../assets/icons/user'

export interface HeaderProps {
  /**
   * This is a description
   */
  menu?: boolean
}

const Header: FC<any> = () => {
  const router = useRouter()
  const { t } = useTranslation('form')

  const renderNotice = () => {
    return (
      <div className="bg-red-400 py-3 w-full text-white text-center font-medium">
        <span>Demo store managed by dropgala.</span>
      </div>
    )
  }

  const renderInfoSection = () => {
    return (
      <div className="hidden lg:flex items-center justify-between pt-2 pb-1  xl:px-0 px-20px">
        <div className="flex items-center text-xs text-gray-900">
          <div className="pr-5 flex items-center">
            <div className="pr-3">Telephone:</div>
            <span>{'+212 619080913'}</span>
          </div>
          <div className="flex items-center">
            <div className="pr-3">Mail:</div>
            <span>{'info@dropgala.com'}</span>
          </div>
        </div>
        <div className="text-sm text-gray-900">USD</div>
      </div>
    )
  }

  const renderSearchForm = ()=>{
    return <form>
    <div className="relative">
      <input
        type="search"
        id="search"
        className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 
      rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
       dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500
        dark:focus:border-blue-500 outline-none"
        placeholder="Search products"
        required
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </form>
  }

  const renderAccountActions = ()=>{
    return <div className="hidden lg:flex items-center">
    <button className='mx-2 text-black'>
     <UserIcon width="25px" height="25px" />
     </button>
     <button className='mx-2 text-black'>
     <HeartEmpty width="25px" height="25px" />
     </button>
     <button
       className="mx-2 flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
       // onClick={showCart}
       aria-label="cart-button"
     >
       <CartIcon width="22px" height="22px" />
       <span
         className={cn(
           'absolute bg-red-600 rounded-full h-[16px] w-[16px] text-center text-white', 
           'top-[-10px] right-[-12px] font-semibold text-xs')}
       >
         {3}
       </span>
     </button>
   </div>
  }

  return (
    <header
      className={cn('text-gray-700 body-font fixed w-full z-20 bg-white border-b border-gray-300',
      {
        'shadow-mobile lg:shadow-header': true,
      })}
    >
      {/* DemoNotice */}
      {renderNotice()}
      {/* Navigation */}
      <div className="max-w-screen-xl xxl:max-w-screen-xxl mx-auto">
        {/* Info section */}
        {renderInfoSection()}
        {/* Nav */}
        <div className="flex items-center ppr-20px xl:px-0 px-20px lg:pr-40px bg-white h-60px">
          <Link href="/" className="flex justify-center lg:w-fit w-full">
            <Image
              src="/assets/images/fixed_logo.webp"
              width="180"
              height="60"
              alt="logo"
              objetFit="cover"
            />
          </Link>
          <div className="hidden lg:block flex-1 max-w-[500px] m-auto">
            {/* Search field */}
            {renderSearchForm()}
          </div>
           {/* Icons account actions */}
           {renderAccountActions()}
        </div>
        {/* Menu Section */}
        <div className="hidden lg:flex items-center pt-4 pb-3 justify-center">
          {
            ['Category1', 'Category2', 'Category3', 'Category4', 'Category5']?.map((category)=>{
              return <button key={category} className='pr-4 text-black uppercase font-medium text-sm'>{category}</button>
            })
          }
        </div>
      </div>
    </header>
  )
}

export default Header
