import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import PatientBuild from "./PatientBuild"
import Record from "./Record"

//Records the are linked directly to a patient (not through a particular build).
//The Name of the patient is always the same regardless of the device being built (stored here).
//A Patient may have a left side device and a right side device with different measurements (not stored here).
@Entity()
export class PatientBuildRecord{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public value: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one Record
  @ManyToOne(type=> Record, record => record.patientBuildRecords)
  record: Record

  //Many to one Patient
  @ManyToOne(type=> PatientBuild, patientBuild => patientBuild.patientBuildRecords)
  patientBuild: PatientBuild
}

export default PatientBuildRecord