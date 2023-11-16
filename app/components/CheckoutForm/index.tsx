import { LoadingSpinner, ChevronLeft } from '@assets'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useErrorLogger } from '@hooks/useErrorLogger';
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import CheckoutInformation from '@components/CheckoutInformation'
import { checkoutValidationSchema } from './checkout-validation-schema'
import { CheckoutFormValues, CheckoutSteps } from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Button from './button'
import CheckoutShipping from '@components/CheckoutShipping'
import CheckoutPayment from '@components/CheckoutPayment'

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  address1: '',
  address2: '',
  country: null,
  subscribe: false,
  city: '',
  state: '',
  zip_code: '',
  order_shipping: null
}

type IProps = {
  initialValues?: any
  isLoading: boolean
}

export default function CheckoutForm({ initialValues, isLoading }: IProps) {
  const router = useRouter()

  const { step, previous_step } = router.query

  const [error, setEError] = useState()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setError
  } = useForm<CheckoutFormValues>({
    defaultValues: initialValues
      ? {
          ...initialValues
        }
      : (defaultValues as unknown),
    resolver: yupResolver(checkoutValidationSchema)
  })

  //   useErrorLogger(error);

  const onSubmit = async (values: CheckoutFormValues) => {
    // Create an order

    const name = values.first_name
      ? `${values.first_name} ${values.last_name}`
      : values.last_name

    const variables = {
      // Make sure to change this to your payment completion page
      // return_url: `http://localhost:80/${ROUTES.COMPLETE_ORDER}`,
      shipping: {
        address: {
          state: values.state,
          city: values.city,
          country: values.country.iso2,
          postal_code: values.zip_code,
          line1: values.address1,
          line2: values.address2
        },
        name
      },
      payment_method_data: {
        billing_details: {
          email: values.email,
          name
        }
      }
    }

    console.log('onSubmit values :>> ', variables)
  }

  const validationToNextStep = async () => {
    const result = await trigger()

    if (result) {
      router.push({
        pathname: '/checkout',
        query: {
          step:
            step === CheckoutSteps.CONTACT_INFORMATION
              ? CheckoutSteps.SHIPPING_METHOD
              : CheckoutSteps.PAYMENT_METHOD,
          ...(step === CheckoutSteps.CONTACT_INFORMATION
            ? { previous_step: CheckoutSteps.CONTACT_INFORMATION }
            : step === CheckoutSteps.SHIPPING_METHOD
            ? { previous_step: CheckoutSteps.SHIPPING_METHOD }
            : {})
        }
      })
      return
    }

    const fields = Object.keys(errors)
    if (
      step === CheckoutSteps.SHIPPING_METHOD &&
      !isEmpty(fields) &&
      !fields.includes('order_shipping')
    ) {
      router.push({
        pathname: '/checkout',
        query: {
          step: CheckoutSteps.CONTACT_INFORMATION
        }
      })
    }
  }

  const payValidation = async () => {
    // Check form validation
    const fields = Object.keys(errors)
    if (!isEmpty(fields) && !fields.includes('order_shipping')) {
      router.push({
        pathname: '/checkout',
        query: {
          step: CheckoutSteps.CONTACT_INFORMATION
        }
      })
    } else if (fields.includes('order_shipping')) {
      router.push({
        pathname: '/checkout',
        query: {
          step: CheckoutSteps.SHIPPING_METHOD
        }
      })
    }
  }

  return (
    <div className="px-5 py-3 mt-10 sm:mt-0 flex justify-center h-full items-start">
      <div className="max-w-[550px]">
        <div className="mt-5 md:mt-0">
          {/* <CheckoutBreadcrumb /> */}

          <form
            className="relative min-h-[400px] sm:min-w-[500px] min-w-[300px] xs:min-w-[400px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* LOADER */}
            {isLoading && (
              <div className="flex items-center justify-center absolute inset-0 z-10">
                <LoadingSpinner stroke="#2b2b2b" size="medium" />
              </div>
            )}
            <div
              className={cn('hidden', {
                '!block': step === CheckoutSteps.CONTACT_INFORMATION
              })}
            >
              <CheckoutInformation
                errors={errors}
                control={control}
                register={register}
              />
            </div>
            <div
              className={cn('hidden', {
                '!block': step === CheckoutSteps.SHIPPING_METHOD
              })}
            >
              <CheckoutShipping register={register} />
            </div>
            <div
              className={cn('hidden', {
                '!block': step === CheckoutSteps.PAYMENT_METHOD
              })}
            >
              <CheckoutPayment register={register} />
            </div>
            <div
              className={cn('my-5 flex items-center', {
                'justify-between': !!previous_step,
                'justify-end': !previous_step
              })}
            >
              {!!previous_step && (
                <Link
                  href={{
                    pathname: '/checkout',
                    query: {
                      step: previous_step,
                      ...(previous_step === CheckoutSteps.SHIPPING_METHOD
                        ? { previous_step: CheckoutSteps.CONTACT_INFORMATION }
                        : {})
                    }
                  }}
                >
                  <div className="text-skin-red flex items-center">
                    <div className="mr-2">
                      <ChevronLeft />
                    </div>
                    <div>
                      Return to{' '}
                      {previous_step === CheckoutSteps.CONTACT_INFORMATION
                        ? 'information'
                        : previous_step === CheckoutSteps.SHIPPING_METHOD
                        ? 'shipping'
                        : ''}
                    </div>
                  </div>
                </Link>
              )}
              {step === CheckoutSteps.PAYMENT_METHOD ? (
                <Button
                  type="submit"
                  className="bg-black font-medium"
                  loading={false}
                  disabled={false}
                  onClick={payValidation}
                >
                  Pay now
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-black  font-medium place-content-end"
                  loading={false}
                  disabled={false}
                  onClick={validationToNextStep}
                >
                  Continue to{' '}
                  {step === CheckoutSteps.CONTACT_INFORMATION
                    ? ' shipping'
                    : step === CheckoutSteps.SHIPPING_METHOD
                    ? ' payment'
                    : ''}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
