import ReactHtmlParser from 'html-react-parser'
import { PageType } from '@dropgala/types/page.type'

interface Props {
  page: PageType
}

export default function PageCms({ page }: Props) {
  const { name, content } = page

  return (
    <div className="w-full">
      <div className="font-medium flex justify-center mt-8 mb-14 capitalize">
        <h1 className="text-3xl">{name}</h1>
      </div>
      <div className="break-all xl:px-2 py-5 lg:py-8 xl:py-10 sm:px-0">
        {ReactHtmlParser(content ?? '')}
      </div>
    </div>
  )
}
