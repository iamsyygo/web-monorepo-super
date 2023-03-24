import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SystemUpdatLog } from './index.entity';
@Entity()
export class LogContent {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键',
  })
  id?: number;

  @ApiProperty({ description: '创建时间' })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '创建时间',
  })
  create_time: string;

  // @ApiProperty({ description: '父表id' })
  // @ManyToOne(() => SystemUpdatLog, (systemUpdatLog) => systemUpdatLog.list)
  // @Column({
  //   type: 'int',
  //   comment: '父表id',
  // })
  // p_id: any;

  @ApiProperty({ description: '创建用户' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '创建用户',
  })
  create_user: string;

  @ApiProperty({ description: '更新时间' })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '更新时间',
  })
  update_time: string;

  @ApiProperty({ description: '更新用户' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '更新用户',
  })
  update_user: string;

  @ApiProperty({ description: '删除时间' })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '删除时间',
  })
  delete_time: string;

  // 创建内容，映射到子表 'c_system_update_log'
  @ApiProperty({ description: '创建内容' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '创建内容',
  })
  content: string;
}
