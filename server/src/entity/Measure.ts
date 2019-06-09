import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import PatientMeasurement from './PatientMeasurement'
import MeasureAttribute from './MeasureAttribute'

@Entity()
export class Measure{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  @OneToMany(type => MeasureAttribute, measureAttribute => measureAttribute.measure)
  measureAttributes: MeasureAttribute[]

  //One Patient to many Measurements
  @OneToMany(type => PatientMeasurement, patientMeasurement => patientMeasurement.measure)
  patientMeasurements: PatientMeasurement[]
}

export default Measure