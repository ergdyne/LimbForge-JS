import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Patient from "./Patient"

@Entity()
export class PatientAttribute{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public attribute: string

  @Column() 
  public value: string

  @Column() 
  public type: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one Patient
  @ManyToOne(type=> Patient, patient => patient.patientAttributes)
  patient: Patient
}

export default PatientAttribute