import { Reflector } from '@nestjs/core';


import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



@Injectable()
export class jwtGuards extends AuthGuard('jwt'){

    handleRequest(err, user:any) {
    
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        if (user.user.role != 'ADMIN') {
          console.log(user);
          throw new BadRequestException(`${user.user.name} you are not an admin`);
        }
        return user;
      }

}