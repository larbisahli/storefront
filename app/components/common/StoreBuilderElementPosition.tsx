import {
  StoreBuilder,
  BuilderAttributes,
  StoreBuilderActions
} from '@dropgala/types'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'
import { builderURL } from '@dropgala/utils/utils'
import { memo, useEffect } from 'react'

const StoreBuilderElementPosition = () => {
  const { isInIframe } = useIsInIframe()

  function findParentWithComponentId(element: HTMLElement | Element | null) {
    const componentElement =
      element &&
      typeof element.closest === 'function' &&
      element?.closest('[data-c-id]')
    if (componentElement) {
      const componentId = componentElement.getAttribute(
        BuilderAttributes.COMPONENT_ID
      )
      const moduleName = componentElement.getAttribute(
        BuilderAttributes.COMPONENT_NAME
      )
      const moduleGroup = componentElement.getAttribute(
        BuilderAttributes.COMPONENT_GROUP
      )
      const isAddAfter = componentElement.getAttribute(
        BuilderAttributes.ADD_AFTER
      )
      const isAddBefore = componentElement.getAttribute(
        BuilderAttributes.ADD_BEFORE
      )
      const isEdit = componentElement.getAttribute(BuilderAttributes.EDIT)
      const isDuplicate = componentElement.getAttribute(
        BuilderAttributes.DUPLICATE
      )
      const isDelete = componentElement.getAttribute(BuilderAttributes.DELETE)
      const isLibrary = componentElement.getAttribute(
        BuilderAttributes.ADD_LIBRARY
      )

      const rect = componentElement.getBoundingClientRect()
      return {
        componentId,
        moduleName,
        moduleGroup,
        isAddAfter: isAddAfter && isAddAfter?.toLowerCase() === 'true',
        isAddBefore: isAddBefore && isAddBefore?.toLowerCase() === 'true',
        isEdit: isEdit && isEdit?.toLowerCase() === 'true',
        isDuplicate: isDuplicate && isDuplicate?.toLowerCase() === 'true',
        isDelete: isDelete && isDelete?.toLowerCase() === 'true',
        isLibrary: isLibrary && isLibrary?.toLowerCase() === 'true',
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      }
    } else {
      return {
        componentId: null,
        moduleName: null,
        moduleGroup: null,
        isAddAfter: false,
        isAddBefore: false,
        isEdit: false,
        isDuplicate: false,
        isDelete: false,
        isLibrary: false,
        rect: null
      }
    }
  }

  useEffect(() => {
    if (isInIframe) {
      const handlePostMessage = (
        event: any,
        {
          isHover,
          isClick,
          reset
        }: { isHover: boolean; isClick: boolean; reset: boolean }
      ) => {
        let element = null
        if (!reset) {
          element = event.target
        }
        const results = findParentWithComponentId(element)
        window.parent.postMessage(
          {
            source: StoreBuilder.GALA_CMS_BUILDER,
            ...results,
            isHover,
            isClick
          },
          builderURL
        )
      }

      // Add event listener
      document.addEventListener('mouseover', (e) =>
        handlePostMessage(e, { isHover: true, isClick: false, reset: false })
      )
      document.addEventListener('click', (e) =>
        handlePostMessage(e, { isHover: false, isClick: true, reset: false })
      )
      window.addEventListener(
        'scroll',
        (e) =>
          handlePostMessage(e, { isHover: false, isClick: false, reset: true }),
        { passive: true }
      )
      // Clean up the event listener
      return () => {
        document.removeEventListener('mouseover', (e) =>
          handlePostMessage(e, { isHover: true, isClick: false, reset: false })
        )
        document.removeEventListener('click', (e) =>
          handlePostMessage(e, { isHover: false, isClick: true, reset: false })
        )
        window.removeEventListener('scroll', (e) =>
          handlePostMessage(e, { isHover: false, isClick: false, reset: true })
        )
      }
    }
  }, [isInIframe])

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.source == StoreBuilder.GALA_CMS_BUILDER) {
          if (event.data?.actionType === StoreBuilderActions.BLOCK_SELECTION) {
            console.log('11010101010100', {
              source: StoreBuilder.GALA_CMS_BUILDER,
              ...event.data,
              isHover: true,
              isClick: false
            })
            const element = document.querySelector(
              `[${BuilderAttributes.COMPONENT_ID}="${event.data?.componentId}"]`
            )
            const results = findParentWithComponentId(element)
            window.parent.postMessage(
              {
                source: StoreBuilder.GALA_CMS_BUILDER,
                ...results,
                isHover: true,
                isClick: false
              },
              builderURL
            )
          } else if (
            event.data?.actionType === StoreBuilderActions.SCROLL_TO_SECTION &&
            event.data?.componentId
          ) {
            const ele = document.querySelector(
              `[${BuilderAttributes.COMPONENT_ID}="${event.data?.componentId}"]`
            )
            if (ele) {
              const marginTop = 185
              const rect = ele.getBoundingClientRect()
              window.scrollTo({
                top: window.scrollY + rect.top - marginTop,
                behavior: 'smooth'
              })
            }
          }
        }
      },
      false
    )
  }, [])

  return null
}
export default memo(StoreBuilderElementPosition)
