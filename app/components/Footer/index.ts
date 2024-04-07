import { selectConfig } from '@dropgala/store'
import { ModuleNames } from '@dropgala/types'
import { resolvePath } from '@dropgala/utils/helpers'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const Footer = (props: any) => {
  const { jssState } = useAppSelector(selectConfig)
  const data = resolvePath(jssState, 'galaCore.route.jss-footer', {})
  return componentFactory(null, ModuleNames.FOOTER, { ...props, ...data })
}

export default Footer
