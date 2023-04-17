/* eslint-disable no-unused-vars */

const LINEAR_ANIMATION = 'linear'
const VALID_SWIPE_DISTANCE = 50
const TRANSITION_END = 'transitionend'
const { abs } = Math
const EVENT_OPTIONS = { passive: false }

export function translate(to: number, moveX: number, percentatge = 100) {
  const translation = to * percentatge * -1
  const x = moveX ? `calc(${translation}% - ${moveX}px)` : `${translation}%`
  return `translate3d(${x}, 0, 0)`
}

export function infiniteIndex(index: number, end: number) {
  if (index < 0) return end - 1
  else if (index >= end) return 0
  else return index
}

export function clampNumber(x: number, minValue: number, maxValue: number) {
  return Math.min(Math.max(x, minValue), maxValue)
}

function getTouchCoordinatesFromEvent(e: any) {
  return e.targetTouches ? e.targetTouches[0] : e.touches[0]
}

/**
 *
 * @param {number} duration
 * @param {string} ease
 * @param {number} index
 * @param {number} x
 * @param {number} percentatge
 */
function getTranslationCSS(
  duration: number,
  ease: string,
  index: number,
  x: number,
  percentatge: number
) {
  const easeCssText = ease !== '' ? `transition-timing-function: ${ease};` : ''
  const durationCssText = duration ? `transition-duration: ${duration}ms;` : ''
  return `${easeCssText}${durationCssText}transform: ${translate(
    index,
    x,
    percentatge
  )};`
}

function cleanContainer(container: any) {
  // remove all the elements except the last one as it seems to be old data in the HTML
  // that's specially useful for dynamic content
  while (container.childElementCount > 1) {
    container !== null && container.removeChild(container.lastChild)
  }
  // tell that the clean is done
  return true
}

interface Options {
  /** Function that will be executed AFTER slide transition has ended */
  doAfterSlide: ({ currentSlide }: { currentSlide: number }) => void
  /** Function that will be executed BEFORE slide is happening */
  doBeforeSlide: ({
    currentSlide,
    nextSlide
  }: {
    currentSlide: number
    nextSlide: number
  }) => void
  /** Ease mode to use on translations */
  ease: string
  /** Indicates if the slider will start with the first slide once it ends */
  infiniteLoop: boolean
  /** Determine the first slide to start with */
  initialSlide: number
  /** Number of slides to show at once */
  numOfSlides: number
  onNext: (value: number) => void
  onPrev: (value: number) => void
  slidesDOMEl: any
  /** Determine the speed of the sliding animation */
  slideSpeed: number
  items: number
}

export default function slidy(containerDOMEl: any, options: Options) {
  const {
    doAfterSlide,
    doBeforeSlide,
    ease,
    infiniteLoop,
    initialSlide,
    numOfSlides,
    onNext,
    onPrev,
    slidesDOMEl,
    slideSpeed
  } = options

  // @ts-ignore
  let { items } = options

  // if frameDOMEl is null, then we do nothing
  if (containerDOMEl === null) return

  // initialize some variables
  let index = initialSlide
  let isScrolling: boolean | undefined = false
  let transitionEndCallbackActivated = false

  // event handling
  let deltaX = 0
  let deltaY = 0
  let touchOffsetX = 0
  let touchOffsetY = 0

  /**
   * translates to a given position in a given time in milliseconds
   *
   * @param  {number} duration time in milliseconds for the transistion
   * @param  {string} ease easing css property
   * @param  {number} x Number of pixels to fine tuning translation
   */
  function _translate(duration: number, ease = '', x = 0) {
    const percentatge = 100 / numOfSlides
    slidesDOMEl.style.cssText = getTranslationCSS(
      duration,
      ease,
      index,
      x,
      percentatge
    )
  }

  /**
   * slide function called by prev, next & touchend
   *
   * determine nextIndex and slide to next postion
   * under restrictions of the defined options
   *
   * @param {boolean} direction 'true' for right, 'false' for left
   */
  function slide(direction: boolean) {
    const movement = direction === true ? 1 : -1

    // calculate the nextIndex according to the movement
    let nextIndex = index + 1 * movement

    /**
     * If the slider has the infiniteLoop option
     * nextIndex will start from the start when arrives to the end
     * and vice versa
     */
    if (infiniteLoop) nextIndex = infiniteIndex(nextIndex, items)

    // nextIndex should be between 0 and items minus 1
    nextIndex = clampNumber(nextIndex, 0, items - 1)

    goTo(nextIndex)
  }

  function onTransitionEnd() {
    if (transitionEndCallbackActivated === true) {
      _translate(0)
      transitionEndCallbackActivated = false
    }
  }

  function onTouchstart(e: any) {
    const coords = getTouchCoordinatesFromEvent(e)
    isScrolling = undefined
    touchOffsetX = coords.pageX
    touchOffsetY = coords.pageY
  }

  function onTouchmove(e: any) {
    // ensure swiping with one touch and not pinching
    if (e.touches.length > 1 || (e.scale && e.scale !== 1)) return

    const coords = getTouchCoordinatesFromEvent(e)
    deltaX = coords.pageX - touchOffsetX
    deltaY = coords.pageY - touchOffsetY

    if (typeof isScrolling === 'undefined') {
      isScrolling = abs(deltaX) < abs(deltaY)
      if (!isScrolling) document.ontouchmove = (e) => e.preventDefault()
      return
    }

    if (!isScrolling) {
      e.preventDefault()
      _translate(0, LINEAR_ANIMATION, deltaX * -1)
    }
  }

  function onTouchend() {
    // hack the document to block scroll
    document.ontouchmove = () => true

    if (!isScrolling) {
      /**
       * is valid if:
       * -> swipe distance is greater than the specified valid swipe distance
       * -> swipe distance is more then a third of the swipe area
       * @isValidSlide {Boolean}
       */
      const isValid = abs(deltaX) > VALID_SWIPE_DISTANCE

      /**
       * is out of bounds if:
       * -> index is 0 and deltaX is greater than 0
       * -> index is the last slide and deltaX is smaller than 0
       * @isOutOfBounds {Boolean}
       */
      const direction = deltaX < 0
      const isOutOfBounds =
        (direction === false && index === 0) ||
        (direction === true && index === items - 1)

      /**
       * If the swipe is valid and we're not out of bounds
       * -> Slide to the direction
       * otherwise: go back to the previous slide with a linear animation
       */
      isValid === true && isOutOfBounds === false
        ? slide(direction)
        : _translate(slideSpeed, LINEAR_ANIMATION)
    }

    // reset variables with the initial values
    deltaX = deltaY = touchOffsetX = touchOffsetY = 0
  }

  /**
   * public
   * setup function
   */
  function _setup() {
    slidesDOMEl.addEventListener(TRANSITION_END, onTransitionEnd)
    containerDOMEl.addEventListener('touchstart', onTouchstart, EVENT_OPTIONS)
    containerDOMEl.addEventListener('touchmove', onTouchmove, EVENT_OPTIONS)
    containerDOMEl.addEventListener('touchend', onTouchend, EVENT_OPTIONS)

    if (index !== 0) {
      _translate(0)
    }
  }

  /**
   * public
   * clean content of the slider
   */
  function clean() {
    return cleanContainer(slidesDOMEl)
  }

  /**
   * public
   * @param {number} nextIndex Index number to go to
   */
  function goTo(nextIndex: number) {
    // if the nextIndex and the current is the same, we don't need to do the slide
    if (nextIndex === index) return

    // if the nextIndex is possible according to number of items, then use it
    if (nextIndex <= items) {
      // execute the callback from the options before sliding
      doBeforeSlide({ currentSlide: index, nextSlide: nextIndex })
      // execute the internal callback
      nextIndex > index ? onNext(nextIndex) : onPrev(nextIndex)
      index = nextIndex
    }
    // translate to the next index by a defined duration and ease function
    _translate(slideSpeed, ease)

    // execute the callback from the options after sliding
    slidesDOMEl.addEventListener(TRANSITION_END, function cb(e: { currentTarget: { removeEventListener: (arg0: any, arg1: (e: any) => void) => void }; type: any }) {
      doAfterSlide({ currentSlide: index })
      e.currentTarget.removeEventListener(e.type, cb)
    })
  }

  /**
   * public
   * prev function: called on clickHandler
   */
  function prev(e: any) {
    e.preventDefault()
    e.stopPropagation()
    slide(false)
  }

  /**
   * public
   * next function: called on clickHandler
   */
  function next(e: any) {
    e.preventDefault()
    e.stopPropagation()
    slide(true)
  }

  /**
   * public
   * @param {number} newItems Number of items in the slider for dynamic content
   */
  function updateItems(newItems: number) {
    items = newItems
  }

  /**
   * public
   * destroy function: called to gracefully destroy the slidy instance
   */
  function destroy() {
    // remove all touch listeners
    containerDOMEl.removeEventListener(
      'touchstart',
      onTouchstart,
      EVENT_OPTIONS
    )
    containerDOMEl.removeEventListener('touchmove', onTouchmove, EVENT_OPTIONS)
    containerDOMEl.removeEventListener('touchend', onTouchend, EVENT_OPTIONS)
    // remove transition listeners
    slidesDOMEl.removeEventListener(TRANSITION_END, onTransitionEnd)
  }

  // trigger initial setup
  _setup()

  // expose public api
  return {
    clean,
    destroy,
    goTo,
    next,
    prev,
    slide,
    updateItems
  }
}
