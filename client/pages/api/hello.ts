// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"

export default (req:NextApiRequest, res:NextApiResponse) => {
  res.statusCode = 200
  res.json({ id : 4, name: 'John Doe', email:'John doe @ email.com' })
}
