import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import PatientDevice from "./PatientDevice"
import Record from "./Record"

//Records the are linked directly to a patient (not through a particular device).
//The Name of the patient is always the same regardless of the device being built (stored here).
//A Patient may have a left side device and a right side device with different measurements (not stored here).
@Entity()
export class PatientDeviceRecord{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public value: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one Record
  @ManyToOne(type=> Record, record => record.patientDeviceRecords)
  record: Record

  //Many to one Patient
  @ManyToOne(type=> PatientDevice, patientDevice => patientDevice.patientDeviceRecords,{ onDelete: 'CASCADE' })
  patientDevice: PatientDevice
}

export default PatientDeviceRecord