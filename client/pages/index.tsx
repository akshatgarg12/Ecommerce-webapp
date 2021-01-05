import { GetStaticProps } from 'next';
import React, { useContext, useState } from 'react';
import {SERVER_URL, SELF_URL} from '../src/constants/dev';
import { Button} from 'semantic-ui-react'
import { UserContext } from '../src/context/auth';
export const getStaticProps:GetStaticProps = async (context) =>{
  const serverData = await (await fetch(SERVER_URL)).json();
  return {
    props:{
      person:[...serverData],
    }
  }
}

const Home:React.FC<any> = ({person}) => {
  const {user,setUser} = useContext(UserContext);

  return <div>
    <Button onClick={(e)=> {
      e.preventDefault()
      setUser(!user)
      console.log(user);
    }}>Click Here</Button>
    {/* {person.map((per, id) => {
      return <h1 key={id}>{per.name}</h1>
    })} */}
  </div>
}
export default Home;