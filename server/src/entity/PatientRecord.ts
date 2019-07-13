import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Patient from "./Patient"
import Record from "./Record"

//Records the are linked directly to a patient (not through a particular build).
//The Name of the patient is always the same regardless of the device being built (stored here).
//A Patient may have a left side device and a right side device with different measurements (not stored here).
@Entity()
export class PatientRecord{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public value: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one Record
  @ManyToOne(type=> Record, record => record.patientRecords)
  record: Record

  //Many to one Patient
  @ManyToOne(type=> Patient, patient => patient.patientRecords)
  patient: Patient
}

export default PatientRecord