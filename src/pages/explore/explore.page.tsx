import { FunctionComponent } from 'react'

//components
import CategoriesOverview from '../../components/categories-overview/categories-overview.component'
import Header from '../../components/header/header'

const ExplorePage: FunctionComponent = () => {
  return (
    <>
      <Header />
      <CategoriesOverview/>
    </>
  )
}

export default ExplorePage
