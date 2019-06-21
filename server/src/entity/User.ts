import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import UserGroup from './UserGroup'
import AdminAccess from './AdminAccess'
import SiteAuth from './SiteAuth'

@Entity()
export class User {
  //By using id as the public key for all items, the foreign key will automatically be objectId
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ unique: true })
  public email: string

  @CreateDateColumn()
  public create_at: Date

  //One user to many userGroups
  @OneToMany(type => UserGroup, userGroup => userGroup.user)
  userGroups: UserGroup[]

  //One user to many AdminAccess
  @OneToMany(type => AdminAccess, adminAccess => adminAccess.user)
  adminAccesses: AdminAccess[]

  //One user to many SiteAuth
  @OneToMany(type => SiteAuth, siteAuths => siteAuths.user)
  siteAuths: SiteAuth[]
}

export default User