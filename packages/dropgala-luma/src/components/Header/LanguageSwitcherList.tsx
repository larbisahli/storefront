import { ConfigType } from '@dropgala/types/config.type'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { memo, useMemo, useRef, useState } from 'react'
import ArrowDownIcon from '@dropgala/assets/icons/arrow-down'
import ArrowUpIcon from '@dropgala/assets/icons/arrow-up'
import cn from 'clsx'
import { useRouter } from 'next/router'

interface Props {
  storeConfig: ConfigType
}

const LanguageSwitcherList = ({ storeConfig }: Props) => {
  const { locales, defaultCurrency } = storeConfig

  const { asPath, locale, push, events, reload } = useRouter()

  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClickOutside = () => {
    setOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

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
          <ArrowUpIcon width={16} height={16} />
        </div>
        <div className={cn('p-1', !open && 'block', open && 'hidden')}>
          <ArrowDownIcon width={16} height={16} />
        </div>
      </button>

      {open && (
        <div className="bg-white shadow text-center absolute border border-solid border-gray-300 z-50 -right-0">
          {locales?.map(({ name, localeId }) => (
            <div
              key={localeId}
              onClick={() => {
                setOpen(false)
                push(asPath, asPath, {
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
