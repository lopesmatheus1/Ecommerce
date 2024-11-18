import SyncLoader from 'react-spinners/SyncLoader'
import { LoadingContainer } from './loading.styles'

const Loading = () => {
  return (
    <LoadingContainer>
      <SyncLoader size={30} />
    </LoadingContainer>
  )
}

export default Loading
