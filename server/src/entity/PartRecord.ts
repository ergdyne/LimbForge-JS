import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Part from "./Part"
import Record from "./Record"

@Entity()
export class PartRecord{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public order: number //-1 means exclude

  @CreateDateColumn()
  public create_at: Date

  //Many to one Record
  @ManyToOne(type=> Record, record => record.partRecords)
  record: Record

  //Many to one Part
  @ManyToOne(type=> Part, part => part.partRecords)
  part: Part
}

export default PartRecord