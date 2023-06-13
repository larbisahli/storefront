import { mediaURL } from '@dropgala/utils/utils'
import React, { memo, useEffect, useState } from 'react'

import { siteSettings } from '../../settings/site-settings'
import type { ImageProps } from 'next/dist/client/legacy/image'
import Image from 'next/legacy/image'

interface Props extends ImageProps {
  customPlaceholder?: string
  placeholder?: ImageProps['placeholder']
  src: string
  isCustomUrl?: boolean
}

const Base64Fallback =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg=='

const ImageComponent = ({
  src,
  customPlaceholder,
  placeholder = 'blur',
  isCustomUrl = false,
  ...props
}: Props) => {
  const [Base64Placeholder, setBase64Placeholder] = useState<string>(
    () => Base64Fallback
  )
  const [srcImage, setSrc] = useState(() => src)

  useEffect(() => {
    if (src) {
      setSrc(src)
    }
  }, [src])

  /**
   * Convert Placeholder image url to base64
   */
  useEffect(() => {
    async function toBase64() {
      try {
        const data = await fetch(`${mediaURL}/${customPlaceholder}`)
        const blob = await data.blob()

        return await new Promise<string>((resolve) => {
          const reader = new window.FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            const base64data = reader.result as string
            return resolve(base64data)
          }
        })
          .then((res: string) => {
            setBase64Placeholder(res)
          })
          .catch((error) => {
            console.log('error :>', error)
          })
      } catch (error) {
        console.log('error :>', error)
      }
    }

    if (customPlaceholder) {
      toBase64()
    }
  }, [customPlaceholder])

  const customImagePlaceholder = siteSettings?.placeholders?.product?.image

  return (
    <Image
      src={isCustomUrl ? srcImage : `${mediaURL}/${srcImage}`}
      blurDataURL={Base64Placeholder}
      placeholder={placeholder}
      {...props}
      alt={props.alt ?? ''}
      // In case there is an error return a dummy image placeholder
      onError={() =>
        setSrc(
          isCustomUrl ? `/${customImagePlaceholder}` : customImagePlaceholder
        )
      }
    />
  )
}

export default memo(ImageComponent)
