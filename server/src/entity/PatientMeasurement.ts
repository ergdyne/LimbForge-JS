import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Patient from "./Patient"
import Measure from "./Measure"

@Entity()
export class PatientMeasurement{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public value: number

  @CreateDateColumn()
  public create_at: Date

  //Many to one Patient
  @ManyToOne(type=> Patient, patient => patient.patientMeasurements)
  patient: Patient

  @ManyToOne(type=> Measure, measure => measure.patientMeasurements)
  measure: Measure
}

export default PatientMeasurement