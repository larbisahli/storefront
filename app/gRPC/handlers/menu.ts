import { setMenu } from '@dropgala/store'
import { CategoryType } from '@dropgala/types/category.type'
import { CategoryService } from '@gRPC/services'

const categoryService = new CategoryService()

export const fetchStoreMenu = async (alias: string) => {
  const { menu = [], error: menuError } = await categoryService.getMenu(alias)

  if (menuError) {
    throw { menuError }
  }

  return setMenu({ menu: menu as unknown as CategoryType[] })
}

export const fetchStoreCategory = async (alias: string, slug: string) => {
  const { category = null, error: categoryError } =
    await categoryService.getCategory(alias, slug)

  if (categoryError) {
    throw { categoryError }
  }

  return category
}
