import mongoose from 'mongoose'

export interface Checkout extends mongoose.Document {
  key: string
  alias: string
  domain: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const CheckoutSchema = new mongoose.Schema<Checkout>(
  {
    key: {
      type: String,
      required: true,
      index: { unique: true }
    },
    alias: {
      type: String,
      require: false,
      index: { unique: false }
    },
    domain: {
      type: String,
      require: false,
      index: { unique: false }
    },
    data: {
      type: Buffer,
      required: true
    },
    size: {
      type: String
    },
    expireAt: {
      type: Date,
      expires: 60 * 60 * 24 * 30, // 30 days
      default: Date.now
    }
  },
  { collection: 'checkouts' }
)

export default mongoose.models.Checkout ||
  mongoose.model<Checkout>('Checkout', CheckoutSchema)
