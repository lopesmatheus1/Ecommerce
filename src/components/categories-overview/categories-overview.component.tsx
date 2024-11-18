//lib
import { useContext } from 'react'

//utilities
import { CategoryContext } from '../../contexts/category.context'

//style
import { Container } from './categories-overview.styles'

//components
import CategoryOverview from '../category-overview/category-overview.tsx'

const CategoriesOverview = () => {
  const { categories } = useContext(CategoryContext)

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview category={category} key={category.id} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
