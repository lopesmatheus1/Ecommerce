import { Category } from '../../types/category.types'
import { CategoryItemContainer, CategoryName } from './category-item.styles'

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <CategoryItemContainer $backgroundImage={category.imageUrl}>
      <CategoryName>{category.displayName}</CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
