import { Engage } from 'src/engage/entities/engage.entity';
import { Role } from 'src/Roles/roles.auth';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;


  @Column({
    type:"enum",
    enum:Role,
    default:Role.USER
  })
    

  @Column({ default: 'user' }) 
  role: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  profilePicture: string;


  @OneToMany(() => Engage,(engage) =>  engage.user, {cascade:true} ) engage:Engage[]
}
