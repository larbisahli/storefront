import { memo, useMemo } from 'react'
import * as components from '.'
import { GalaCoreComponentType } from '@dropgala/types'
import { cloneDeep, isEmpty } from '@dropgala/utils/lodashFunctions'
import { resolvePath } from '@dropgala/utils/helpers'

const CustomProfiler = ({ data, ...props }: any) => {
  const sortedComponents = useMemo(() => {
    return cloneDeep(data)?.sort(
      (a: { position: number }, b: { position: number }) =>
        a.position - b.position
    )
  }, [data])
  return sortedComponents?.map((component: GalaCoreComponentType) => {
    const children = resolvePath(component, 'children', null) as any[]
    const Component = (
      components as { [key: string]: (props: any) => JSX.Element }
    )[component?.moduleName]
    if (!Component) return null
    console.log({ component })
    return (
      <Component key={component?.componentId} {...{ ...component, ...props }}>
        {!isEmpty(children) &&
          children?.map((child) => (
            <CustomProfiler
              key={child?.componentId}
              {...{ ...props, moduleName: child?.moduleName, data: [child] }}
            />
          ))}
      </Component>
    )
  })
}

export default memo(CustomProfiler)
