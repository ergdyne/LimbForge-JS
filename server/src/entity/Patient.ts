import {Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Patient{
  @PrimaryGeneratedColumn()
  public pkPatient: number

  @CreateDateColumn()
  public create_at: Date

  //One Patient to many PatientAttributes
  //One Patient to many patientGroups
  //Should be deletable -> plus recursive
}

export default Patient