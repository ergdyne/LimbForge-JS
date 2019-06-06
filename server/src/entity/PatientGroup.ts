import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class PatientGroup{
  @PrimaryGeneratedColumn()
  public pkPatientGroup: number

  @CreateDateColumn()
  public create_at: Date
  //many to one Patient
  //many to one group
}

export default PatientGroup