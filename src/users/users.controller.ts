import { 
  Controller, 
  Post, 
  Body, 
  ValidationPipe, 
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { FindUserQueryDto } from 'src/shared/dto/find-users-query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard())
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id): Promise<ReturnUserDto>{
    const user = await this.usersService.findUserById(id);
    return{
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ){
    if (user.role != UserRole.ADMIN && user.id.toString() != id){
      throw new ForbiddenException(
        'Você não tem autorização para aceessar este recurso'
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string){
    await this.usersService.deleteUser(id);
    return{
      message: 'Usuário removido com sucesso',
    };
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUserQueryDto){
    const found = await this.usersService.findUsers(query);
    return{
      found,
      message: 'Usuários encontrados',
    }
  }
}