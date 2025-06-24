import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  birthdate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 100 })
  balance: number;
}
