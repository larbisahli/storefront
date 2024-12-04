import { CookieNames } from '@dropgala/types/common.type'
import { ConfigType } from '@dropgala/types/config.type'
import { PRODUCTION_ENV } from '@dropgala/utils/utils'
import Cookies from 'cookies'
import Tokens from 'csrf'
import type { GetServerSidePropsContext } from 'next'
import { sha256 } from 'crypto-hash'

const tokens = new Tokens()

export async function XSRFHandler(context: GetServerSidePropsContext) {
  const { req, res } = context

  const cookies = new Cookies(req, res)
  const storedCsrfSecret = cookies.get(CookieNames.XSRF_TOKEN)

  let csrfToken: string | null = null
  let csrfSecret: string | null = null
  let csrfError: string | null = null

  try {
    if (storedCsrfSecret) {
      csrfSecret = storedCsrfSecret
    } else {
      // generate & set new secret
      csrfSecret = tokens.secretSync()
    }

    // create new token
    csrfToken = tokens.create(csrfSecret)

    if (!storedCsrfSecret && csrfSecret) {
      cookies.set(CookieNames.XSRF_TOKEN, csrfSecret, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Token is valid for 24 hours
        sameSite: 'strict',
        domain: PRODUCTION_ENV ? '.dropgala.shop' : 'localhost',
        overwrite: true
      })
    }
  } catch (err) {
    // @ts-ignore
    console.log('err :>> ', err.message)
    // @ts-ignore
    csrfError = err.message
  }

  return { csrfSecret, csrfToken, csrfError }
}

export async function storeMaintenanceHandler(
  context: GetServerSidePropsContext,
  config: ConfigType
) {
  return false

  const { req, res } = context

  const cookies = new Cookies(req, res, { secure: PRODUCTION_ENV })
  const GALA_MTM_PASS = cookies.get(CookieNames.GALA_MTM_PASS)
  const { maintenanceMode, maintenancePassword } = config

  try {
    if (maintenanceMode && maintenancePassword) {
      const currentPass = await sha256(maintenancePassword.toString())
      if (currentPass === GALA_MTM_PASS) {
        return false
      } else if (GALA_MTM_PASS) {
        cookies.set( CookieNames.GALA_MTM_PASS , '', {
          httpOnly: true,
          maxAge: 0,
          sameSite: PRODUCTION_ENV ? 'none':'strict', // strict
          secure: PRODUCTION_ENV,
          domain: PRODUCTION_ENV ? '.dropgala.shop' : 'localhost',
          overwrite: true
        })
        return true
      }
      return true
    }
    return false
  } catch (err) {
    // @ts-ignore
    console.log('err :>> ', err.message)
    // @ts-ignore
    csrfError = err.message
  }
}
