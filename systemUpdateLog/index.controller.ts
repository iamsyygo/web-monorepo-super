import { SystemUpdatLog } from '@/entities/SystemUpdatLog';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { SystemUpdatLog } from './entities/index.entity';
import { SystemUpdateLogService } from './index.service';
// import { CreateSimpleDto } from './dto/create-systemUpdateLog.dto';
// import { SystemUpdateLog } from './entities/systemUpdateLog.entity';
// import { UpdateSimpleDto } from './dto/update-systemUpdateLog.dto';

@Controller('systemUpdateLog')
export class SystemUpdateLogController {
  constructor(private readonly systemUpdateLogService: SystemUpdateLogService) {}

  @Post()
  addSimple(@Body() body: any) {
    return this.systemUpdateLogService.addSimple(body);
  }

  @Get()
  findAll(@Query() query: Partial<SystemUpdatLog>) {
    return this.systemUpdateLogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemUpdateLogService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSimpleDto: UpdateSimpleDto) {
  //   return this.simpleService.update(+id, updateSimpleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemUpdateLogService.remove(+id);
  }
}
