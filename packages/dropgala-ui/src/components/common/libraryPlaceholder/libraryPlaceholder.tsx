import EditLibraryIcon from '@dropgala/assets/icons/edit-library'
import { StoreBuilder } from '@dropgala/types'
import { memo } from 'react'
import cn from 'clsx'
import { builderURL } from '@dropgala/utils/utils'

const LibraryPlaceholderBlock = (props: any) => {
  const handlePostMessage = (e: any) => {
    e.preventDefault()
    window.parent.postMessage(
      {
        source: StoreBuilder.GALA_CMS_BUILDER_LIBRARY,
        moduleName: props.moduleName,
        moduleGroup: props.moduleGroup,
        componentId: props.componentId
      },
      builderURL
    )
  }

  return (
    <>
      <div
        className={cn(
          'z-[999] absolute top-0 w-full h-[2px] bg-[#A131ED] hidden',
          'group-hover/library:block'
        )}
      ></div>
      <div
        className={cn(
          'z-[999] absolute top-0 left-0 w-[2px] h-full bg-[#A131ED] hidden',
          'group-hover/library:block'
        )}
      ></div>
      <div
        className={cn(
          'z-[999] absolute top-0 right-0 w-[2px] h-full bg-[#A131ED] hidden',
          'group-hover/library:block'
        )}
      ></div>
      <div
        className={cn(
          'z-[999] absolute bottom-0 w-full h-[2px] bg-[#A131ED] hidden',
          'group-hover/library:block'
        )}
      ></div>
      <button
        title="Component Library"
        onClick={handlePostMessage}
        className={cn(
          'z-[999] absolute left-0 hidden',
          'group-hover/library:block',
          'pb-2 top-[0] left-[0]'
        )}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#A131ED] hover:bg-[#A131ED]">
          <EditLibraryIcon width={18} height={18} />
        </div>
      </button>
    </>
  )
}

export default memo(LibraryPlaceholderBlock)
