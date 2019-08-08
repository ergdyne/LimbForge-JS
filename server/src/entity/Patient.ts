import {Entity, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from 'typeorm'
import PatientGroup from './PatientGroup'
import PatientRecord from './PatientRecord'
import PatientDevice from './PatientDevice'

@Entity()
export class Patient{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //One Patient to many PatientRecords
  @OneToMany(type => PatientRecord, patientRecord => patientRecord.patient)
  patientRecords: PatientRecord[]

  //One Patient to many Devices
  @OneToMany(type => PatientDevice, patientDevice => patientDevice.patient)
  patientDevices: PatientDevice[]

  //One Patient to many patientGroups, but typically only care about 1.
  @OneToMany(type => PatientGroup, patientGroup => patientGroup.patient)
  patientGroups: PatientGroup[]

  //Should be deletable -> plus recursive
}

export default Patient