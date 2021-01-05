import { NextApiRequest, NextApiResponse } from "next"
import client from '../../src/config/graphql';
import { gql } from "@apollo/client";

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const USERS_QUERY = gql`
  {
    sellers{
      id
      name
      college{
        name
      }
    }
  }`;
  try{
    const userData = await client.query({query:USERS_QUERY});
    res.json(userData.data);
  }catch(e){
    console.log("error occured in the api",e.message)
    res.status(500);
  }
}
