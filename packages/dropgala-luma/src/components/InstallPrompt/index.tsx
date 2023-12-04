import { memo, useEffect, useState } from 'react'
import BrowserDatabase from '@dropgala/utils/BrowserDatabase'
import { StoreProps, selectConfig } from '@dropgala/store'
import { standaloneMode } from '@dropgala/utils/isMobile'
import InstallPromptIOS from './InstallPromptIOS'
import InstallPromptAndroid from './InstallPromptAndroid'

declare global {
  interface Window {
    prompt_event?: BeforeInstallPromptEvent
  }
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed'
      platform: string
    }>
    prompt(): Promise<void>
  }
}

interface Props extends StoreProps {}

const InstallPrompt = ({ useAppSelector, useAppDispatch }: Props) => {
  const { device, language } = useAppSelector(selectConfig)

  const [isBannerClosed, setIsBannerClosed] = useState(false)
  const [hasInstallPromptEvent, setHasInstallPromptEvent] = useState(false)

  useEffect(() => {
    listenForInstallPrompt()
    setIsBannerClosed(!!BrowserDatabase.getItem('postpone_installation'))
  }, [])

  const handleAppInstall = () => {
    if (!window.prompt_event) {
      return
    }
    // Show the modal add to home screen dialog
    window.prompt_event.prompt()
    // Wait for the user to respond to the prompt
    window.prompt_event.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        setIsBannerClosed(true)
      }
      // Clear the saved prompt since it can't be used again
      window.prompt_event = undefined
      setHasInstallPromptEvent(false)
    })
  }

  const handleBannerClose = () => {
    setIsBannerClosed(true)
    const THREE_DAYS_IN_SECONDS = 259200

    BrowserDatabase.setItem(
      true,
      'postpone_installation',
      THREE_DAYS_IN_SECONDS
    )
  }

  const listenForInstallPrompt = () => {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault()
      window['prompt_event'] = Object.assign(event)
      setHasInstallPromptEvent(true)
    })
  }

  /**
   * Currently BeforeInstallPromptEvent is supported only on
   * - Android webview
   * - Chrome for Android
   * - Samsung Internet
   * But iOS has own "Add to Home Screen button" on Safari share menu
   */
  const hasSupport = () => {
    const { isAndroid, isIos, isSafari } = device
    const isStandaloneMode = standaloneMode()
    console.log({ isStandaloneMode })
    return (
      ((isAndroid && hasInstallPromptEvent) || (isIos && isSafari)) &&
      !isStandaloneMode &&
      !isBannerClosed
    )
  }

  const renderPrompt = () => {
    if (device.isIos) {
      return (
        <InstallPromptIOS
          language={language}
          handleBannerClose={handleBannerClose}
        />
      )
    }

    if (device.isAndroid) {
      return (
        <InstallPromptAndroid
          language={language}
          handleAppInstall={handleAppInstall}
          handleBannerClose={handleBannerClose}
        />
      )
    }

    return null
  }

  if (!hasSupport()) {
    return null
  }

  return <div>{renderPrompt()}</div>
}

export default memo(InstallPrompt)
