import EditIcon from '@dropgala/assets/icons/edit'
import TrashIcon from '@dropgala/assets/icons/trash'
import AddIcon from '@dropgala/assets/icons/add'
import DuplicateIcon from '@dropgala/assets/icons/copy'
import { StoreBuilder } from '@dropgala/types'
import { useEffect, useState } from 'react'
import cn from 'clsx'

const BuilderPlaceholder = (props: any) => {
  const [inIFrame, setInIframe] = useState(false)
  useEffect(() => {
    if (window.location !== window.parent.location) setInIframe(true)
    else setInIframe(false)
  }, [])
  if (!inIFrame) return null

  const renderEditButton = () => {
    return (
      <button
        title="Remove block"
        onClick={() => {
          window.parent.postMessage(
            {
              source: StoreBuilder.GALA_CMS_BUILDER,
              componentName: props.componentName,
              moduleName: props.moduleName,
              componentId: props.componentId
            },
            'http://localhost:3001'
          )
        }}
        className={cn('z-[999] absolute left-0 hidden group-hover:block', {
          'pb-2 top-[-28px]': !props.isEditRemoveBottom,
          'pt-2 bottom-[-28px]': props.isEditRemoveBottom
        })}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#0042ff] hover:bg-[#2b64ff]">
          <EditIcon width={16} height={16} />
        </div>
      </button>
    )
  }

  const renderRemoveButton = () => {
    return (
      <button
        title="Remove block"
        onClick={() => {
          window.parent.postMessage(
            {
              source: StoreBuilder.GALA_CMS_BUILDER,
              componentName: props.componentName,
              moduleName: props.moduleName,
              componentId: props.componentId
            },
            'http://localhost:3001'
          )
        }}
        className={cn('z-[999] right-0 absolute hidden group-hover:block', {
          'pb-2 top-[-28px]': !props.isEditRemoveBottom,
          'pt-2 bottom-[-28px]': props.isEditRemoveBottom
        })}
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#0042ff] hover:bg-[#2b64ff]">
          <TrashIcon />
        </div>
      </button>
    )
  }

  const renderAddBeforeButton = () => {
    return (
      <button
        title="Add new block before"
        onClick={() => {
          window.parent.postMessage(
            {
              source: StoreBuilder.GALA_CMS_BUILDER,
              componentName: props.componentName,
              moduleName: props.moduleName,
              componentId: props.componentId
            },
            'http://localhost:3001'
          )
        }}
        className="z-[999] absolute left-1/2 transform -translate-x-1/2 top-[-28px] pb-2 hidden group-hover:block"
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#0042ff] hover:bg-[#2b64ff]">
          <AddIcon />
        </div>
      </button>
    )
  }
  const renderAddAfterButton = () => {
    return (
      <button
        title="Add new block before"
        onClick={() => {
          window.parent.postMessage(
            {
              source: StoreBuilder.GALA_CMS_BUILDER,
              componentName: props.componentName,
              moduleName: props.moduleName,
              componentId: props.componentId
            },
            'http://localhost:3001'
          )
        }}
        className="z-[999] absolute left-1/2 transform -translate-x-1/2 bottom-[-28px] pt-2 hidden group-hover:block"
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#0042ff] hover:bg-[#2b64ff]">
          <AddIcon />
        </div>
      </button>
    )
  }
  const renderDuplicateButton = () => {
    return (
      <button
        title="Add new block before"
        onClick={() => {
          window.parent.postMessage(
            {
              source: StoreBuilder.GALA_CMS_BUILDER,
              componentName: props.componentName,
              moduleName: props.moduleName,
              componentId: props.componentId
            },
            'http://localhost:3001'
          )
        }}
        className="z-[999] absolute right-0 bottom-[-28px] pt-2 hidden group-hover:block"
      >
        <div className="text-white h-6 w-6 rounded-sm items-center flex justify-center bg-[#0042ff] hover:bg-[#2b64ff]">
          <DuplicateIcon width={14} height={14} />
        </div>
      </button>
    )
  }
  return (
    <>
      <div className="z-[999] absolute top-0 w-full h-[2px] bg-[#0042ff] hidden group-hover:block"></div>
      <div className="z-[999] absolute left-0 w-[2px] h-full bg-[#0042ff] hidden group-hover:block"></div>
      <div className="z-[999] absolute right-0 w-[2px] h-full bg-[#0042ff] hidden group-hover:block"></div>
      <div className="z-[999] absolute bottom-0 w-full h-[2px] bg-[#0042ff] hidden group-hover:block"></div>
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

export default BuilderPlaceholder
