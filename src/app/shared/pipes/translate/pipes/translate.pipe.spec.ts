import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  const pipe = new TranslatePipe(null);

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform to be correct', () => {
    const mockTest = {
      translateService: { data: ['asd', 'dsa', 'ads'] },
      transform: pipe.transform
    };

    expect(mockTest.transform(1)).toBe('dsa');
  });
});
