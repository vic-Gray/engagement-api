import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { Role } from 'src/Roles/roles.auth';


export class CreateUserDto {
          

     @IsPhoneNumber()
          phone:string;


          @IsEmail()
          email:string;
    
         @IsString()
          password:string;
        
         @IsString()
          firstName:string;

          @IsString()
          lastName:string;
          
         @IsString()
          userName:string;

          @IsString()
          role:string
    
}
