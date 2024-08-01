import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import AppliedJob from "./appliedjob";
@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  userId!: string;

  @Column({ type: "text", nullable: false })
  username!: string;

  @Column({ type: "text", nullable: false })
  email!: string;

  @Column({ type: "text", nullable: false })
  password!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date?: string;

  @Column({ type: "text" })
  user_role!: string;

  @OneToMany(() => AppliedJob, appliedJob => appliedJob.user)
  appliedJobs!: AppliedJob[];
}
