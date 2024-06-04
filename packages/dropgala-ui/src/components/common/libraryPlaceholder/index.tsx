import dynamic from 'next/dynamic'
import { memo, useEffect, useState } from 'react'

const LibraryPlaceholderBlock = dynamic(() => import('./libraryPlaceholder'), {
  loading: () => null,
  ssr: false
})

const LibraryPlaceholder = (props: any) => {
  const [inIFrame, setInIframe] = useState(false)
  useEffect(() => {
    if (window.location !== window.parent.location) setInIframe(true)
    else setInIframe(false)
  }, [])
  if (!inIFrame) return null
  return <LibraryPlaceholderBlock {...props} />
}

export default memo(LibraryPlaceholder)
