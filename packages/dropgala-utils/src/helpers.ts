import { ImageType } from '@dropgala/types/common.type'
import { isArray, isEmpty } from 'lodash'
import React from 'react'

/**
 * Desc: return component
 * @param {JSX.Element[]} JSX.Element[] in which find the component
 * @param {string} string component name
 * */
export const getComponentFromChildren = (
  ChildComponents: JSX.Element[],
  moduleName: string
) => {
  if (isEmpty(ChildComponents)) {
    return null
  }
  return ChildComponents?.find(
    (component) =>
      React.isValidElement(component) &&
      (component?.props as { moduleName: string })?.moduleName === moduleName
  )
}

/**
 * Desc: get value from object/array if path/key exists
 * @param {Object} object/array in which find the path/key
 * @param {String} path/key, has to find in object/array
 * @param {any} default value if path/key not present
 * @return {any} return the value if path/key matches else default value if present else undefined
 * */
export const resolvePath = (obj: any, path: string, defaultValue: any) =>
  (path || '')
    .split('.')
    .reduce(
      (o, p) =>
        o && o[p] !== null && o[p] !== undefined ? o[p] : defaultValue,
      obj || {}
    )

export const getThumbnail = (thumbnail: ImageType[] | null | undefined) => {
  return !isEmpty(thumbnail) && isArray(thumbnail)
    ? thumbnail[0]
    : { image: '', placeholder: '' }
}
