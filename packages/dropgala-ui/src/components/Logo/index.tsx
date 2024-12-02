import React from 'react'
import { selectConfig, StoreProps } from '@dropgala/store'
import Link from '../common/Link'
import Image from '../common/Image'
import { mediaURL } from '@dropgala/utils/utils'

interface Props extends StoreProps { }

const Logo: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const storeConfig = useAppSelector(selectConfig)
  const { device } = storeConfig

  const storeLogo = !!storeConfig?.logo?.length
    ? `${mediaURL}/${storeConfig?.logo[0].image}`
    : '/assets/images/default_logo.webp'

  return (
    <div className="">
      <Link href="/">
        <Image
          isCustomUrl
          src={storeLogo}
          objectFit="cover"
          height={device?.isDesktop ? 45 : 30}
          width={device?.isDesktop ? 45 : 30}
          alt="logo"
        />
      </Link>
    </div>
  )
}

export default Logo
