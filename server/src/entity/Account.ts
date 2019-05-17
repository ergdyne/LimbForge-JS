import {Column,Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Account{
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public email: string

  @Column()
  public password: string

  @CreateDateColumn()
	public create_at: Date;
}

export default Account