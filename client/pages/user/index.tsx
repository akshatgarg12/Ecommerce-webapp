import { GetStaticProps } from "next";
import {SELF_URL} from '../../src/constants/dev';
import axios from 'axios';

export interface User{
  id:number|string,
  name:string,
  img?:string,
  rating?:number|string,
  college:{
    name:string
  }
}
export interface UsersProps {
  users: User[]
}
export const getStaticProps:GetStaticProps = async(context) =>{
  const userData = await axios.get(`${SELF_URL}/api/user`);
  return {
    props:{
      users:userData.data
    }
  }
}
const Users: React.FC<UsersProps> = ({users}) => {
    console.log(users);
    return (
      <div>
        <h1>All users of a College</h1>
        {/* show all the users cards of the college, with sorted from top rating. */}
      </div>
    );
  
}
 
export default Users;