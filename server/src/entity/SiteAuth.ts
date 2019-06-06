import {Column,Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class SiteAuth{
  @PrimaryGeneratedColumn()
  public pkSiteAuth: number

  @Column()
  public hash: string

  @CreateDateColumn()
  public create_at: Date
  
  //Many siteAuth to one user
}

export default SiteAuth