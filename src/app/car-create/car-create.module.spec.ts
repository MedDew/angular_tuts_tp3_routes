import { CarCreateModule } from './car-create.module';

describe('CarCreateModule', () => {
  let carCreateModule: CarCreateModule;

  beforeEach(() => {
    carCreateModule = new CarCreateModule();
  });

  it('should create an instance', () => {
    expect(carCreateModule).toBeTruthy();
  });
});
