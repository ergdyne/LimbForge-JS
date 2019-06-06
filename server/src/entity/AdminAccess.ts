import {Column,Entity, PrimaryGeneratedColumn, CreateDateColumn,ManyToOne} from 'typeorm'
import User from "./User"

@Entity()
export class AdminAccess{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public isAdmin: boolean

  @CreateDateColumn()
  public create_at: Date
  
  //Many AdminAccess to one User
  @ManyToOne(type=> User, user => user.adminAccesses)
  user: User
}

export default AdminAccess