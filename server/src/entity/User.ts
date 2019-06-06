import {Column,Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  public pkUser: number

  @Column() 
  public email: string

  @CreateDateColumn()
  public create_at: Date
  
  //One user to many userGroups
  //One user to many AdminAccess
  //One user to many siteAuth
}

export default User