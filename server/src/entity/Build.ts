import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import PatientBuild from './PatientBuild'

//The list of things that go in a zip file
@Entity()
export class Build{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Patient Builds
  @OneToMany(type => PatientBuild, patientBuild => patientBuild.build)
  patientBuilds: PatientBuild[]

}

export default Build