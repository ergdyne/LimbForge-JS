import { ViewEntity, ViewColumn } from "typeorm"

//patient's group is not expected to change, but this makes it allowable.
@ViewEntity({
  expression: `
    select l.aid as "userId", oa."isAdmin" from 
      (select 
        "userId" as aid, 
        max(create_at) as latest
      from admin_access
      group by "userId"
      ) as l
    inner join admin_access as oa
    on l.aid = oa."userId" and l.latest = oa.create_at    
  `
})
export class ViewAdminAccess{
  @ViewColumn()
  userId: number

  @ViewColumn()
  isAdmin: boolean
}