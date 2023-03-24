import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LogContent } from './log.content';
@Entity()
export class SystemUpdatLog {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid', {
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
  // 子表 c_system_update_log 列表内容，根据父表id查询
  // @ApiProperty({ description: '创建内容' })
  // @OneToMany(() => LogContent, (logContent) => logContent.p_id)
  // @Column({
  //   type: 'varchar',
  //   length: 255,
  //   comment: '创建内容',
  // })
  // list: LogContent[];
}
