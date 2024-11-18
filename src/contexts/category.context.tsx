//lib
import { createContext, FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

//utilities
import { Category } from '../types/category.types'
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converters/firebase.converter'

interface CategoryContextProviderProps {
  children: ReactNode
}

//Interface
interface ICategoryContext {
  categories: Category[]
  fetchCategories: () => Promise<void>
  isLoading: boolean
}

//Default
export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  fetchCategories: () => Promise.resolve(),
})

const CategoryContextProvider: FunctionComponent<
  CategoryContextProviderProps
> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const getCategoriesFromFireStore: Category[] = []
      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshot.forEach((doc) => {
        getCategoriesFromFireStore.push(doc.data())
      })

      setCategories(getCategoriesFromFireStore)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
