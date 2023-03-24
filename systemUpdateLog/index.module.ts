import { Module } from '@nestjs/common';
import { SystemUpdateLogService } from './index.service';
import { SystemUpdateLogController } from './index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUpdatLog } from '@/entities/SystemUpdatLog';
import { LogContent } from './entities/log.content';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUpdatLog, LogContent])],
  controllers: [SystemUpdateLogController],
  providers: [SystemUpdateLogService],
})
export class SystemUpdateLogModule {}
