import {
  VariationOptionsType,
  VariationsType
} from '@dropgala/types/product.type'
import AttributeValueLabel from './AttributeValueLabel'
import cn from 'clsx'
import React, { memo, useEffect, useMemo } from 'react'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { AttributeValueType } from '@dropgala/types/attribute.type'

interface Props {
  className?: string
  variations: VariationsType[]
  variation: VariationsType
  variationOptions?: VariationOptionsType[]
  // eslint-disable-next-line no-unused-vars
  setSelectedVariations: (key: any) => void
  selectedVariations: VariationsType[]
  defaultVariationOption?: VariationOptionsType
}

const ProductAttributes: React.FC<Props> = ({
  className = '',
  variation,
  variations,
  variationOptions,
  selectedVariations,
  setSelectedVariations,
  defaultVariationOption
}) => {
  const { attribute, values } = variation

  console.log({ attribute, values })

  useEffect(() => {
    try {
      let selectedVariationOptions = {} as VariationOptionsType

      if (isEmpty(variationOptions)) return

      if (isEmpty(defaultVariationOption)) {
        selectedVariationOptions = variationOptions?.reduce((acc, loc) =>
          acc?.salePrice < loc?.salePrice ? acc : loc
        )
      } else {
        selectedVariationOptions = defaultVariationOption
      }

      if (isEmpty(selectedVariationOptions)) return

      // map default
      const results = variations?.map((v) => {
        const options = selectedVariationOptions?.options
        return {
          attribute: v?.attribute,
          value: (v?.values?.filter((v) => options.includes(v?.id!)) ?? [])[0]
        }
      })

      setSelectedVariations(results)
    } catch (error) {
      // sentry({
      //   message: 'ProductAttributes variationOptions defaults',
      //   error
      // });
    }
  }, [setSelectedVariations, variationOptions, variations])

  const selectedVariation = useMemo(
    () => selectedVariations?.find((sv) => sv?.attribute?.id === attribute?.id),
    [selectedVariations, attribute]
  )

  const handleSelectedAttributeValue = (value: AttributeValueType) => {
    setSelectedVariations((prev: VariationsType[]) => {
      return prev?.map((v) => {
        if (v?.attribute?.id === attribute?.id) {
          v.value = value
        }
        return v
      })
    })
  }

  if (isEmpty(variation)) return null

  return (
    <div className={cn(className)}>
      <div className="text-14px font-normal mb-3 capitalize">
        <span className="text-skin-base font-medium">{attribute?.name}</span>
        <span className="mr-1 font-medium">:</span>
        <span className="text-13px text-skin-extraMuted">
          {selectedVariation?.value?.value ?? ''}
        </span>
      </div>
      <ul className="flex flex-wrap">
        {values?.map((value) => (
          <AttributeValueLabel
            key={value?.id}
            value={value!}
            selectedAttributeValueId={selectedVariation?.value?.id!}
            handleSelectedAttributeValue={handleSelectedAttributeValue}
          />
        ))}
      </ul>
    </div>
  )
}

export default memo(ProductAttributes)
