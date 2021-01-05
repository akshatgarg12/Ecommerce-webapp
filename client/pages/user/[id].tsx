import { gql, useQuery } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import ProtectedRoute from '../../src/components/protectedRoute';

const USER_QUERY = (id:string) => gql`
  {
    seller(id:${id}){
      id
      name
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

// export interface Product{
//   id:number|string,
//   price:number|string,
//   img:string,
//   __typename?:string,
// }
// export interface UserProfilePageProps{
//   id:number|string,
//   __typename?:string,
//   name:string,
//   products:Product[],
//   college:{
//     __typename?:string,
//     name:string
//   }
// }

const userProfilePage:React.FC<{id:string}> = ({id}) => {
  const {loading, error, data} = useQuery(USER_QUERY(id));
  return (
    <ProtectedRoute>
       <h1>hlo {data && data.seller.name}</h1>
    </ProtectedRoute>
  )
}


export default userProfilePage;