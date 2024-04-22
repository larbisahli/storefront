import EditIcon from '@dropgala/assets/icons/edit'
import { StoreBuilder } from '@dropgala/types'
import { useEffect, useState } from 'react'

const BuilderPlaceholder = (props: any) => {
  const [inIFrame, setInIframe] = useState(false)
  useEffect(() => {
    if (window.location !== window.parent.location) setInIframe(true)
    else setInIframe(false)
  }, [])
  if (!inIFrame) return null
  return (
    <>
      <div className="z-[999] absolute top-0 w-full h-[2px] bg-[#0042ff] hidden group-hover:block"></div>
      <div className="z-[999] absolute left-0 w-[2px] h-full bg-[#0042ff] hidden group-hover:block"></div>
      <div className="z-[999] absolute right-0 w-[2px] h-full bg-[#0042ff] hidden group-hover:block"></div>
      <div className="z-[999] absolute bottom-0 w-full h-[2px] bg-[#0042ff] hidden group-hover:block"></div>
      <button
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
        className="text-white z-[999] absolute px-2 py-1 items-center left-0 bg-[#0042ff] hidden hover:bg-[#2b64ff] group-hover:flex"
      >
        <EditIcon />
        <span className="pl-1 text-sm text-white">{props.editTitle}</span>
      </button>
    </>
  )
}

export default BuilderPlaceholder
