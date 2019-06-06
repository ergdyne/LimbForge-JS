import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class PatientAttribute{
  @PrimaryGeneratedColumn()
  public pkPatientAttribute: number

  @Column() 
  public attribute: string

  @Column() 
  public value: string

  @Column() 
  public type: string

  @CreateDateColumn()
  public create_at: Date
  //Many to one Patient
}

export default PatientAttribute