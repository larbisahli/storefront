import CartDrawer from '@components/CartDrawer'
import MenuDrawer from '@components/MenuDrawer'
import cn from 'clsx'
import {
  Lato,
  Signika,
  Jost,
  Merriweather,
  Gelasio,
  Spectral
} from 'next/font/google'
import React from 'react'
import CustomProfiler from '@components/CustomProfiler'
import { resolvePath } from '@dropgala/utils/helpers'
import { useAppSelector } from '@hooks/useStore'
import { selectConfig } from '@dropgala/store'
import {
  PageLayoutBlocks,
  StoreLayoutComponentType,
  ThemeSettingsType
} from '@dropgala/types'
import {
  handleThemeSettingsDefaults,
  handleThemeSettingsVariables
} from '@dropgala/utils/styles'

interface Props {
  children: React.ReactNode
  className?: string
}

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap'
})

// const roboto = Roboto_Condensed({
//   weight: ['300', '400', '700'],
//   subsets: ['latin'],
//   variable: '--font-roboto',
//   display: 'swap'
// })

const signika = Signika({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-signika',
  display: 'swap'
})

const jost = Jost({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap'
})

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap'
})

const gelasio = Gelasio({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-gelasio',
  display: 'swap'
})

const spectral = Spectral({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-spectral',
  display: 'swap'
})

const AppLayout = ({ children, className }: Props) => {
  const { layout } = useAppSelector(selectConfig)
  const headerData = resolvePath<StoreLayoutComponentType>(
    layout,
    PageLayoutBlocks.Header,
    {}
  )
  const footerData = resolvePath<StoreLayoutComponentType>(
    layout,
    PageLayoutBlocks.Footer,
    {}
  )
  const mainData = resolvePath<StoreLayoutComponentType[]>(
    layout,
    PageLayoutBlocks.Main,
    []
  )
  const settings = resolvePath<ThemeSettingsType>(layout, 'settings', {})
  console.log('APP_LAYOUT >>>', { layout })
  return (
    <div className="relative">
      <style jsx global>{`
        :root {
          --font-lato: ${lato.style.fontFamily};
          --font-signika: ${signika.style.fontFamily};
          --font-jost: ${jost.style.fontFamily};
          --font-merriweather: ${merriweather.style.fontFamily};
          --font-gelasio: ${gelasio.style.fontFamily};
          --font-spectral: ${spectral.style.fontFamily};
          ${handleThemeSettingsVariables(settings)}
        }
        html {
          ${handleThemeSettingsDefaults(settings)}
        }
      `}</style>
      <CustomProfiler components={[headerData]} />
      <CartDrawer moduleName="CartDrawer" />
      <MenuDrawer moduleName="MenuDrawer" />
      <main className={cn('relative flex-grow h-full w-full', className)}>
        <div className="flex flex-col flex-grow">
          <div className="smt-[101px] desktop:smt-[150px] flex-auto">
            <div className="mb-44">
              <CustomProfiler components={mainData} />
            </div>
            {children}
          </div>
        </div>
      </main>
      <CustomProfiler components={[footerData]} />
    </div>
  )
}

export default AppLayout
