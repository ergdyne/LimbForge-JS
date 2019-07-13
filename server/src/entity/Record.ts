import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import RecordAttribute from './RecordAttribute'
import PatientRecord from './PatientRecord'
import PatientBuildRecord from './PatientBuildRecord'
import UXRecord from './UXRecord'

//Record is a type of data point
@Entity()
export class Record{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Record Attributes
  @OneToMany(type => RecordAttribute, recordAttribute => recordAttribute.record)
  recordAttributes: RecordAttribute[]

  //Patient Build Records
  @OneToMany(type => PatientBuildRecord, patientBuildRecord => patientBuildRecord.record)
  patientBuildRecords: PatientBuildRecord[]

  //Patient Records
  @OneToMany(type => PatientRecord, patientRecord => patientRecord.record)
  patientRecords: PatientRecord[]

  //UXRecords
  @OneToMany(type => UXRecord, uXRecord => uxRecord.record)
  uXRecords: UXRecord[]

}

export default Record