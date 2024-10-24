import CloseIcon from '@dropgala/assets/icons/close'
import EditIcon from '@dropgala/assets/icons/edit'
import { selectConfig } from '@dropgala/store'
import Link from '@dropgala/ui/components/common/Link'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { useAppSelector } from '@hooks/useStore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const MTM_SESSION_NAME = 'gala-mtm-hide'

const MaintenanceBanner = () => {
  const { maintenanceMode, maintenancePassword } = useAppSelector(selectConfig)
  const [show, setShow] = useState(false)

  const { isInIframe } = useIsInIframe()

  useEffect(() => {
    const value = window.sessionStorage.getItem(MTM_SESSION_NAME)
    console.log({ value })
    if (value) {
      const hideBanner = JSON.parse(value ?? '')
      if (hideBanner) {
        setShow(false)
        return
      }
    }
    setTimeout(() => {
      setShow(true)
    }, 1000)
  }, [])

  if (isInIframe) return null

  if (maintenanceMode && show) {
    return (
      <div className="bg-gray-900 fixed bottom-0 left-0 right-0 z-50 shadow-header">
        <div className="px-4 py-3 flex justify-between items-center mobile:flex-col tablet:flex-col">
          <div className="flex items-center">
            <div>
              <Image
                alt="logo"
                src={'/assets/images/logo-no-background.png'}
                width={35}
                height={35}
              />
            </div>
            <div className="flex items-center text-white">
              <div>
                Your storefront is private. Share your site with preview code:
              </div>
              <div className="font-semibold px-1">{maintenancePassword}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              target="_blank"
              href={'https://dropgala.com/admin/content/layout/home-page'}
            >
              <div className="flex items-center">
                <div className="text-blue-400 mx-2">
                  <EditIcon></EditIcon>
                </div>
                <div className="text-blue-400">
                  Design this page in Page Builder
                </div>
              </div>
            </Link>
            <button
              onClick={() => {
                setShow(false)
                window.sessionStorage.setItem(MTM_SESSION_NAME, 'true')
              }}
              className="text-white mx-5 p-2 rounded-full bg-red-500"
            >
              <CloseIcon width={8} height={8}></CloseIcon>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
export default MaintenanceBanner
