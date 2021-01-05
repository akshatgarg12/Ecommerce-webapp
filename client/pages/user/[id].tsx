import { useQuery, gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import ProtectedRoute from '../../src/components/protectedRoute';

export const getStaticProps : GetStaticProps = async (context) => {
  return {
    props:{
      id:context.params.id
    },
  }
}

export const getStaticPaths:GetStaticPaths = async() => {
  return {
    paths:[],
    fallback:true
  }
}

const SELLER_INFO = (id:string) => gql`
  {
    seller(id:${id}){
      id
      name
      email
      products{
        id
        price
        img
      }
      college{
        name
      }
    }
    
  }
`;

const userProfilePage:React.FC<{id:string}> = ({id}) => {
  const { loading, error, data } = useQuery(SELLER_INFO(id));
  if (loading) return <p>Loading...</p>;
  // removed cause on every fallback it was invoked/
  // if (error){
  //   console.log(error);
  //   return <p>Error : {error.message}</p>;
  // } 
  return (
    <ProtectedRoute>
     <h1>{data?.seller?.name}</h1>
    </ProtectedRoute>
  )
}


export default userProfilePage;