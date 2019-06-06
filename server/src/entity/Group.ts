import {Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Group{
  @PrimaryGeneratedColumn()
  public pkGroup: number

  @CreateDateColumn()
  public create_at: Date

  //One group to many groupAttributes
  //One group to many userGroups
  //One group to many patientGroups
}

export default Group