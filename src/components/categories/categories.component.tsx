import { useContext, useEffect } from 'react'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import './categories.styles.ts'
import CategoryItem from '../category-item/category-item.component.tsx'
import { CategoryContext } from '../../contexts/category.context.tsx'
import Loading from '../loading/loading.component.tsx'

const Categories = () => {
  const { categories, fetchCategories, isLoading } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      <CategoriesContent>
        {isLoading && <Loading />}
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
