import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class UserGroup{
  @PrimaryGeneratedColumn()
  public pkUserGroup: number

  @Column() 
  public access: string

  @CreateDateColumn()
  public create_at: Date
  //many to one user
  //many to one group
}

export default UserGroup