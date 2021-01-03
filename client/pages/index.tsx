import { GetStaticProps } from 'next';
import React from 'react';
import {SERVER_URL, SELF_URL} from '../src/constants/dev';

export const getStaticProps:GetStaticProps = async (context) =>{
  const serverData = await (await fetch(SERVER_URL)).json();
  const lambdaData = await (await fetch(SELF_URL + '/api/hello')).json();
  console.log(serverData);
  return {
    props:{
      person:[...serverData, lambdaData],
    }
  }
}

const Home:React.FC<any> = ({person}) => {
  return <div>
    {person.map((per, id) => {
      return <h1>{per.name}</h1>
    })}
  </div>
}
export default Home;