import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const Footer = () => {
  const storeConfig = useAppSelector(selectConfig)
  return componentFactory(storeConfig.theme, ComponentNames.FOOTER, {})
}

export default Footer
