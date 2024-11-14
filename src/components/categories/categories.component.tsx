import { useEffect, useState } from 'react'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import './categories.styles.ts'
import { collection, getDocs } from 'firebase/firestore'
import { Category } from '../../types/category.types'
import { db } from '../../config/firebase.config'
import CategoryItem from '../category-item/category-item.component.tsx'
import { categoryConverter } from '../../converters/firebase.converter.ts'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFireStore: Category[] = []
      const querySnapshopt = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      querySnapshopt.forEach((doc: any) => {
        categoriesFromFireStore.push(doc.data())
      })
      setCategories(categoriesFromFireStore)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      <CategoriesContent>
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
