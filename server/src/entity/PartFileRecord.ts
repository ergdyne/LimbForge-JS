import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import PartFile from "./PartFile"
import Record from "./Record"

// A Part leads to a series of PartRecords. When PartFiles are created for the Part, each PartFile gets
// some a PartFileRecord for each PartRecord, but the link is back to the original Record
@Entity()
export class PartFileRecord{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public value: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one Record
  @ManyToOne(type=> Record, record => record.partFileRecords)
  record: Record

  //Many to one PartFile
  @ManyToOne(type=> PartFile, partFile => partFile.partFileRecords)
  partFile: PartFile
}

export default PartFileRecord