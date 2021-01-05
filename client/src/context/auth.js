import {createContext, useState} from 'react'

export const UserContext = createContext(null)

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(true);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;