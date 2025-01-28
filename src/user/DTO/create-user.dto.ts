import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @PrimaryGeneratedColumn()
    id: number;
  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}