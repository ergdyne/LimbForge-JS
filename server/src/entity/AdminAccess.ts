import {Column,Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class AdminAccess{
  @PrimaryGeneratedColumn()
  public pkAdminAccess: number

  @Column() 
  public isAdmin: boolean

  @CreateDateColumn()
  public create_at: Date
  
  //Many AdminAccess to one User
}

export default AdminAccess