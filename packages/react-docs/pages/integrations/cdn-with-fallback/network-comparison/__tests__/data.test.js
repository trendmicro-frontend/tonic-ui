import { configurations, variants } from '../data';

const allConfigs = [...configurations, ...variants];

describe('CDN comparison data', () => {
  it('compares only configurations that were measured and mount', () => {
    configurations.forEach((config) => {
      expect(config.status).toBe('measured');
      expect(config.renders).toBe(true);
    });
  });

  it('records a failure reason for every configuration that does not mount', () => {
    const failing = allConfigs.filter((config) => !config.renders);

    expect(failing.length).toBeGreaterThan(0);
    failing.forEach((config) => {
      expect(config.status).toBe('measured');
      expect(typeof config.failure).toBe('string');
      expect(config.failure.length).toBeGreaterThan(0);
    });
  });

  it('never labels a configuration that mounts as a failure case', () => {
    allConfigs.forEach((config) => {
      const claimsFailure = /^Failure case/.test(config.note);

      expect({ id: config.id, claimsFailure, renders: config.renders }).toEqual({
        id: config.id,
        claimsFailure: !config.renders,
        renders: config.renders,
      });
    });
  });

  it('attaches numeric sizes to every measured configuration', () => {
    allConfigs.filter((config) => config.status === 'measured').forEach((config) => {
      ['requests', 'transferredKiB', 'decodedKiB'].forEach((metric) => {
        expect(typeof config[metric]).toBe('number');
        expect(config[metric]).toBeGreaterThan(0);
      });
    });
  });
});
