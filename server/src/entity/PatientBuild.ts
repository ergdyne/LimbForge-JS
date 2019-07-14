import {Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm'
import Patient from './Patient'
import Build from './Build'
import PatientBuildRecord from './PatientBuildRecord'

//A collection of data revolving around building a device for a patient.
@Entity()
export class PatientBuild{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Many to one Patient
  @ManyToOne(type=> Patient, patient => patient.patientBuilds)
  patient: Patient

  //Many to one Build
  @ManyToOne(type=> Build, build => build.patientBuilds)
  build: Build

  //One ties to many PatientBuildRecords (data collected to build the build)
  @OneToMany(type => PatientBuildRecord, patientBuildRecord => patientBuildRecord.patientBuild)
  patientBuildRecords: PatientBuildRecord[]
}

export default PatientBuild