import { ViewEntity, ViewColumn} from "typeorm"

//Results in an entry for each userID, groupId, and attribute, which must be merged into a single group-access object.
@ViewEntity({
  expression: `
      select l.parentId as "patientId", ot."recordId", ot."value", ras.accessor,rts."type" from 
        (
          select 
            "patientId" as parentId, 
            max(create_at) as latest, 
            "recordId"
          from patient_record
          group by "patientId", "recordId"
        ) as l
      inner join patient_record as ot
      on l.parentId = ot."patientId" and l.latest = ot.create_at and l."recordId" = ot."recordId"  
      inner join
      (select l.parentId as "recordId", ot.value as accessor from 
        (
          select 
            "recordId" as parentId, 
            max(create_at) as latest, 
            attribute
          from record_attribute
          where attribute = 'accessor'
          group by "recordId", attribute
        ) as l
      inner join record_attribute as ot
      on l.parentId = ot."recordId" and l.latest = ot.create_at and l.attribute = ot.attribute
      ) as ras
      on ot."recordId" = ras."recordId"
      inner join
      (select l.parentId as "recordId", ot.value as "type" from 
        (
          select 
            "recordId" as parentId, 
            max(create_at) as latest, 
            attribute
          from record_attribute
          where attribute = 'type'
          group by "recordId", attribute
        ) as l
      inner join record_attribute as ot
      on l.parentId = ot."recordId" and l.latest = ot.create_at and l.attribute = ot.attribute
      ) as rts
      on ot."recordId" = rts."recordId"
  `
})
export class PatientRecordState{
  @ViewColumn()
  patientId: number

  @ViewColumn()
  recordId: number

  @ViewColumn()
  accessor: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}

   