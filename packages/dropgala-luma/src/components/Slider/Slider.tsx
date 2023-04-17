/* eslint-disable react/prop-types */
import { noop } from '@dropgala/utils/utils'
import cn from 'clsx'
import React, {
  Children,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import ArrowLeft from '../../assets/icons/chevron-left'
import ArrowRight from '../../assets/icons/chevron-right'
import slidy from './SliderUtils'

export default function ReactCustomSlider({
  children,
  doAfterDestroy,
  doAfterInit,
  doAfterSlide,
  doBeforeSlide,
  ease,
  infiniteLoop,
  initialSlide,
  itemsToPreload,
  keyboardNavigation,
  numOfSlides,
  showArrows,
  slide,
  slideSpeed
}: Props) {
  const [slideInstance, setSlideInstance] = useState({
    goTo: noop,
    next: noop,
    prev: noop,
    updateItems: noop
  })
  const [index, setIndex] = useState(initialSlide)
  const [maxIndex, setMaxIndex] = useState(initialSlide)
  const sliderContainerDOMEl = useRef(null)
  const slidesDOMEl = useRef(null)

  const items = Children.toArray(children).filter((child) => child !== null)

  useEffect(
    function () {
      slide !== index && slideInstance.goTo(slide)
    },
    [slide] // eslint-disable-line
  )

  useEffect(
    function () {
      // eslint-disable-next-line no-unused-vars
      let handleKeyboard: (e: React.KeyboardEvent<HTMLDivElement>) => void
      const _slideInstance = slidy(sliderContainerDOMEl.current, {
        ease,
        doAfterSlide,
        doBeforeSlide,
        numOfSlides,
        slideSpeed,
        infiniteLoop,
        slidesDOMEl: slidesDOMEl.current,
        initialSlide: index,
        items: items?.length,
        onNext: (nextIndex: number) => {
          setIndex(nextIndex)
          nextIndex > maxIndex && setMaxIndex(nextIndex)
          return nextIndex
        },
        onPrev: (nextIndex: number) => {
          setIndex(nextIndex)
          return nextIndex
        }
      })

      // @ts-ignore
      setSlideInstance(_slideInstance)
      doAfterInit()

      if (keyboardNavigation) {
        handleKeyboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.keyCode === 39) slideInstance.next(e)
          else if (e.keyCode === 37) slideInstance.prev(e)
        }
        // @ts-ignore
        document.addEventListener('keydown', handleKeyboard)
      }

      return () => {
        _slideInstance && _slideInstance.clean() && _slideInstance.destroy()
        doAfterDestroy()
        if (keyboardNavigation) {
          // @ts-ignore
          document.removeEventListener('keydown', handleKeyboard)
        }
      }
    },
    [] // eslint-disable-line
  )

  useEffect(function () {
    slideInstance && slideInstance.updateItems(items.length)
  })

  const itemsToRender = useMemo(() => {
    const preload = Math.max(itemsToPreload, numOfSlides)
    return items.slice(0, maxIndex + preload)
  }, [items, itemsToPreload, maxIndex, numOfSlides])

  const handlePrev = (e: any) => slideInstance.prev(e)
  const handleNext = (e: any) =>
    items.length > numOfSlides && slideInstance.next(e)

  const renderLeftArrow = () => {
    const hide = items.length === 1 || (index === 0 && !infiniteLoop)

    if (hide) return null

    return (
      <button
        aria-label="Previous"
        onClick={handlePrev}
        className={cn(
          'items-center flex mx-auto absolute transition-all z-[1]',
          'bottom-0 left-0 top-[50%] translate-y-[-50%] hover:translate-x-[3px]',
          'bg-gray-100 bg-opacity-30 cursor-pointer justify-center',
          'h-12 w-12 border border-gray-300'
        )}
      >
        <ArrowLeft width="1rem" height="1rem" />
      </button>
    )
  }
  const renderRightArrow = () => {
    const hide =
      items.length === 1 ||
      ((items.length <= numOfSlides || index === items.length - numOfSlides) &&
        !infiniteLoop)

    if (hide) return null

    return (
      <button
        aria-label="Next"
        onClick={handleNext}
        className={cn(
          'items-center flex mx-auto absolute transition-all z-[1]',
          'bottom-0 right-0 top-[50%] translate-y-[-50%] hover:translate-x-[-3px]',
          'bg-gray-100 bg-opacity-30 cursor-pointer justify-center',
          'h-12 w-12 border border-gray-300'
        )}
      >
        <ArrowRight width="1rem" height="1rem" />
      </button>
    )
  }

  const renderItem = (
    item:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined,
    index: React.Key | null | undefined
  ) => {
    const inlineStyle =
      numOfSlides !== 1 ? { width: `${100 / numOfSlides}%` } : {}
    return (
      <li
        key={index}
        style={inlineStyle}
        className="inline-block relative select-none align-middle w-full"
      >
        {item}
      </li>
    )
  }

  return (
    <>
      {showArrows && (
        <>
          {renderLeftArrow()}
          {renderRightArrow()}
        </>
      )}
      <div
        ref={sliderContainerDOMEl}
        className="max-h-full overflow-hidden relative whitespace-nowrap w-full"
      >
        <ul
          ref={slidesDOMEl}
          className="block list-none p-0 transition-transform w-full will-change-transform"
        >
          {itemsToRender.map(renderItem)}
        </ul>
      </div>
    </>
  )
}

interface Props {
  /** Children to be used as slides for the slider */
  children: ReactNode | ReactNode[]
  /** Function that will be executed AFTER destroying the slider. Useful for clean up stuff */
  doAfterDestroy: () => void
  /** Function that will be executed AFTER initializing  the slider */
  doAfterInit: () => void
  /** Function that will be executed AFTER slide transition has ended */
  doAfterSlide: () => void
  /** Function that will be executed BEFORE slide is happening */
  doBeforeSlide: () => void
  /** Ease mode to use on translations */
  ease: string
  /** Indicates if the slider will start with the first slide once it ends */
  infiniteLoop: boolean
  /** Determine the number of items that will be preloaded */
  itemsToPreload: number
  /** Determine the first slide to start with */
  initialSlide: number
  /** Activate navigation by keyboard */
  keyboardNavigation: boolean
  /** Number of slides to show at once */
  numOfSlides: number
  /** Change dynamically the slide number, perfect to use with dots */
  slide: number
  /** Determine if arrows should be shown */
  showArrows: boolean
  /** Determine the speed of the sliding animation */
  slideSpeed: number
}
