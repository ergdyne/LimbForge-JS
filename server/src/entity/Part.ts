import {Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm'
import PartAttribute from './PartAttribute'
import PartRecord from './PartRecord'
import DevicePart from './DevicePart'
import PartFile from './PartFile'

//The list of things that go in a zip file
@Entity()
export class Part{
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public create_at: Date

  //Part Attributes
  @OneToMany(type => PartAttribute, partAttribute => partAttribute.part)
  partAttributes: PartAttribute[]

  @OneToMany(type => PartRecord, partRecord => partRecord.part)
  partRecords: PartRecord[]

  @OneToMany(type => PartFile, partFile => partFile.part)
  partFiles: PartFile[]

  @OneToMany(type => DevicePart, devicePart => devicePart.part)
  deviceParts: DevicePart[]

}

export default Part