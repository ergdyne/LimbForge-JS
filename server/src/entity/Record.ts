import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import RecordAttribute from './RecordAttribute'
import PatientRecord from './PatientRecord'
import PartRecord from './PartRecord'
import PartFileRecord from './PartFileRecord'
import PatientDeviceRecord from './PatientDeviceRecord'
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

  //Patient Device Records
  @OneToMany(type => PatientDeviceRecord, patientDeviceRecord => patientDeviceRecord.record)
  patientDeviceRecords: PatientDeviceRecord[]

  //Patient Records
  @OneToMany(type => PatientRecord, patientRecord => patientRecord.record)
  patientRecords: PatientRecord[]

  @OneToMany(type => PartRecord, partRecord => partRecord.record)
  partRecords: PartRecord[]

  @OneToMany(type => PartFileRecord, partFileRecord => partFileRecord.record)
  partFileRecords: PartFileRecord[]

  //UXRecords
  @OneToMany(type => UXRecord, uXRecord => uXRecord.record)
  uXRecords: UXRecord[]

}

export default Record