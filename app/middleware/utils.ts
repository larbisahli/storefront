import { CookieNames } from '@dropgala/types/common.type'
import { PRODUCTION_ENV } from '@dropgala/utils/utils'
import Cookies from 'cookies'
import Tokens from 'csrf'
import type { GetServerSidePropsContext } from 'next'

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
    console.log('err :>> ', err.message)
    csrfError = err.message
  }

  return { csrfSecret, csrfToken, csrfError }
}
