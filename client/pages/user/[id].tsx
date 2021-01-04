import { useQuery, gql } from '@apollo/client';

const SELLER_INFO = gql`
  {
    seller(id:3){
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

const userProfilePage:React.FC<any> = () => {
  const { loading, error, data } = useQuery(SELLER_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return <h1>{data.seller.name}</h1>
}


export default userProfilePage;