import { setCart, setCheckout } from '@dropgala/store'
import { CartType, CheckoutState } from '@dropgala/types/product.type'
import { CheckoutService } from '@gRPC/services'
import { GetServerSidePropsContext } from 'next'
import requestIp from 'request-ip'

const checkoutService = new CheckoutService()

export const fetchClientCart = async ({
  alias,
  storeLanguageId,
  cuid,
  storeId
}: {
  alias: string
  storeLanguageId: number
  cuid: string
  storeId?: string
}) => {
  if (!cuid) return null
  const { cart = null, error: cartError } = await checkoutService.getStoreCart({
    alias,
    storeLanguageId,
    cuid,
    storeId
  })
  if (cartError) throw { cartError }
  if (!cart) return null
  return setCart({
    cart: cart as unknown as CartType
  })
}

export const fetchClientCheckout = async (
  context: GetServerSidePropsContext,
  cuid: string
) => {
  if (!cuid) return null
  const { checkout = null, error: checkoutError } =
    await checkoutService.getStoreCheckout(cuid)
  if (checkoutError) throw { checkoutError }
  if (!checkout) return null

  const { req } = context
  const clientIp = requestIp.getClientIp(req)

  return setCheckout({
    checkout: {
      ...((checkout ?? {}) as unknown as CheckoutState),
      metadata: { ip: clientIp }
    }
  })
}
