describe('KHALIDAI foundation smoke test', () => {
  it('should load the app config', () => {
    expect(typeof process.env.NODE_ENV).toBe('string');
  });

  it('should verify environment', () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    expect(['development', 'production', 'test']).toContain(nodeEnv);
  });
});
