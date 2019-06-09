import { ViewEntity, ViewColumn } from "typeorm"

//Provides a View of the most recent attributes grouped by patientId and attribute
@ViewEntity({
  expression: `
    select l.pid as "patientId", oa.attribute, oa.value, oa.type from 
      (
        select 
          "patientId" as pid, 
          max(create_at) as latest, 
          attribute
        from patient_attribute
        group by "patientId", attribute
      ) as l
    inner join patient_attribute as oa
    on l.pid = oa."patientId" and l.latest = oa.create_at and l.attribute = oa.attribute
  `
})
export class PatientState {
  @ViewColumn()
  patientId: number

  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}



// {
//   expression: (connection: Connection) => connection.createQueryBuilder()
//     .select("patient_state.patientId", "patientId")
//     .addSelect("patient_state.attribute", "attribute")
//     .addSelect("patient_state.value", "value")
//     .addSelect("patient_state.type", "type")
//     .from("patient_state")
// }