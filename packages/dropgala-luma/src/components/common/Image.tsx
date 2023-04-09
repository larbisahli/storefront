import { useGetDataUrl } from '@dropgala/utils/hooks/useGetDataUrl'
import { mediaURL } from '@dropgala/utils/utils'
import Image, { ImageProps } from 'next/image'
import React, { memo, useEffect, useState } from 'react'

import { siteSettings } from '../../settings/site-settings'

interface Props extends ImageProps {
  customPlaceholder: string
  src: string
}

const ImageComponent = ({ src, customPlaceholder, ...props }: Props) => {
  // Store image path
  const [srcImage, setSrc] = useState(() => src)

  // Convert Placeholder image url to base 64
  const Base64Placeholder = useGetDataUrl(customPlaceholder)

  useEffect(() => {
    if (src) {
      setSrc(src)
    }
  }, [src])

  return (
    <Image
      src={`${mediaURL}/${srcImage}`}
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      {...props}
      alt={props.alt ?? ''}
      // In case there is an error return a dummy image placeholder
      onError={() => setSrc(siteSettings?.placeholders?.product?.image)}
    />
  )
}

export default memo(ImageComponent)
