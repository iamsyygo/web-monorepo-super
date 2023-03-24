import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSimpleDto } from './dto/create-simple.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUpdatLog } from '@/entities/SystemUpdatLog';
// import { UpdateSimpleDto } from './dto/update-simple.dto';

@Injectable()
export class SystemUpdateLogService {
  constructor(@InjectRepository(SystemUpdatLog) private readonly userRepositroy: Repository<SystemUpdatLog>) {}
  // private readonly userRepositroy: Repository<Simple>;
  create(createSimpleDto: CreateSimpleDto) {
    return 'This action adds a new simple';
  }

  async findAll(query: Partial<SystemUpdatLog>) {
    // const result = await this.userRepositroy
    // 查询 SystemUpdatLog 实体并且将其关联的 LogContent 实体也查询出来
    // const result = await this.userRepositroy.createQueryBuilder('systemUpdatLog').leftJoinAndSelect('systemUpdatLog.list', 'logContent').getMany();

    return 'result';
  }

  findOne(id: number) {
    return `This action returns a #${id} simple`;
  }

  // update(id: number, updateSimpleDto: UpdateSimpleDto) {
  //   return `This action updates a #${id} simple`;
  // }

  remove(id: number) {
    return `This action removes a #${id} simple`;
  }

  /*
   * 新增
   * @param {CreateSimpleDto} createSimpleDto
   * @returns {Promise<Simple>}
   */
  addSimple(body: SystemUpdatLog): Promise<SystemUpdatLog> {
    console.log(this.userRepositroy);

    return this.userRepositroy.save(body);
  }
}
