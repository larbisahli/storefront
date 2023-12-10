/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type {
  VariationOptionsType,
  VariationsType
} from '@dropgala/types/product.type'
import { clone } from '@dropgala/utils/lodashFunctions'
import cn from 'clsx'
import { memo, useMemo } from 'react'

import ArrowDownIcon from '../../assets/icons/arrow-down'

interface Props {
  variations: VariationsType[]
  variation: VariationsType
  orderVariationOption?: VariationOptionsType
  onClick?: () => void
}

function AttributeDisplay({
  orderVariationOption,
  variation,
  variations,
  onClick
}: Props) {
  const { attribute } = variation

  const selectedVariation = useMemo(() => {
    const options = orderVariationOption?.options
    let selected = clone(
      variations?.find((sv) => sv?.attribute?.id === attribute?.id)
    )

    if (selected) {
      selected.value = (selected?.values?.filter((v) =>
        options?.includes(v?.id!)
      ) ?? [])[0]
    }

    return selected
  }, [variations, orderVariationOption, attribute])

  const isColor = selectedVariation?.attribute?.type === 'color'
  const value = selectedVariation?.value?.value
  const name = selectedVariation?.value?.name

  const isOnClick = onClick instanceof Function

  return (
    <div
      className={cn('ml-1', {
        'p-[2px] flex items-center justify-between cursor-pointer border-gray-400 border rounded-full bg-gray-300 min-w-12':
          isOnClick
      })}
      onClick={onClick}
      role={isOnClick ? 'button' : 'none'}
    >
      <div
        className={cn(
          'rounded border shadow-badge flex justify-center items-center font-medium',
          'text-sm text-gray-700 transition duration-200 ease-in-out py-1 px-2 border-gray-300',
          {
            '!rounded-full': isColor,
            '!w-5': isColor,
            '!h-5': isColor,
            'border-none': isOnClick
          }
        )}
        style={{
          background: isColor ? value : ''
        }}
        title={name}
      >
        <span>{isColor ? '' : value}</span>
      </div>
      {isOnClick && (
        <div className="text-black px-2">
          <ArrowDownIcon />
        </div>
      )}
    </div>
  )
}

export default memo(AttributeDisplay)
