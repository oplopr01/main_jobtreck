import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import  User  from "./user";
import  Job  from "./job";

@Entity()
export default class Appliedjob {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column()
  jobId!: string;

  @Column()
  status!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt!: Date;

  @ManyToOne(() => User, user => user.appliedJobs)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Job, job => job.appliedJobs)
  @JoinColumn({ name: 'jobId' })
  job!: Job;
}
