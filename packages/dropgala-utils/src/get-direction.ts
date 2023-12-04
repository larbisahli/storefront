export default function getDirection(locale: string | undefined) {
  if (!locale) return 'ltr'
  const rtlLanguages = [
    'ar',
    'ar-ae',
    'ar-bh',
    'ar-kw',
    'ar-ma',
    'ar-om',
    'ar-qa',
    'ar-sa',
    'he-il'
  ]
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
}
