import { GetStaticProps } from 'next';
import React from 'react';

export const getStaticProps:GetStaticProps = async (context) =>{
  return {
    props:{
      id:1,
      name:"akshat"
    }
  }
}

const Home:React.FC<any> = ({id, name}) => {
  return <h1>Hello {name}, user id : {id}</h1> 
}
export default Home;