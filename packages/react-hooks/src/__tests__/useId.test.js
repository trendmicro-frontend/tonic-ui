describe('useId', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should be defined', () => {
    const useId = require('../useId').default;
    expect(useId).toBeDefined();
    expect(typeof useId).toBe('function');
  });

  it('should use React.useId when available', () => {
    const mockReactUseId = jest.fn();
    jest.doMock('react', () => ({
      ...jest.requireActual('react'),
      useId: mockReactUseId,
    }));

    const useId = require('../useId').default;
    expect(useId).toBe(mockReactUseId);
    expect(typeof useId).toBe('function');
  });

  it('should use useSSRSafeId fallback when React.useId is not available', () => {
    jest.doMock('react', () => ({
      ...jest.requireActual('react'),
      useId: undefined,
    }));

    const useId = require('../useId').default;
    const useSSRSafeId = require('../deprecated/useSSRSafeId').default;
    expect(useId).toBe(useSSRSafeId);
    expect(typeof useId).toBe('function');
  });
});
