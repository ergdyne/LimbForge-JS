import {Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm'
import Patient from './Patient'
import Device from './Device'
import PatientDeviceRecord from './PatientDeviceRecord'

//A collection of data revolving around deviceing a device for a patient.
@Entity()
export class PatientDevice{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Many to one Patient
  @ManyToOne(type=> Patient, patient => patient.patientDevices,{onDelete:'CASCADE'})
  patient: Patient

  //Many to one Device
  @ManyToOne(type=> Device, device => device.patientDevices)
  device: Device

  //One ties to many PatientDeviceRecords (data collected to device the device)
  @OneToMany(type => PatientDeviceRecord, patientDeviceRecord => patientDeviceRecord.patientDevice)
  patientDeviceRecords: PatientDeviceRecord[]
}

export default PatientDevice