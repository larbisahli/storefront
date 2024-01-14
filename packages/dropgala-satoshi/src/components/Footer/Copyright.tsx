import React from 'react'

import { siteSettings } from '../../settings/site-settings'
import Image from '../common/Image'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import { ConfigType } from '@dropgala/types/config.type'

interface CopyrightProps {
  payment?: {
    id: string | number
    path?: string
    name: string
    image: string
    width: number
    height: number
  }[]
  storeConfig: ConfigType
}
const year = new Date().getFullYear()
const Copyright: React.FC<CopyrightProps> = ({ payment, storeConfig }) => {
  const { __ } = useTranslation(storeConfig?.language, 'common')
  return (
    <div className="pb-20 lg:pb-7">
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
        <div className="flex flex-col md:flex-row text-center md:justify-between border-t border-skin-three pt-6 lg:pt-7">
          <p className="text-skin-base text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &copy;&nbsp;{__('copyright')} {year}&nbsp;
            <a
              className="text-skin-base transition-colors duration-200 ease-in-out hover:text-skin-primary"
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; {__('All Rights Reserved')}
          </p>

          {payment && (
            <ul className="flex flex-wrap justify-center items-center space-s-4 sm:space-s-5 lg:space-s-7 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex mr-3"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      isCustomUrl
                      placeholder="empty"
                      src={item.image}
                      alt={item.name ?? ''}
                      height={item.height}
                      width={item.width}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Copyright
