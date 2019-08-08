import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import UX from "./UX"

//Which records define the attributes of a UX (name, accessor, version...)
@Entity()
export class UXAttribute{
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

  //Many to one UX
  @ManyToOne(type=> UX, uX => uX.uXAttributes)
  uX: UX
}

export default UXAttribute