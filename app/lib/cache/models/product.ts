import mongoose from 'mongoose'

export interface Product extends mongoose.Document {
  key: number
  alias: string
  domain: string
  storeId: string
  localeId: string
  data: Uint8Array
  size: String
  expireAt: Date
}

const ProductSchema = new mongoose.Schema<Product>(
  {
    key: {
      type: Number,
      required: true,
      index: { unique: true } // product id
    },
    slug: {
      type: String,
      required: true,
      index: { unique: true } // sha(alias:slug)
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
      expires: 60 * 60 * 24 * 7, // 7 day
      default: Date.now
    }
  },
  { collection: 'products' }
)

export default mongoose.models.Product ||
  mongoose.model<Product>('Product', ProductSchema)
