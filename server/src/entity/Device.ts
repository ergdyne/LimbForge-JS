import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import PatientDevice from './PatientDevice'

//The list of things that go in a zip file
@Entity()
export class Device{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Patient Devices
  @OneToMany(type => PatientDevice, patientDevice => patientDevice.device)
  patientDevices: PatientDevice[]

}

export default Device