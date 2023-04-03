import { CouponEnum, Nullable, Scalars } from 'custom.type'

export interface CouponType {
  id?: Nullable<Scalars['ID']>
  code?: Nullable<Scalars['String']>
  discountValue?: Scalars['Int']
  discountType?:
    | {
        value: CouponEnum
      }
    | CouponEnum
  timesUsed?: Nullable<Scalars['Int']>
  maxUsage?: Nullable<Scalars['Int']>
  orderAmountLimit?: Nullable<Scalars['Int']>
  couponStartDate?: Nullable<Scalars['Date']>
  couponEndDate?: Nullable<Scalars['Date']>
}
