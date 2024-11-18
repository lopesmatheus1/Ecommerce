//UTILITIES
import { Category } from '../../types/category.types'

//COMPONENTS
import ProductItem from '../product-item/product-item'

//STYLES
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer,
} from './category-overview'


interface CategoryOverviewProps {
  category: Category
}

const CategoryOverview = ({ category }: CategoryOverviewProps) => {
  return (
    <>
      <CategoryContainer>
        <CategoryTitle>{category.displayName}</CategoryTitle>

        <ProductsContainer>
          {category.products.slice(0, 4).map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </ProductsContainer>
      </CategoryContainer>
    </>
  )
}

export default CategoryOverview
