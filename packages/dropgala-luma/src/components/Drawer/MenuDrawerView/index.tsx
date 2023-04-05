import { MENU } from '../../../data/menu'
import MenuItem from './MenuItem'
import SearchSection from './SearchSection'

const MenuDrawerView: React.FC = () => {
  return (
    <div className="pb-20">
      <SearchSection />
      <div className="bg-gray-300 h-[1px] w-full my-4"></div>
      <div className="h-full">
        <div className="h-full">
          {MENU?.map((category) => (
            <MenuItem key={category.id} category={category} level={1} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuDrawerView
