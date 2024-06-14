import React from 'react'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import { getComponentFromChildren, resolvePath } from '@dropgala/utils/helpers'
import Link from 'next/link'
import {
  ModuleGroup,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import LibraryPlaceholder from '../common/libraryPlaceholder'

interface Props extends StoreProps {}

const BannerWidgetBg: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { header, description, buttonLink, buttonLabel } =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const renderButton = () => {
    const Button = getComponentFromChildren(children, ModuleGroup.BUTTON)
    if (!Button) return null
    return React.cloneElement(Button, { label: buttonLabel })
  }

  return (
    <figcaption
      className={cn(
        'relative group/library',
        'bg-white',
        'flex flex-col justify-center items-center p-5 rounded-md max-w-[80%] opacity-95 border'
      )}
    >
      <LibraryPlaceholder {...props} isEdit />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-2xl mb-5">{header}</h2>
        <p className="text-center mb-8  max-w-[90%]">{description}</p>
        {buttonLabel && <Link href={buttonLink ?? '/'}>{renderButton()}</Link>}
      </div>
    </figcaption>
  )
}

export default BannerWidgetBg
