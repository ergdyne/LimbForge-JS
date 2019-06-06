import {Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Patient from './Patient'
import Group from './Group'

@Entity()
export class PatientGroup{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Many to one Patient
  @ManyToOne(type=> Patient, patient => patient.patientGroups)
  patient: Patient

  //Many to one Group
  @ManyToOne(type=> Group, group => group.patientGroups)
  group: Group
}

export default PatientGroup