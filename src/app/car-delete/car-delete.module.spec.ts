import { CarDeleteModule } from './car-delete.module';

describe('CarDeleteModule', () => {
  let carDeleteModule: CarDeleteModule;

  beforeEach(() => {
    carDeleteModule = new CarDeleteModule();
  });

  it('should create an instance', () => {
    expect(carDeleteModule).toBeTruthy();
  });
});
