import { serializeNestedBuffers } from '@dropgala/utils/utils'

const paymentService = null

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
