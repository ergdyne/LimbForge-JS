import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class GroupAttribute{
  @PrimaryGeneratedColumn()
  public pkGroupAttribute: number

  @Column() 
  public attribute: string

  @Column() 
  public value: string

  @Column() 
  public type: string

  @CreateDateColumn()
  public create_at: Date
  //Many to one group
}

export default GroupAttribute