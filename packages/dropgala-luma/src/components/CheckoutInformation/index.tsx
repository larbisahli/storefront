import { CheckoutFormValues } from '@dropgala/types'
import Checkbox from '../ui/checkbox'
import Input from '../ui/Input1'
import Label from '../ui/label'
import SelectInput from '../ui/selectInput'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Control, UseFormRegister } from 'react-hook-form'

interface Props {
  errors: any
  control: Control<CheckoutFormValues, any>
  register: UseFormRegister<CheckoutFormValues>
}

const CheckoutInformation = ({ errors, control, register }: Props) => {
  const router = useRouter()

  const { step, previous_step } = router.query

  // In case the query is empty
  useEffect(() => {
    if (!step) {
      router.push('/checkout?step=contact_information')
    }
  }, [router, step])

  const [countries, setCountries] = useState<any>([]) // any for now

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@dropgala/utils/countries')
      setCountries(Countries)
    }
    getCountries()
  }, [])

  console.log('errors =====>', errors)

  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="py-5">
        <div className="">
          <div className="text-lg font-medium mb-4">Contact information</div>
          <div className="mb-4">
            <Input
              isRequiredLabel
              label={'Email'}
              // @ts-ignore
              {...register('email')}
              type="email"
              error={errors.email?.message!}
              variant="outline"
              className="mb-6"
            />
            <Checkbox
              {...register('subscribe')}
              label={'Email me with news and offers'}
            />
          </div>
          <div className="text-lg font-medium mb-4 mt-8">Shipping address</div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="sm:w-fit w-full">
              <Input
                isRequiredLabel
                label={'First name'}
                // @ts-ignore
                {...register('first_name')}
                variant="outline"
                className="mb-6"
              />
            </div>

            <div className="sm:w-fit w-full">
              <Input
                isRequiredLabel
                label={'Last name'}
                // @ts-ignore
                {...register('last_name')}
                error={errors.last_name?.message!}
                variant="outline"
                className="mb-6"
              />
            </div>
          </div>

          <div className="mb-6">
            <Label isRequiredLabel>Country</Label>
            <SelectInput
              name="country"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.name}
              options={countries}
            />
            {errors.country?.message! && (
              <p className="my-2 text-xs text-start text-red-500">
                {errors.country?.message!}
              </p>
            )}
          </div>

          <div className="col-span-6">
            <Input
              isRequiredLabel
              label={'Address'}
              // @ts-ignore
              {...register('address1')}
              error={errors.address1?.message!}
              variant="outline"
              className="mb-6"
            />
          </div>
          <div className="flex items-center flex-wrap">
            <div className="sm:flex-1 flex-0 mb-6 sm:mb-0 sm:w-fit w-full">
              <Input
                isRequiredLabel
                label={'City'}
                // @ts-ignore
                {...register('city')}
                error={errors.city?.message!}
                variant="outline"
              />
            </div>

            <div className="sm:flex-1 flex-0 mb-6 sm:mb-0 mx-0 sm:mx-2 sm:w-fit w-full">
              <Input
                label={'State / Province'}
                // @ts-ignore
                {...register('state')}
                error={errors.state?.message!}
                variant="outline"
              />
            </div>

            <div className="sm:flex-1 flex-0 sm:w-fit w-full">
              <Input
                label={'ZIP / Postal code'}
                // @ts-ignore
                {...register('zip_code')}
                error={errors.zip_code?.message}
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutInformation
