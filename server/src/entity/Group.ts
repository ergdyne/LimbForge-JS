import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import UserGroup from './UserGroup'
import PatientGroup from './PatientGroup'
import GroupAttribute from './GroupAttribute'

@Entity()
export class Group{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //One group to many groupAttributes
  @OneToMany(type => GroupAttribute, groupAttribute => groupAttribute.group)
  groupAttributes: GroupAttribute[]

  //One group to many userGroups
  @OneToMany(type => UserGroup, userGroup => userGroup.group)
  userGroups: UserGroup[]

  //One group to many patientGroups
  @OneToMany(type => PatientGroup, patientGroup => patientGroup .group)
  patientGroups: PatientGroup[]
}

export default Group