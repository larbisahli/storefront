import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import { renderComponent } from '@lib/packages'

const Footer = () => {
  const { theme } = useAppSelector(selectConfig)
  return renderComponent(theme, ComponentNames.FOOTER, {})
}

export default Footer
