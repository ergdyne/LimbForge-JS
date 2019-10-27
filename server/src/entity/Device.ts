import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import DeviceAttribute from './DeviceAttribute'
import PatientDevice from './PatientDevice'
import DeviceUX from './DeviceUX'
import DevicePart from './DevicePart'

//The list of things that go in a zip file
@Entity()
export class Device{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Device Attributes
  @OneToMany(type => DeviceAttribute, deviceAttribute => deviceAttribute.device)
  deviceAttributes: DeviceAttribute[]

  //Patient Devices
  @OneToMany(type => PatientDevice, patientDevice => patientDevice.device)
  patientDevices: PatientDevice[]

  @OneToMany(type => DevicePart, devicePart => devicePart.device)
  deviceParts: DevicePart[]

  //One device to many deviceUXs
  @OneToMany(type => DeviceUX, deviceUX => deviceUX.device)
  deviceUXs: DeviceUX[]
  

}

export default Device