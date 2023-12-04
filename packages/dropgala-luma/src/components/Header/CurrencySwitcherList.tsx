import { ConfigType } from '@dropgala/types/config.type'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { memo, useRef, useState } from 'react'
import ArrowDownIcon from '../../assets/icons/arrow-down'
import ArrowUpIcon from '../../assets/icons/arrow-up'
import cn from 'clsx'

interface Props {
  storeConfig: ConfigType
  handleDefaultCurrency: (
    defaultCurrency: ConfigType['defaultCurrency']
  ) => void
}

const CurrencySwitcherList = ({
  storeConfig,
  handleDefaultCurrency
}: Props) => {
  const { currencies, defaultCurrency } = storeConfig

  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClickOutside = () => {
    setOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  console.log({ currencies })

  return (
    <div ref={ref} className={'relative'}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm font-manrope flex justify-center items-center"
      >
        <div>{defaultCurrency?.code}</div>
        <div className={cn('p-1', open && 'block', !open && 'hidden')}>
          <ArrowUpIcon />
        </div>
        <div className={cn('p-1', !open && 'block', open && 'hidden')}>
          <ArrowDownIcon />
        </div>
      </button>

      {open && (
        <div className="bg-white shadow absolute border border-solid border-gray-300 z-50 -right-0">
          {currencies?.map((currency) => (
            <div
              key={currency?.code}
              onClick={() => {
                setOpen(false)
                handleDefaultCurrency(currency)
              }}
              className="text-sm py-2 font-manrope px-3 border-b hover:bg-gray-200 cursor-pointer"
            >
              {currency?.code}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(CurrencySwitcherList)
