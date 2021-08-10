import { MakePositivePipe } from './make-positive.pipe';

describe('MakePositivePipe', () => {
  it('create an instance', () => {
    const pipe = new MakePositivePipe();
    expect(pipe).toBeTruthy();
  });
});
