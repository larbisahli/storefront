import React, { memo, useMemo } from 'react'
import * as moduleComponents from '.'
import { cloneDeep, isEmpty } from '@dropgala/utils/lodashFunctions'
import { resolvePath } from '@dropgala/utils/helpers'
import { StoreLayoutComponentType } from '@dropgala/types'

interface Props extends StoreLayoutComponentType {
  components: StoreLayoutComponentType[]
}

const CustomProfiler = ({ components = [], ...props }: Props) => {
  const sortedComponents = useMemo(() => {
    try {
      return isEmpty(components)
        ? []
        : cloneDeep(components)?.sort((a, b) => a.position - b.position)
    } catch (error) {
      console.log('CustomProfiler-Sort-Error', { error, components })
      // sentry({
      //   message: 'CustomProfiler-Sort-Error',
      //   error: action?.error as Error
      // });
      return []
    }
  }, [components])
  return (
    <React.Fragment>
      {sortedComponents?.map((component: StoreLayoutComponentType) => {
        const children = resolvePath<StoreLayoutComponentType[] | []>(
          component,
          'children',
          []
        )
        const Component = (
          moduleComponents as { [key: string]: (props: any) => JSX.Element }
        )[component?.moduleGroup]
        if (!Component) return <React.Fragment key={component?.componentId} />
        return (
          <Component
            key={component?.componentId}
            {...{ ...component, ...props }}
          >
            {!isEmpty(children) &&
              children?.map((child) => (
                <CustomProfiler
                  key={child?.componentId}
                  {...{
                    ...props,
                    moduleName: child?.moduleName,
                    moduleGroup: child?.moduleGroup,
                    components: [child]
                  }}
                />
              ))}
          </Component>
        )
      })}
    </React.Fragment>
  )
}

export default memo(CustomProfiler)
