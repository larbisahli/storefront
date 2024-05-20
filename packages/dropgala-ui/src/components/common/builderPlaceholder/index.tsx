import dynamic from 'next/dynamic'
import { memo, useEffect, useState } from 'react'

const PlaceholderBlock = dynamic(() => import('./builderPlaceholder'), {
  loading: () => null,
  ssr: false
})

const BuilderPlaceholder = (props: any) => {
  const [inIFrame, setInIframe] = useState(false)
  useEffect(() => {
    if (window.location !== window.parent.location) setInIframe(true)
    else setInIframe(false)
  }, [])
  if (!inIFrame) return null
  return <PlaceholderBlock {...props} />
}

export default memo(BuilderPlaceholder)
