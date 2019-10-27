import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,ManyToOne} from 'typeorm'
import Device from "./Device"
import UX from "./UX"

@Entity()
export class DeviceUX{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public access: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one device
  @ManyToOne(type=> Device, device => device.deviceUXs)
  device: Device
  
  //Many to one ux
  @ManyToOne(type=> UX, ux => ux.deviceUXs)
  ux: UX
}

export default DeviceUX