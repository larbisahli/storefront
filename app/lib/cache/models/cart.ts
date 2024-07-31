import mongoose from 'mongoose'

export interface Cart extends mongoose.Document {
  key: string
  alias: string
  domain: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const CartSchema = new mongoose.Schema<Cart>(
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
  { collection: 'carts' }
)

export default mongoose.models.Cart || mongoose.model<Cart>('Cart', CartSchema)
