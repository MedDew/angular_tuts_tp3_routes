import { CarDetailModule } from './car-detail.module';

describe('CarDetailModule', () => {
  let carDetailModule: CarDetailModule;

  beforeEach(() => {
    carDetailModule = new CarDetailModule();
  });

  it('should create an instance', () => {
    expect(carDetailModule).toBeTruthy();
  });
});
