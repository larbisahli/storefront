import { IncomingMessage } from 'http'
import sizeof from 'object-sizeof'

const isProd = process.env.NODE_ENV === 'production'

export const getHost = (req: IncomingMessage) => {
  const host = req?.headers?.host ?? ''
  const alias = req?.headers?.host?.split('.')[0]
  return { host, alias: isProd ? alias : 'storerara' }
}

export function bytesToSize(data: any) {
  const bytes = sizeof(data)
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  // @ts-ignore
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}
