import dynamicComponents from '@lib/packages'
import { useEffect, useState } from 'react'

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true)

  return {
    acceptedCookies
  }
}
