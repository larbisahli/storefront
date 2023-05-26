import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

const Header = () => {
  const storeConfig = useAppSelector(selectConfig)
  return renderRemoteComponent(storeConfig.theme, ComponentNames.HEADER, {})
}

export default Header
