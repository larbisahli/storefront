import { useMemo } from 'react'

export function usePrice({
  amount,
  currencyCode = 'USD',
  locale = 'en-US'
}: {
  amount: number
  currencyCode: string | undefined
  locale: string
}) {
  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode
      }),
    [locale, currencyCode]
  )

  return formatCurrency.format(amount)
}
