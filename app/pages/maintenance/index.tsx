import { wrapper } from '@dropgala/store'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getHost } from 'utils'
import Cookies from 'cookies'
import { CookieNames } from '@dropgala/types/common.type'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function MaintenancePage() {
  const router = useRouter()
  const [password, setPassword] = useState({
    'code-1': '',
    'code-2': '',
    'code-3': '',
    'code-4': '',
    'code-5': '',
    'code-6': ''
  })

  useEffect(() => {
    let pass = ''
    for (const [key, value] of Object.entries(password)) {
      if (value) {
        pass = pass + value
      }
    }
    if (pass.length === 6) {
      router.push(`/maintenance/${pass}`, `/maintenance/${pass}`, {
        shallow: true
      })
      router.events.on('routeChangeComplete', () => {
        router.reload()
      })
    }
  }, [password])

  function focusNextInput(el, prevId: string, nextId: string) {
    if (el.value.length === 0) {
      if (prevId) {
        document.getElementById(prevId)?.focus()
      }
    } else {
      if (nextId) {
        document.getElementById(nextId)?.focus()
      }
    }
  }

  useEffect(() => {
    document
      .querySelectorAll('[data-focus-input-init]')
      .forEach(function (element) {
        element.addEventListener('keyup', function () {
          const prevId = element.getAttribute('data-focus-input-prev') as string
          const nextId = element.getAttribute('data-focus-input-next') as string
          focusNextInput(element, prevId, nextId)
        })
      })
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Maintenance</title>
      </Head>
      <div className="mb-44 mx-2 flex justify-center items-center">
        <form className="max-w-sm mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 -mt-8">
              <Image
                alt="logo"
                src={'/assets/images/logo-no-background.png'}
                width={88}
                height={88}
              />
            </div>
            <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
              <div>
                <label htmlFor="code-1" className="sr-only">
                  First code
                </label>
                <input
                  value={password['code-1']}
                  onChange={(e) =>
                    setPassword((v) => ({
                      ...v,
                      [e.target.id]: e.target.value
                    }))
                  }
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-next="code-2"
                  id="code-1"
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="code-2" className="sr-only">
                  Second code
                </label>
                <input
                  value={password['code-2']}
                  onChange={(e) =>
                    setPassword((v) => ({
                      ...v,
                      [e.target.id]: e.target.value
                    }))
                  }
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-1"
                  data-focus-input-next="code-3"
                  id="code-2"
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="code-3" className="sr-only">
                  Third code
                </label>
                <input
                  value={password['code-3']}
                  onChange={(e) =>
                    setPassword((v) => ({
                      ...v,
                      [e.target.id]: e.target.value
                    }))
                  }
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-2"
                  data-focus-input-next="code-4"
                  id="code-3"
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500 "
                  required
                />
              </div>
              <div>
                <label htmlFor="code-4" className="sr-only">
                  Fourth code
                </label>
                <input
                  value={password['code-4']}
                  onChange={(e) =>
                    setPassword((v) => ({
                      ...v,
                      [e.target.id]: e.target.value
                    }))
                  }
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-3"
                  data-focus-input-next="code-5"
                  id="code-4"
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="code-5" className="sr-only">
                  Fifth code
                </label>
                <input
                  value={password['code-5']}
                  onChange={(e) =>
                    setPassword((v) => ({
                      ...v,
                      [e.target.id]: e.target.value
                    }))
                  }
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-4"
                  data-focus-input-next="code-6"
                  id="code-5"
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="code-6" className="sr-only">
                  Sixth code
                </label>
                <input
                  value={password['code-6']}
                  onChange={(e) =>
                    setPassword((v) => ({
                      ...v,
                      [e.target.id]: e.target.value
                    }))
                  }
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-5"
                  id="code-6"
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500 "
                  required
                />
              </div>
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-center text-sm text-gray-700"
            >
              Please enter the 6 digit preview code.
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context
    const { host, alias = '' } = getHost(req)

    const cookies = new Cookies(req, res)
    const GALA_MTM_PASS = cookies.get(CookieNames.GALA_MTM_PASS)

    try {
      if (GALA_MTM_PASS) {
        return {
          redirect: {
            permanent: false,
            destination: '/'
          }
        }
      }

      return {
        props: {
          host: { host, alias }
        }
      }
    } catch (error) {
      console.log('error: --------------<>', { error })
      return {
        notFound: true
      }
    }
  })
