import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 
@Entity()
export default class Job{
  @PrimaryGeneratedColumn('uuid')
  jobId!: string;
 
  @Column({ type: 'uuid' })
  userId!: string;
 
  @Column({ type: 'text', nullable: false })
  jobTitle!: string;
 
  @Column({ type: 'text', nullable: false })
  description!: string;
 
  @Column({ type: 'text', nullable: false })
  location!: string;
 
  @Column({ type: 'integer', nullable: false })
  salary!: number;
 
 
  @Column({ type: 'timestamp' })
  dateOfPost!: Date;
 
 
  @Column({ type: 'timestamp' })
  lastDate!: Date;
 
  @Column({ type: 'text', nullable: false })
  experience!: string;
 
  @Column({ type: 'text', nullable: false })
  category!: string;
}
 