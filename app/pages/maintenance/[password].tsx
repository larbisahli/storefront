import { wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import { sha256 } from 'crypto-hash'
import { PRODUCTION_ENV } from '@dropgala/utils/utils'

export default function MaintenancePassPage() {
  return <div></div>
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res, params } = context
    const password = params?.password as string
    const cookies = new Cookies(req, res)

    try {
      if (password) {
        const pass = await sha256(password)
        cookies.set(CookieNames.GALA_MTM_PASS, pass, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          sameSite: 'strict',
          domain: PRODUCTION_ENV ? '.dropgala.shop' : 'localhost',
          overwrite: true
        })
      }

      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
