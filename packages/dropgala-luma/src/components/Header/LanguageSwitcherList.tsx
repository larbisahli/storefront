import { ConfigType } from '@dropgala/types/config.type'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { memo, useMemo, useRef, useState } from 'react'
import ArrowDownIcon from '../../assets/icons/arrow-down'
import ArrowUpIcon from '../../assets/icons/arrow-up'
import cn from 'clsx'
import { useRouter } from 'next/router'

interface Props {
  storeConfig: ConfigType
}

const LanguageSwitcherList = ({ storeConfig }: Props) => {
  const { locales, defaultCurrency } = storeConfig

  const { locale, push, events, reload } = useRouter()

  const ref = useRef(null)

  console.log({ storeConfig })

  const [open, setOpen] = useState(false)

  const handleClickOutside = () => {
    setOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  console.log({ locale })

  const currentLocale = useMemo(
    () => locales?.find((l) => l.localeId === locale),
    [locale, locales]
  )

  return (
    <div ref={ref} className="relative pl-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm font-manrope flex justify-center items-center"
      >
        <div>{currentLocale?.name}</div>
        <div className={cn('p-1', open && 'block', !open && 'hidden')}>
          <ArrowUpIcon />
        </div>
        <div className={cn('p-1', !open && 'block', open && 'hidden')}>
          <ArrowDownIcon />
        </div>
      </button>

      {open && (
        <div className="bg-white shadow absolute border border-solid border-gray-300 z-50 -right-0">
          {locales?.map(({ name, localeId }) => (
            <div
              key={localeId}
              onClick={() => {
                setOpen(false)
                push('', undefined, {
                  locale: localeId ?? false,
                  shallow: true
                })
                events.on('routeChangeComplete', () => {
                  reload()
                })
              }}
              className="text-sm py-2 font-manrope px-3 border-b hover:bg-gray-200 cursor-pointer"
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(LanguageSwitcherList)
