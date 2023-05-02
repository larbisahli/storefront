import { IncomingMessage } from 'http'

export const getHost = (req: IncomingMessage) => {
  const host = req.headers.host ?? ''
  const alias = req.headers.host?.split('.')[0]
  return { host, alias }
}
