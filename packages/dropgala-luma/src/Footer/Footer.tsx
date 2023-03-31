import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import type { FC, ButtonHTMLAttributes } from 'react'

export interface HeaderProps {
  /**
   * This is a description
   */
  menu?: boolean
}

const Footer: FC<any> = () => {
  const router = useRouter()

  return (
    <header
      className={cn(
        'flex items-center text-gray-700 body-font fixed bg-white w-full h-80px z-20 pr-20px md:pr-30px lg:pr-40px',
        { 'shadow-mobile lg:shadow-header': true }
      )}
    >
      <button
        aria-label="Menu"
        className="menuBtn flex flex-col items-center justify-center w-50px flex-shrink-0 h-full outline-none focus:outline-none lg:w-90px"
      >
        <span className="menuIcon">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </span>
      </button>

      <Link href="/" className="hidden mx-auto lg:mr-10 lg:flex">
        <span className="sr-only">Dropgala</span>
      </Link>

      <div className="w-full ml-10px mr-20px lg:mr-10 lg:ml-auto lg:flex lg:justify-center">
        FOOTER
      </div>

      <div className="hidden items-center text-gray-900 mr-10 flex-shrink-0 lg:flex">
        <span className="font-semibold text-base ml-3"></span>
      </div>

      <button
        className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        aria-label="cart-button"
      >
        <span
          className={cn('cart-bubble', { affect: 4 > 0 })}
          style={{ fontSize: '10px', top: '-10px', right: '-12px' }}
        >
          {4}
        </span>
      </button>
    </header>
  )
}

export default Footer
