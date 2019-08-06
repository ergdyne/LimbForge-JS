import {Entity, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from 'typeorm'
import PatientGroup from './PatientGroup'
import PatientRecord from './PatientRecord'
import PatientBuild from './PatientBuild'

@Entity()
export class Patient{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //One Patient to many PatientRecords
  @OneToMany(type => PatientRecord, patientRecord => patientRecord.patient,{ onDelete: 'CASCADE' })
  patientRecords: PatientRecord[]

  //One Patient to many Builds
  @OneToMany(type => PatientBuild, patientBuild => patientBuild.patient,{ onDelete: 'CASCADE' })
  patientBuilds: PatientBuild[]

  //One Patient to many patientGroups, but typically only care about 1.
  @OneToMany(type => PatientGroup, patientGroup => patientGroup.patient,{ onDelete: 'CASCADE' })
  patientGroups: PatientGroup[]

  //Should be deletable -> plus recursive
}

export default Patient