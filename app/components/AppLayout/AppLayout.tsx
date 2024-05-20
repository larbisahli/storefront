import CartDrawer from '@components/CartDrawer'
import MenuDrawer from '@components/MenuDrawer'
import cn from 'clsx'
import { Lato, Mulish, Merriweather, Roboto } from 'next/font/google'
import React from 'react'
import CustomProfiler from '@components/CustomProfiler'
import { resolvePath } from '@dropgala/utils/helpers'
import { useAppSelector } from '@hooks/useStore'
import { selectConfig } from '@dropgala/store'
import { PageLayoutBlocks } from '@dropgala/types'

interface Props {
  children: React.ReactNode
  className?: string
}

// TODO: Try to allow the customers to dynamically choose google fonts they want to use
const inter = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css

const AppLayout = ({ children, className }: Props) => {
  const { layout } = useAppSelector(selectConfig)
  const headerData = resolvePath(layout, PageLayoutBlocks.Header, {})
  const footerData = resolvePath(layout, PageLayoutBlocks.Footer, {})
  const mainData = resolvePath(layout, PageLayoutBlocks.Main, {})
  console.log({ layout })
  return (
    <div className="relative bg-white">
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        heading-font {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <CustomProfiler data={[headerData]} />
      <CartDrawer moduleName="CartDrawer" />
      <MenuDrawer moduleName="MenuDrawer" />
      <main
        className={cn(
          'h-[450px]',
          // 'max-w-screen-xl xxl:max-w-[1300px] mx-auto', // max-width is 1300px
          'relative flex-grow h-full w-full',
          className
        )}
      >
        <div className="flex flex-col flex-grow">
          <div className="mt-[101px] lg:mt-[150px] flex-auto">
            <div className="mb-44">
              <CustomProfiler data={mainData} />
            </div>
            {children}
          </div>
        </div>
      </main>
      <CustomProfiler data={[footerData]} />
    </div>
  )
}

export default AppLayout
