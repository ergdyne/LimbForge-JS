import { Request, Response } from "express"
import { FullUserGroup } from "../entity/ViewFullUserGroup"


export const meow = (req: Request, res: Response, userData: { id: number, email: string, viewGroups: FullUserGroup[], siteAccess: string }) => {
  console.log('again ', req.session)
  req.session.ur = userData
  req.session.save(() => {
    console.log('and again', req.session)
    return res.status(200).send(userData)
  })
}