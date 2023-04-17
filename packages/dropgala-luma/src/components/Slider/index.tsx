/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import cn from 'clsx'
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'

import ReactCustomSlider from './Slider'

function noop() {}

const Slider = ({
  children,
  className,
  doAfterDestroy = noop,
  doAfterInit = noop,
  doAfterSlide = noop,
  doBeforeSlide = noop,
  infiniteLoop = false,
  itemsToPreload = 1,
  initialSlide = 0,
  ease = 'ease',
  lazyLoadSlider = true,
  lazyLoadConfig = {
    offset: 150
  },
  keyboardNavigation = false,
  numOfSlides = 1,
  sanitize = true,
  slide = 0,
  slideSpeed = 500,
  showArrows = true
}: Props) => {
  const [showSlider, setShowSlider] = useState(!lazyLoadSlider)
  const nodeEl = useRef(null)

  useEffect(
    function () {
      let observer: IntersectionObserver

      if (lazyLoadSlider) {
        const initLazyLoadSlider = () => {
          // if we support IntersectionObserver, let's use it
          const { offset = 0 } = lazyLoadConfig
          observer = new window.IntersectionObserver(
            ([entry], observer) => {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target)
                setShowSlider(true)
              }
            },
            {
              rootMargin: `${offset}px 0px 0px`
            }
          )
          observer.observe(nodeEl.current as unknown as Element)
        }

        if (!('IntersectionObserver' in window)) {
          // @ts-ignore
          import('intersection-observer').then(initLazyLoadSlider)
        } else {
          initLazyLoadSlider()
        }
      }

      return () => observer && observer.disconnect()
    },
    [] // eslint-disable-line
  )

  const numOfSlidesSanitized = useMemo(
    () => Math.min(numOfSlides, React.Children.count(children)),
    [children, numOfSlides]
  )

  const reactCustomSliderProps = {
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
  }

  return (
    <div
      className={cn(
        className,
        'backface-hidden min-h-[50px] relative select-none'
      )}
      ref={nodeEl}
    >
      {showSlider && (
        // @ts-ignore
        <ReactCustomSlider
          {...reactCustomSliderProps}
          numOfSlides={sanitize ? numOfSlidesSanitized : numOfSlides}
        >
          {children}
        </ReactCustomSlider>
      )}
    </div>
  )
}

interface Props {
  /** Children to be used as slides for the slider */
  children: JSX.Element[] | ReactNode | ReactNode[]
  /** Class base to create all classes for elements. Styles might break if you modify it. */
  className: string
  /** Function that will be executed AFTER destroying the slider. Useful for clean up stuff */
  doAfterDestroy: (_: any) => void
  /** Function that will be executed AFTER initializing  the slider */
  doAfterInit: (_: any) => void
  /** Function that will be executed AFTER slide transition has ended */
  doAfterSlide: (_: any) => void
  /** Function that will be executed BEFORE slide is happening */
  doBeforeSlide: (_: any) => void
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
  /** Determine if the slider will be lazy loaded using Intersection Observer */
  lazyLoadSlider: boolean
  /** Configuration for lazy loading. Only needed if lazyLoadSlider is true */
  lazyLoadConfig: {
    /** Distance which the slider will be loaded */
    offset: number
  }
  /** Number of slides to show at once */
  numOfSlides: number
  /** Determine if we want to sanitize the slides or take numberOfSlider directly */
  sanitize: boolean
  /** Change dynamically the slide number, perfect to use with dots */
  slide: number
  /** Determine if arrows should be shown */
  showArrows: boolean
  /** Determine the speed of the sliding animation */
  slideSpeed: number
}

export default Slider
