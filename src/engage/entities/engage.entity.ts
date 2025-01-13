import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";





@Entity()
export class Engage {
   @PrimaryGeneratedColumn()
    id:number;


    @Column()
      category:string;


      @Column()
       link:string;


       @Column()
         description:string;


         @Column({nullable:true})
         engagementPhoto:string

        
       @ManyToOne(() => User, (user) => user.engage, {eager:true, onDelete:"CASCADE", onUpdate:"CASCADE"}) user:User;

}
