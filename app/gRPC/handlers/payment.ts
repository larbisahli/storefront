import { serializeNestedBuffers } from '@dropgala/utils/utils'
import PaymentService from '@gRPC/services/payment.service'

const paymentService = new PaymentService()

export const fetchAvailablePayments = async ({
  alias,
  storeId
}: {
  alias: string
  storeId?: string
}) => {
  const { payments = [], error: paymentError } =
    await paymentService.getStorePayments(alias, storeId)
  if (paymentError) throw { paymentError }
  return payments?.map((payment) => serializeNestedBuffers(payment))
}
