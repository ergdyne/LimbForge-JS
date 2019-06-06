import {Entity, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from 'typeorm'
import PatientGroup from './PatientGroup'
import PatientAttribute from './PatientAttribute'

@Entity()
export class Patient{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //One Patient to many PatientAttributes
  @OneToMany(type => PatientAttribute, patientAttribute => patientAttribute.patient)
  patientAttributes: PatientAttribute[]

  //One Patient to many patientGroups, but typically only care about 1.
  @OneToMany(type => PatientGroup, patientGroup => patientGroup.patient)
  patientGroups: PatientGroup[]

  //Should be deletable -> plus recursive
}

export default Patient