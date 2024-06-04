import { PageBuilderStyles } from '@dropgala/types'

const handleBorderWidth = (border: PageBuilderStyles['Border']) => {
  if (!border) return ''
  if (border?.border === 'all') {
    return `border: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'top') {
    return `border-top: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'left') {
    return `border-left: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'right') {
    return `border-right: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'bottom') {
    return `border-bottom: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
}

export const handleBorderStyle = (border: PageBuilderStyles['Border']) => {
  if (!border) return ''
  return `border-radius: ${
    border?.borderRadius
  }px !important; ${handleBorderWidth(border)}`
}

export const handleOverlayStyle = (
  overlay: PageBuilderStyles['Overlay'],
  border?: PageBuilderStyles['Border']
) => {
  if (!overlay) return ''
  return `background-color: ${overlay?.overlayColor};opacity: ${
    Number(overlay?.overlayOpacity ?? 10) / 100
  };border-radius: ${
    border?.borderRadius ?? 0
  }px;position: absolute;right: 0;top: 0;left: 0;bottom: 0;z-index: 1;
    `
}

export const handleTypographyStyle = (
  typography: PageBuilderStyles['Typography']
) => {
  if (!typography) return ''
  return `font-family: var(${typography?.fontFamily?.value});font-size: ${typography?.fontSize}px;font-style: ${typography?.fontStyle};font-weight: ${typography?.fontWeight?.value};color: ${typography?.color};letter-spacing: ${typography?.letterSpacing}px;line-height: ${typography?.lineHeight}px;text-align: ${typography?.textAlign};text-decoration: ${typography?.textDecoration};text-transform: ${typography?.textTransform};`
}

export const handleSpacingStyle = (spacing: PageBuilderStyles['Spacing']) => {
  if (!spacing) return ''
  return ``
}
