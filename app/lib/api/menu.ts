import { setMenu } from '@dropgala/store'
import { CategoryType } from '@dropgala/types/category.type'

const categoryService = null

export const fetchStoreMenu = async (
  alias: string,
  localeId: number,
  storeId?: string
) => {
  const { menu = [], error: menuError } = await categoryService.getStoreMenu(
    alias,
    localeId,
    storeId
  )
  if (menuError) throw { menuError }
  return setMenu({ menu: menu as unknown as CategoryType[] })
}
