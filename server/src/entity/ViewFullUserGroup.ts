import { ViewEntity, ViewColumn} from "typeorm"

//Results in an entry for each userID, groupId, and attribute, which must be merged into a single group-access object.
@ViewEntity({
  expression: `
    select og."userId","email",og."groupId",og."access",ga."attribute",ga."value",ga."type" from
      (select 
        "userId" as aid, 
        max(create_at) as latest, 
        "groupId" as gid
      from user_group
      group by "userId", "groupId"
      ) as l
    inner join user_group as og
    on l.aid = og."userId" and l.latest = og.create_at and l.gid = og."groupId"
    inner join (select l.gid as "groupId", oa.attribute, oa.value, oa.type from 
        (
          select 
            "groupId" as gid, 
            max(create_at) as latest, 
            attribute
          from group_attribute
          group by "groupId", attribute
        ) as l
      inner join group_attribute as oa
      on l.gid = oa."groupId" and l.latest = oa.create_at and l.attribute = oa.attribute) as ga
      on ga."groupId" = og."groupId"
    inner join "user" as u on u.id = og."userId" 
  `
})
export class FullUserGroup{
  @ViewColumn()
  userId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  email:string

  @ViewColumn()
  access: string

  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}
