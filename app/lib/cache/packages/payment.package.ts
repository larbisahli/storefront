/**
 * This package helps us turn objects info buffer, useful for storage
 */
import protobuf from 'protobufjs'
import { Payment } from '@dropgala/types/generated/payment/Payment'
import path from 'path'

const PROTO_DIR_PATH = path.join(process.cwd(), './proto') // this will include all *.proto files at the build time

const PROTO_PATH = path.join(PROTO_DIR_PATH, 'payment.proto')

export class PaymentPackage extends protobuf.Root {
  Payment: protobuf.Type
  decodeOptions: {
    enums: StringConstructor // enums as string names
    longs: StringConstructor // longs as strings (requires long.js)
    bytes: StringConstructor // bytes as base64 encoded strings
    defaults: boolean // includes default values
    arrays: boolean // populates empty arrays (repeated fields) even if defaults=false
    objects: boolean // populates empty objects (map fields) even if defaults=false
    oneofs: boolean // includes virtual oneof fields set to the present field's name
  }

  constructor() {
    super()
    this.Payment = this.loadSync(PROTO_PATH).lookupType('payment.Payment')
    this.decodeOptions = {
      enums: String,
      longs: String,
      bytes: String,
      defaults: true,
      arrays: true,
      objects: true,
      oneofs: true
    }
  }

  /**
   * @param {Payment[]} payments
   * @returns {Promise<{ buffer: Uint8Array; error?: unknown }>}
   */
  public encode = (
    payments: Payment[]
  ): Promise<{ buffer: Uint8Array; error?: unknown }> => {
    return new Promise((resolve, reject) => {
      try {
        const errMsg = this.Payment.verify({ payments })
        if (errMsg) {
          reject({ error: errMsg })
        }
        const message = this.Payment.create({ payments })
        // Encode the message to a buffer
        const buffer = this.Payment.encode(message).finish()
        resolve({ buffer })
      } catch (error) {
        reject({ error })
      }
    })
  }

  /**
   * @param {protobuf.Buffer} buffer
   * @returns {Promise<Payment>}
   */
  public decode = (
    buffer: protobuf.Buffer
  ): Promise<{ resource: any; error?: any }> => {
    return new Promise((resolve, reject) => {
      try {
        const payments = this.Payment.toObject(
          this.Payment.decode(buffer),
          this.decodeOptions
        )
        resolve({ resource: payments })
      } catch (error) {
        reject({ error })
      }
    })
  }
}
