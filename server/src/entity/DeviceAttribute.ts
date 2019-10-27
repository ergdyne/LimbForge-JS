import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Device from "./Device"

//How a record is defined
@Entity()
export class DeviceAttribute{
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

  //Many to one Device
  @ManyToOne(type=> Device, device => device.deviceAttributes)
  device: Device
}

export default DeviceAttribute