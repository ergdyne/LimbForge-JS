import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import Measure from "./Measure"

@Entity()
export class MeasureAttribute{
  @PrimaryGeneratedColumn()
  public id: number

  @Column() 
  public attribute: string

  @Column() 
  public value: string

  @Column() 
  public type: string

  @CreateDateColumn()
  public create_at: Date

  //Many to one Measure
  @ManyToOne(type=> Measure, measure => measure.measureAttributes)
  measure: Measure
}

export default MeasureAttribute