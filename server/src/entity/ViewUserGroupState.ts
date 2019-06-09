import { ViewEntity, ViewColumn } from "typeorm"

//patient's group is not expected to change, but this makes it allowable.
@ViewEntity({
  expression: `    
    select l.aid as "userId", l.gid as "groupId", og.access from 
      (select 
        "userId" as aid, 
        max(create_at) as latest, 
        "groupId" as gid
      from user_group
      group by "userId", "groupId"
      ) as l
    inner join user_group as og
    on l.aid = og."userId" and l.latest = og.create_at and l.gid = og."groupId"
  `
})
export class UserGroupState{
  @ViewColumn()
  userId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  access: string
}