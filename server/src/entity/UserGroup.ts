import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,ManyToOne} from 'typeorm'
import User from "./User"
import Group from "./Group"

@Entity()
export class UserGroup{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public access: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one user
  @ManyToOne(type=> User, user => user.userGroups)
  user: User
  
  //Many to one group
  @ManyToOne(type=> Group, group => group.userGroups)
  group: Group
}

export default UserGroup