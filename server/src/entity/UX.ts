import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import UXAttribute from './UXAttribute'
import UXRecord from './UXRecord'

//A User interface (Table, Form) defined by a collection of attributes(Record Values) and Records
@Entity()
export class UX{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //UX Attributes
  @OneToMany(type => UXAttribute, uXAttribute => uXAttribute.uX)
  uXAttributes: UXAttribute[]

  //Patient Build UXs
  @OneToMany(type => UXRecord, uXRecord => uXRecord.uX)
  uXRecords: UXRecord[]

}

export default UX