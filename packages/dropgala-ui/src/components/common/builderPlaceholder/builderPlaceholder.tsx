import EditIcon from '@dropgala/assets/icons/edit'
import TrashIcon from '@dropgala/assets/icons/trash'
import AddIcon from '@dropgala/assets/icons/add'
import DuplicateIcon from '@dropgala/assets/icons/copy'
import { StoreBuilder, StoreBuilderActions } from '@dropgala/types'
import { memo, useEffect, useState } from 'react'
import cn from 'clsx'
import { builderURL } from '@dropgala/utils/utils'

const PlaceholderBlock = (props: any) => {
  const [adminSelectedBlock, SetAdminSelectedBlock] = useState({
    componentId: null
  })

  const isAdminSelectedBlock =
    props.componentId === adminSelectedBlock?.componentId

  useEffect(() => {
    // TODO: Add hight level listerner with redux
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.source == StoreBuilder.GALA_CMS_BUILDER) {
          SetAdminSelectedBlock(event.data)
        }
      },
      false
    )
  }, [])

  const handlePostMessage = (actionType: string) => {
    window.parent.postMessage(
      {
        source: StoreBuilder.GALA_CMS_BUILDER,
        moduleName: props.moduleName,
        moduleGroup: props.moduleGroup,
        componentId: props.componentId,
        position: props.position,
        actionType
      },
      builderURL
    )
  }

  const renderEditButton = () => {
    return (
      <button
        title="Edit block"
        onClick={() => handlePostMessage(StoreBuilderActions.EDIT_ACTION)}
        className={cn(
          'z-[999] absolute left-0 hidden group-hover:block',
          isAdminSelectedBlock && '!block',
          {
            'pb-2 top-[-28px]': !props.isEditRemoveBottom,
            'pt-2 bottom-[-28px]': props.isEditRemoveBottom
          }
        )}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#A131ED] hover:bg-[#A131ED]">
          <EditIcon width={16} height={16} />
        </div>
      </button>
    )
  }

  const renderRemoveButton = () => {
    return (
      <button
        title="Remove block"
        onClick={() => handlePostMessage(StoreBuilderActions.DELETE_ACTION)}
        className={cn(
          'z-[999] right-0 absolute hidden group-hover:block',
          isAdminSelectedBlock && '!block',
          {
            'pb-2 top-[-28px]': !props.isEditRemoveBottom,
            'pt-2 bottom-[-28px]': props.isEditRemoveBottom
          }
        )}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#A131ED] hover:bg-[#A131ED]">
          <TrashIcon />
        </div>
      </button>
    )
  }

  const renderAddBeforeButton = () => {
    return (
      <button
        title="Add new block before"
        onClick={() => handlePostMessage(StoreBuilderActions.ADD_NEW_BEFORE)}
        className={cn(
          'z-[999] absolute left-1/2 transform -translate-x-1/2 top-[-28px] pb-2 hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#A131ED] hover:bg-[#A131ED]">
          <AddIcon />
        </div>
      </button>
    )
  }
  const renderAddAfterButton = () => {
    return (
      <button
        title="Add new block after"
        onClick={() => handlePostMessage(StoreBuilderActions.ADD_NEW_AFTER)}
        className={cn(
          'z-[999] absolute left-1/2 transform -translate-x-1/2 bottom-[-28px] pt-2 hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#A131ED] hover:bg-[#A131ED]">
          <AddIcon />
        </div>
      </button>
    )
  }
  const renderDuplicateButton = () => {
    return (
      <button
        title="Duplicate"
        onClick={() => handlePostMessage(StoreBuilderActions.DUPLICATE_BLOCK)}
        className={cn(
          'z-[999] absolute right-0 bottom-[-28px] pt-2 hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#A131ED] hover:bg-[#A131ED]">
          <DuplicateIcon width={14} height={14} />
        </div>
      </button>
    )
  }

  return (
    <>
      <div
        className={cn(
          'z-[999] absolute top-0 w-full h-[2px] bg-[#A131ED] hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      ></div>
      <div
        className={cn(
          'z-[999] absolute top-0 left-0 w-[2px] h-full bg-[#A131ED] hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      ></div>
      <div
        className={cn(
          'z-[999] absolute top-0 right-0 w-[2px] h-full bg-[#A131ED] hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      ></div>
      <div
        className={cn(
          'z-[999] absolute bottom-0 w-full h-[2px] bg-[#A131ED] hidden group-hover:block',
          isAdminSelectedBlock && '!block'
        )}
      ></div>
      {/* EDIT */}
      {props?.isEdit && renderEditButton()}
      {/* REMOVE */}
      {props?.isRemove && renderRemoveButton()}
      {/* ADD BEFORE */}
      {props?.isAddBefore && renderAddBeforeButton()}
      {/* ADD AFTER */}
      {props?.isAddAfter && renderAddAfterButton()}
      {/* DUPLICATE */}
      {props?.isDuplicate && renderDuplicateButton()}
    </>
  )
}

export default memo(PlaceholderBlock)
