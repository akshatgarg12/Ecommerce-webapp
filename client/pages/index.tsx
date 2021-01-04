import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import {SERVER_URL, SELF_URL} from '../src/constants/dev';
import { Button} from 'semantic-ui-react'
export const getStaticProps:GetStaticProps = async (context) =>{
  const serverData = await (await fetch(SERVER_URL)).json();
  const lambdaData = await (await fetch(SELF_URL + '/api/hello')).json();
  return {
    props:{
      person:[...serverData, lambdaData],
    }
  }
}

const Home:React.FC<any> = ({person}) => {
  return <div>
    <Button>Click Here</Button>
    {person.map((per, id) => {
      return <h1 key={id}>{per.name}</h1>
    })}
  </div>
}
export default Home;