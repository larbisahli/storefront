import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'clsx'

const LoadingBar = () => {
  const Router = useRouter()
  const [Loading, setLoading] = useState<boolean>(false)
  const LoadingStateCache = useRef<boolean>(false)
  LoadingStateCache.current = Loading
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (!LoadingStateCache.current) setLoading(true)
    })
    Router.events.on('routeChangeComplete', () => {
      if (LoadingStateCache.current) {
        setLoading(false)
      }
    })
    Router.events.on('routeChangeError', () => {
      setLoading(false)
    })
    return () => setLoading(false)
  }, [Router.events])

  return (
    <div
      className={cn('loading-bar-container', { 'loading-bar--show': Loading })}
    ></div>
  )
}

export default LoadingBar
