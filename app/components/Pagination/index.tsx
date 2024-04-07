import { ModuleNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const Pagination = (props: any) =>
  componentFactory(null, ModuleNames.PAGINATION, { ...props })
export default Pagination
