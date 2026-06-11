describe('getIsPassiveListenerSupported', () => {
  let getIsPassiveListenerSupported;

  beforeEach(async () => {
    await jest.isolateModulesAsync(async () => {
      ({ getIsPassiveListenerSupported } = await import('../utils'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true when the browser accesses options.passive on addEventListener', () => {
    const result = getIsPassiveListenerSupported();

    expect(result).toBe(true);
  });

  it('should return false when window.addEventListener throws', () => {
    jest.spyOn(window, 'addEventListener').mockImplementation(() => {
      throw new Error('not supported');
    });

    const result = getIsPassiveListenerSupported();

    expect(result).toBe(false);
  });

  it('should pass an options object with a passive getter to addEventListener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    getIsPassiveListenerSupported();

    const optionsArg = addEventListenerSpy.mock.calls[0][2];
    expect(optionsArg).toBeDefined();
    const descriptor = Object.getOwnPropertyDescriptor(optionsArg, 'passive');
    expect(descriptor).toBeDefined();
    expect(typeof descriptor.get).toBe('function');
  });

  it('should call removeEventListener for cleanup after a successful detection', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    getIsPassiveListenerSupported();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('test', expect.any(Function));
  });

  it('should cache the result and call window.addEventListener only once across multiple calls', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    getIsPassiveListenerSupported();
    getIsPassiveListenerSupported();
    getIsPassiveListenerSupported();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it('should return the same value across multiple calls', () => {
    const first = getIsPassiveListenerSupported();
    const second = getIsPassiveListenerSupported();
    const third = getIsPassiveListenerSupported();

    expect(first).toBe(second);
    expect(second).toBe(third);
  });

  it('should cache the false result when addEventListener throws', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener').mockImplementation(() => {
      throw new Error('not supported');
    });

    const first = getIsPassiveListenerSupported();
    const second = getIsPassiveListenerSupported();

    expect(first).toBe(false);
    expect(second).toBe(false);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it('should detect support per window and not reuse another window\'s cached result', () => {
    const supportingWindow = {
      addEventListener: jest.fn((type, listener, options) => {
        // Access the `passive` getter to simulate a browser that supports it
        void options?.passive;
      }),
      removeEventListener: jest.fn(),
    };
    const throwingWindow = {
      addEventListener: jest.fn(() => {
        throw new Error('not supported');
      }),
      removeEventListener: jest.fn(),
    };

    expect(getIsPassiveListenerSupported(supportingWindow)).toBe(true);
    // The second window must be probed independently, not served the first
    // window's cached `true`.
    expect(getIsPassiveListenerSupported(throwingWindow)).toBe(false);
    expect(throwingWindow.addEventListener).toHaveBeenCalledTimes(1);
  });
});
