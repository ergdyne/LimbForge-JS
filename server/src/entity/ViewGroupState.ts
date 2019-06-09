import { ViewEntity, ViewColumn } from "typeorm"



//Provides a View of the most recent attributes grouped by groupId and attribute
@ViewEntity({
  expression:`
    select l.gid as "groupId", oa.attribute, oa.value, oa.type from 
      (
        select 
          "groupId" as gid, 
          max(create_at) as latest, 
          attribute
        from group_attribute
        group by "groupId", attribute
      ) as l
    inner join group_attribute as oa
    on l.gid = oa."groupId" and l.latest = oa.create_at and l.attribute = oa.attribute
  `
})
export class GroupState{
  @ViewColumn()
  groupId: number

  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string  
}