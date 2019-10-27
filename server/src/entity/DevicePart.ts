import {Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column} from 'typeorm'
import Device from './Device'
import Part from './Part'

//A collection of data revolving around parting a part for a device.
@Entity()
export class DevicePart{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  @Column() 
  public order: number //-1 means exclude

  //Many to one Device
  @ManyToOne(type=> Device, device => device.deviceParts)
  device: Device

  //Many to one Part
  @ManyToOne(type=> Part, part => part.deviceParts)
  part: Part
}

export default DevicePart