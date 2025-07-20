import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';

@Entity()
export class user_table{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable:false,
        unique:true
    })
    name:string

    @Column({
        nullable:false
    })
    password:string
}