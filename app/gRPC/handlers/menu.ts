import { setMenu } from '@dropgala/store'
import { CategoryType } from '@dropgala/types/category.type'
import { CategoryService } from '@gRPC/services'

const categoryService = new CategoryService()

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

export const fetchStoreCategory = async (
  slug: string,
  alias: string,
  storeLanguageId: number,
  storeId?: string
) => {
  const { category = null, error: categoryError } =
    await categoryService.getStoreCategory(
      slug,
      alias,
      storeLanguageId,
      storeId
    )
  if (categoryError) throw { categoryError }
  return category
}
