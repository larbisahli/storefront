import { Request } from '@graphql/index';
import { PRODUCT_CART } from '@graphql/queries/product';
import { ProductEnum } from '@interfaces/enums';
import type {
  CouponType,
  ProductType,
  VariationOptionsType
} from '@interfaces/index';
import { sentry } from '@lib/sentry';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '@store/index';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';

export const fetchProductInfo = createAsyncThunk(
  'cart/fetchProductInfo',
  async (id: string) => {
    const response = await Request(PRODUCT_CART, { id });
    return response?.productCart;
  }
);

const minPricedVariationOption = (variationOptions: VariationOptionsType[]) => {
  if (!isEmpty(variationOptions)) {
    return variationOptions?.reduce((acc, loc) =>
      acc.salePrice < loc.salePrice ? acc : loc
    );
  }
  return {} as VariationOptionsType;
};

export interface CartState {
  isOpen: boolean;
  items: ProductType[];
  coupon: CouponType;
}

const initialState: CartState = {
  isOpen: false,
  items: [],
  coupon: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<ProductType>) => {
      const {
        id,
        slug,
        name,
        salePrice,
        comparePrice,
        quantity,
        type,
        variationOptions,
        variations,
        disableOutOfStock,
        thumbnail,
        orderVariationOption,
        orderQuantity
      } = action.payload;

      state.items.push({
        id,
        key: nanoid(),
        slug,
        name,
        salePrice,
        comparePrice,
        quantity,
        type,
        variationOptions: variationOptions ?? [],
        variations: variations ?? [],
        disableOutOfStock,
        thumbnail,
        orderVariationOption:
          orderVariationOption ?? ({} as VariationOptionsType),
        orderQuantity: orderQuantity ?? 1
      });
    },
    updateItem: (state: CartState, action: PayloadAction<ProductType>) => {
      const updatedItem = action.payload;
      state.items = state.items?.map((item) => {
        if (item.id === updatedItem.id) {
          item = { ...item, ...updatedItem };
          if (item.type.id === ProductEnum.Variable) {
            const orderOption = item.orderVariationOption;
            const selectedOption = item.variationOptions?.find(
              (v) => v.id === orderOption?.id
            );

            item.orderVariationOption = selectedOption;
            if (
              selectedOption?.quantity !== 0 &&
              item.orderQuantity > selectedOption?.quantity
            ) {
              item.orderQuantity = selectedOption?.quantity;
            }
          } else if (
            item.type?.id === ProductEnum.Simple &&
            updatedItem.quantity !== 0 &&
            item.orderQuantity > updatedItem.quantity
          ) {
            item.orderQuantity = item.quantity;
          }
        }
        return item;
      });
    },
    removeItem: (state: CartState, action: PayloadAction<ProductType>) => {
      const key = action.payload.key;
      state.items = filter(
        state.items,
        (item: ProductType) => item.key !== key
      );
    },
    incrementItem: (state: CartState, action: PayloadAction<ProductType>) => {
      const key = action.payload.key;
      state.items = state?.items?.map((item) => {
        if (item.key === key) {
          item.orderQuantity += 1;
        }
        return item;
      });
    },
    decrementItem: (state: CartState, action: PayloadAction<ProductType>) => {
      const key = action.payload.key;
      const item = state?.items?.find((item: ProductType) => item.key === key);
      if (item?.orderQuantity > 1) {
        state.items = state?.items?.map((item) => {
          if (item.key === key) {
            item.orderQuantity -= 1;
          }
          return item;
        });
      } else {
        state.items = filter(
          state.items,
          (item: ProductType) => item.key !== key
        );
      }
    },
    setOrderQuantity: (
      state: CartState,
      action: PayloadAction<ProductType>
    ) => {
      const id = action.payload.id;
      const type = action.payload.type;
      const orderQuantity = action.payload.orderQuantity;

      state.items = state?.items?.map((item) => {
        if (type.id === ProductEnum.Variable) {
          if (item.key === id) {
            const optionQuantity = item.orderVariationOption?.quantity;
            if (item.orderQuantity + orderQuantity > optionQuantity) {
              item.orderQuantity = optionQuantity;
            } else {
              item.orderQuantity += orderQuantity;
            }
          }
        } else if (item.type?.id === ProductEnum.Simple) {
          if (item.id === id) {
            if (item.orderQuantity + orderQuantity > item.quantity) {
              item.orderQuantity = item.quantity;
            } else {
              item.orderQuantity += orderQuantity;
            }
          }
        }
        return item;
      });
    },
    setOrderVariationOption: (
      state: CartState,
      action: PayloadAction<{
        key: string;
        orderVariationOption: ProductType['orderVariationOption'];
      }>
    ) => {
      const key = action.payload.key;
      const orderVariationOption = action.payload.orderVariationOption;
      state.items = state?.items?.map((item) => {
        if (item.key === key) {
          item.orderVariationOption = orderVariationOption;
        }
        return item;
      });
    },
    rehydrate: (state: CartState, action: PayloadAction<ProductType[]>) => {
      if (isArray(action.payload)) {
        state.items = action.payload;
      } else {
        state.items = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductInfo.fulfilled, (state, action) => {
      state.items = state.items?.map((item) => {
        if (item?.id === action.payload?.id) {
          return {
            ...item,
            ...(action.payload ?? {}),
            orderVariationOption: minPricedVariationOption(
              action.payload?.variationOptions
            )
          };
        }
        return item;
      });
    });
    builder.addCase(fetchProductInfo.rejected, (_, action) => {
      sentry({
        message: 'action.payload rejected',
        error: action?.error as Error
      });
    });
  }
});

export const {
  addItem,
  removeItem,
  updateItem,
  incrementItem,
  decrementItem,
  setOrderQuantity,
  rehydrate,
  setOrderVariationOption
} = cartSlice.actions;

export const selectCart = (state: AppState) => state.cart;

export default cartSlice.reducer;
