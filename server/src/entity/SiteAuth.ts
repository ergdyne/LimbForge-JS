import {Column,Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import User from './User'

@Entity()
export class SiteAuth{
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public hash: string //may also be oauthID

  @CreateDateColumn()
  public create_at: Date
  
  //Many siteAuth to one user
  @ManyToOne(type=> User, user => user.siteAuths)
  user: User
}

export default SiteAuth