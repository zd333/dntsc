import { Test, TestingModule } from '@nestjs/testing';
import { TenantsController } from './tenants.controller';

describe('Tenants Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TenantsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TenantsController = module.get<TenantsController>(TenantsController);
    expect(controller).toBeDefined();
  });
});
