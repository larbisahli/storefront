// import {isEqual, sortBy} from './lodashFunctions';

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

// export const flattenArrayOfObjects = <T>(arr: T[]) => {
//   const flatObject = {};
//   for (let i = 0; i < arr?.length; i++) {
//     for (const property in arr[i]) {
//       flatObject[property as string] = arr[i][property];
//     }
//   }
//   return flatObject;
// };

// export const selectedVariationOptionFun = ({
//   selectedVariations,
//   variationOptions
// }) => {
//   const selectedAttributesOption = selectedVariations?.map(
//     (selectedVariation: { value: { id: any; }; }) => {
//       return selectedVariation?.value?.id;
//     }
//   );

//   return variationOptions?.find((vop: { options: any; }) => {
//     return isEqual(sortBy(vop?.options), sortBy(selectedAttributesOption));
//   });
// };
