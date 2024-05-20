import { memo, useMemo } from 'react'
import * as components from '.'
import { cloneDeep, isEmpty } from '@dropgala/utils/lodashFunctions'
import { resolvePath } from '@dropgala/utils/helpers'
import { StoreLayoutComponentType } from '@dropgala/types'

const CustomProfiler = ({ data = [], ...props }: any) => {
  const sortedComponents = useMemo(() => {
    return isEmpty(data)
      ? []
      : cloneDeep(data)?.sort(
          (a: { position: number }, b: { position: number }) =>
            a.position - b.position
        )
  }, [data])
  return sortedComponents?.map((component: StoreLayoutComponentType) => {
    const children = resolvePath(component, 'children', null) as any[]
    const Component = (
      components as { [key: string]: (props: any) => JSX.Element }
    )[component?.moduleGroup]
    if (!Component) return null
    return (
      <Component key={component?.componentId} {...{ ...component, ...props }}>
        {!isEmpty(children) &&
          children?.map((child) => (
            <CustomProfiler
              key={child?.componentId}
              {...{
                ...props,
                moduleName: child?.moduleName,
                moduleGroup: child?.moduleGroup,
                data: [child]
              }}
            />
          ))}
      </Component>
    )
  })
}

export default memo(CustomProfiler)
