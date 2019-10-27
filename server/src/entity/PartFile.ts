import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm'
import Part from "./Part"
import PartFileRecord from './PartFileRecord'

//How a record is defined
@Entity()
export class PartFile{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public file: string

  @Column() //For disconnecting a partFile...
  public isActive: boolean

  @CreateDateColumn()
  public create_at: Date

  //Many to one Part
  @ManyToOne(type=> Part, part => part.partFiles)
  part: Part

  @OneToMany(type => PartFileRecord, partFileRecord => partFileRecord.partFile)
  partFileRecords: PartFileRecord[]
}

export default PartFile