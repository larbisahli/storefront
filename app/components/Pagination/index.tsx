import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const Pagination = (props: any) =>
  componentFactory(ComponentNames.PAGINATION, { ...props })
export default Pagination
