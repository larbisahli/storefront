const shippingService = null

export const fetchAvailableShippings = async ({
  alias,
  storeId
}: {
  alias: string
  storeId?: string
}) => {
  const { shippings = [], error: shippingError } =
    await shippingService.getStoreShippings(alias, storeId)
  if (shippingError) throw { shippingError }
  return shippings
}
