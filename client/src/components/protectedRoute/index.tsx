import { useRouter } from 'next/router'
import { useContext } from 'react';
import { UserContext } from '../../context/auth';

const ProtectedRoute = ({children}) => {
  const router = useRouter();
  const {user} = useContext(UserContext);
  // if not auth then return to /login
  if(!user) {router.replace('/login'); return null;}
  // if auth
  return (
    <div>
      {children}
    </div>
  );
}
 
export default ProtectedRoute;