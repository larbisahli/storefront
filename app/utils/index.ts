import { IncomingMessage } from 'http'

const isProd = process.env.NODE_ENV === 'production'

export const getHost = (req: IncomingMessage) => {
  const host = req?.headers?.host ?? ''
  const alias = req?.headers?.host?.split('.')[0]
  return { host, alias: isProd ? alias : 'store' }
}
