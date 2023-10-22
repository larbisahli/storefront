//https://nextjs.org/docs/pages/building-your-application/routing/internationalization

import { useState, useEffect, useContext, useRef } from 'react'

const usePrevious = (value: unknown, ignore: unknown) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = ignore ? ref.current : value
  }, [value, ignore])
  return ref.current
}

export function warn(...args: any[]) {
  if (console && console.warn) {
    if (typeof args[0] === 'string') args[0] = `react-i18next:: ${args[0]}`
    console.warn(...args)
  }
}

export function getDisplayName(Component: {
  displayName: any
  name: any
  length: number
}) {
  return (
    Component.displayName ||
    Component.name ||
    (typeof Component === 'string' && Component.length > 0
      ? Component
      : 'Unknown')
  )
}

// should work with I18NEXT >= v22.5.0
export function loadLanguages(
  i18n: { options: { ns: any[] } },
  lng: any,
  ns: any[],
  cb: any
) {
  // eslint-disable-next-line no-param-reassign
  if (typeof ns === 'string') ns = [ns]
  ns.forEach((n: any) => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n)
  })
  // i18n.loadLanguages(lng, loadedClb(i18n, cb));
}

// export function useTranslation(ns, props = {}) {
//   // binding t function to namespace (acts also as rerender trigger)
//   function getT() {
//     return i18n.getFixedT(
//       props.lng || null,
//       i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0],
//       keyPrefix,
//     );
//   }
//   const [t, setT] = useState(getT);

//   const previousJoinedNS = usePrevious(joinedNS);

//   const isMounted = useRef(true);
//   useEffect(() => {
//     const { bindI18n, bindI18nStore } = i18nOptions;
//     isMounted.current = true;

//     // if not ready and not using suspense load the namespaces
//     // in side effect and do not call resetT if unmounted
//     if (!ready && !useSuspense) {
//       if (props.lng) {
//         loadLanguages(i18n, props.lng, namespaces, () => {
//           if (isMounted.current) setT(getT);
//         });
//       } else {
//         loadNamespaces(i18n, namespaces, () => {
//           if (isMounted.current) setT(getT);
//         });
//       }
//     }

//     if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
//       setT(getT);
//     }

//     function boundReset() {
//       if (isMounted.current) setT(getT);
//     }

//     // bind events to trigger change, like languageChanged
//     if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
//     if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);

//     // unbinding on unmount
//     return () => {
//       isMounted.current = false;
//       if (bindI18n && i18n) bindI18n.split(' ').forEach((e) => i18n.off(e, boundReset));
//       if (bindI18nStore && i18n)
//         bindI18nStore.split(' ').forEach((e) => i18n.store.off(e, boundReset));
//     };
//   }, [i18n, joinedNS]); // re-run effect whenever list of namespaces changes

//   // t is correctly initialized by useState hook. We only need to update it after i18n
//   // instance was replaced (for example in the provider).
//   const isInitial = useRef(true);
//   useEffect(() => {
//     if (isMounted.current && !isInitial.current) {
//       setT(getT);
//     }
//     isInitial.current = false;
//   }, [i18n, keyPrefix]); // re-run when i18n instance or keyPrefix were replaced

//   const ret = [t, i18n, ready];
//   ret.t = t;
//   ret.i18n = i18n;
//   ret.ready = ready;

//   // return hook stuff if ready
//   if (ready) return ret;

//   // not yet loaded namespaces -> load them -> and return if useSuspense option set false
//   if (!ready && !useSuspense) return ret;

//   // not yet loaded namespaces -> load them -> and trigger suspense
//   throw new Promise((resolve) => {
//     if (props.lng) {
//       loadLanguages(i18n, props.lng, namespaces, () => resolve());
//     } else {
//       loadNamespaces(i18n, namespaces, () => resolve());
//     }
//   });
// }

// ------------------------------

// /**
//  * One line expression like `const { I18NEXT_DEFAULT_CONFIG_PATH: DEFAULT_CONFIG_PATH = './next-i18next.config.js' } = process.env;`
//  * is breaking the build, so keep it like this.
//  *
//  * @see https://github.com/i18next/next-i18next/pull/2084#issuecomment-1420511358
//  */
// if (process.env.I18NEXT_DEFAULT_CONFIG_PATH) {
//   DEFAULT_CONFIG_PATH = process.env.I18NEXT_DEFAULT_CONFIG_PATH
// }

// type ArrayElementOrSelf<T> = T extends ReadonlyArray<infer U> ? U[] : T[]

// export const serverSideTranslations = async (
//   initialLocale: string,
//   namespacesRequired:
//     | ArrayElementOrSelf<Namespace>
//     | string
//     | string[]
//     | undefined = undefined,
//   configOverride: UserConfig | null = null,
//   extraLocales: string[] | false = false
// ): Promise<SSRConfig> => {
//   if (typeof initialLocale !== 'string') {
//     throw new Error(
//       'Initial locale argument was not passed into serverSideTranslations'
//     )
//   }

//   let userConfig = configOverride
//   const configPath = path.resolve(DEFAULT_CONFIG_PATH)

//   if (!userConfig && fs.existsSync(configPath)) {
//     userConfig = await import(configPath)
//   }

//   if (userConfig === null) {
//     throw new Error(
//       `next-i18next was unable to find a user config at ${configPath}`
//     )
//   }

//   const config = createConfig({
//     ...userConfig,
//     lng: initialLocale,
//   })

//   const {
//     localeExtension,
//     localePath,
//     fallbackLng,
//     reloadOnPrerender,
//   } = config

//   if (reloadOnPrerender) {
//     await globalI18n?.reloadResources()
//   }

//   const { i18n, initPromise } = createClient({
//     ...config,
//     lng: initialLocale,
//   })

//   await initPromise

//   const hasCustomBackend = userConfig?.use?.some(
//     (b: Module) => b.type === 'backend'
//   )
//   if (hasCustomBackend && namespacesRequired) {
//     await i18n.loadNamespaces(Array.isArray(namespacesRequired) ? (namespacesRequired as string[]) : (namespacesRequired as string))
//   }

//   const initialI18nStore: Record<string, any> = {
//     [initialLocale]: {},
//   }

//   getFallbackForLng(initialLocale, fallbackLng ?? false)
//     .concat(extraLocales || [])
//     .forEach((lng: string) => {
//       initialI18nStore[lng] = {}
//     })

//   if (!Array.isArray(namespacesRequired)) {
//     if (typeof localePath === 'function') {
//       throw new Error(
//         'Must provide namespacesRequired to serverSideTranslations when using a function as localePath'
//       )
//     }

//     const getLocaleNamespaces = (path: string) =>
//       fs.existsSync(path)
//         ? fs
//             .readdirSync(path)
//             .map(file => file.replace(`.${localeExtension}`, ''))
//         : []

//     const namespacesByLocale = Object.keys(initialI18nStore)
//       .map(locale =>
//         getLocaleNamespaces(
//           path.resolve(process.cwd(), `${localePath}/${locale}`)
//         )
//       )
//       .flat()

//     namespacesRequired = unique(namespacesByLocale)
//   }

//   namespacesRequired.forEach(ns => {
//     for (const locale in initialI18nStore) {
//       initialI18nStore[locale][ns] =
//         (i18n.services.resourceStore.data[locale] || {})[ns] || {}
//     }
//   })

//   return {
//     _nextI18Next: {
//       initialI18nStore,
//       initialLocale,
//       ns: namespacesRequired,
//       userConfig: config.serializeConfig ? userConfig : null,
//     },
//   }
// }

// const props = {
//   pageProps: {
//     _nextI18Next: {
//       initialLocale: 'en-US',
//       userConfig: {
//         i18n: {
//           defaultLocale: 'en',
//           locales: ['en', 'fr'],
//         },
//       },
//     },
//   } as SSRConfig,
//   router: {
//     locale: 'en',
//   },
// } as any
