import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Group from "./Group"

@Entity()
export class GroupAttribute{
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

  //Many to one group
  @ManyToOne(type=> Group, group => group.groupAttributes)
  group: Group
}

export default GroupAttribute