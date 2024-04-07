import ReactHtmlParser from 'html-react-parser'
import { PageType } from '@dropgala/types/page.type'
import { resolvePath } from '@dropgala/utils/helpers'

interface Props {
  page: PageType
}

export default function PageCms(props: Props) {
  const page = resolvePath(props, 'fields.data', {})
  const { name, content } = page ?? {}
  return (
    <section className="w-full">
      <div className="font-medium mt-8 mb-14 flex lg:justify-start justify-center capitalize bg-gray-200 py-20 px-3">
        <h1 className="text-xl border-t-2 border-b-2 border-black w-fit font-medium py-1 lg:text-3xl lg:w-fit">
          {name}
        </h1>
      </div>
      <div className="px-3 py-5 lg:py-8 xl:py-10 text-xl max-w-6xl break-keep">
        {ReactHtmlParser(content ?? '')}
      </div>
    </section>
  )
}
