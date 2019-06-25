import { ViewEntity, ViewColumn } from "typeorm"

//patient's group is not expected to change, but this makes it allowable.
@ViewEntity({
  expression: `
    select l.pid as "patientId", og."groupId", "groupName" from 
      (select 
        "patientId" as pid, 
        max(create_at) as latest
      from patient_group
      group by "patientId"
      ) as l
    inner join patient_group as og
    on l.pid = og."patientId" and l.latest = og.create_at
    inner join
    (
      select l.gid as "groupId", oa.value as "groupName" from 
      (
        select 
          "groupId" as gid, 
          max(create_at) as latest, 
          attribute
        from group_attribute
        where attribute = 'name'
        group by "groupId", attribute
      ) as l
    inner join group_attribute as oa
    on l.gid = oa."groupId" and l.latest = oa.create_at and l.attribute = oa.attribute
    ) as n
    on n."groupId" = og."groupId"
  `
})
export class ViewPatientGroup{
  @ViewColumn()
  patientId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  groupName: string
}