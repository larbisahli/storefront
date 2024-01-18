import { isEqual, sortBy } from './lodashFunctions'
import {
  VariationsType,
  VariationOptionsType
} from '@dropgala/types/product.type'

// Utils
export const Timer = (time = 1000) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, time)
  )
  // Timer().then(() => setLoading(false));
}

declare global {
  interface Number {
    toCommas(): string | Number
    secondsToHm(): string | Number
  }
}

Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } catch (error) {
    return this
  }
}

export const PRODUCTION_ENV = process.env.NODE_ENV === 'production'

Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } catch (error) {
    return this
  }
}

export const mediaURL = PRODUCTION_ENV
  ? 'https://api.dropgala.com/media'
  : 'http://127.0.0.1:5000/media'

export const apiURL = PRODUCTION_ENV
  ? 'https://api.dropgala.com'
  : 'http://127.0.0.1:5000'

// eslint-disable-next-line no-unused-vars
export function noop(_: any) {}

// export const flattenArrayOfObjects = <T>(arr: T[]) => {
//   const flatObject = {};
//   for (let i = 0; i < arr?.length; i++) {
//     for (const property in arr[i]) {
//       flatObject[property as string] = arr[i][property];
//     }
//   }
//   return flatObject;
// };

export const selectedVariationOptionFun = ({
  selectedVariations,
  variationOptions = []
}: {
  selectedVariations: VariationsType[]
  variationOptions?: VariationOptionsType[]
}) => {
  const selectedAttributesOption = selectedVariations?.map(
    (selectedVariation) => {
      return selectedVariation?.value?.id
    }
  )

  return variationOptions?.find((vop) => {
    return isEqual(sortBy(vop?.options), sortBy(selectedAttributesOption))
  })
}

export const toTwoDecimalPlaces = (number: number) => {
  return typeof number !== 'undefined'
    ? number.toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    : null
}

export const daysToSeconds = (days: number) => 60 * 60 * (24 * days)

export const roundTo3 = (v: number = 0) => Math.round(v * 1000) / 1000

export const calcTaxRate = (price: number = 0, rate: number = 0) =>
  roundTo3(Number(price) + Number(price) * (Number(rate) / 100))

export const calcPercentage = (
  salePrice: number = 0,
  comparePrice: number = 0
) =>
  roundTo3(
    ((Number(comparePrice) - Number(salePrice)) / Number(comparePrice)) * 100
  )
