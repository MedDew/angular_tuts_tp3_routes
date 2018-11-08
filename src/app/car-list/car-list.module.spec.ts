import { CarListModule } from './car-list.module';

describe('CarListModule', () => {
  let carListModule: CarListModule;

  beforeEach(() => {
    carListModule = new CarListModule();
  });

  it('should create an instance', () => {
    expect(carListModule).toBeTruthy();
  });
});
