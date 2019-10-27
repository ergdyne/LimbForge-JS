import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm'
import UXAttribute from './UXAttribute'
import UXRecord from './UXRecord'
import DeviceUX from './DeviceUX'

//A User interface (Table, Form) defined by a collection of attributes(Record Values) and Records
@Entity()
export class UX{
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ unique: true })
  public accessor: string

  @CreateDateColumn()
  public create_at: Date

  //UX Attributes
  @OneToMany(type => UXAttribute, uXAttribute => uXAttribute.uX)
  uXAttributes: UXAttribute[]

  //Patient Device UXs
  @OneToMany(type => UXRecord, uXRecord => uXRecord.uX)
  uXRecords: UXRecord[]

  //One ux to many deviceUXs
  @OneToMany(type => DeviceUX, deviceUX => deviceUX.ux)
  deviceUXs: DeviceUX[]

}

export default UX