import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import UX from "./UX"
import Record from "./Record"

@Entity()
export class UXRecord{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public order: number //-1 means exclude

  @CreateDateColumn()
  public create_at: Date

  //Many to one Record
  @ManyToOne(type=> Record, record => record.uXRecords)
  record: Record

  //Many to one UX
  @ManyToOne(type=> UX, uX => uX.uXRecords)
  uX: UX
}

export default UXRecord