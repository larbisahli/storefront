import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

const Footer = () => {
  const storeConfig = useAppSelector(selectConfig)
  return renderRemoteComponent(storeConfig.theme, ComponentNames.FOOTER, {storeConfig})
}

export default Footer
