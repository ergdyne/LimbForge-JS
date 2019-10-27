import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Part from "./Part"

//How a record is defined
@Entity()
export class PartAttribute{
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

  //Many to one Part
  @ManyToOne(type=> Part, part => part.partAttributes)
  part: Part
}

export default PartAttribute