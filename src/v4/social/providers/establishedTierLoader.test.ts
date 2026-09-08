import { createEstablishedTierLoader } from './establishedTierLoader';

const tiers = { '1': 'gold', '2': 'diamond' } as const;

describe('createEstablishedTierLoader', () => {
  it('asks once for every member that asks in the same tick', async () => {
    const resolve = jest.fn().mockResolvedValue(tiers);
    const loader = createEstablishedTierLoader(resolve);

    const levels = await Promise.all([loader.load('1'), loader.load('2'), loader.load('1')]);

    expect(resolve).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledWith(['1', '2']);
    expect(levels).toEqual(['gold', 'diamond', 'gold']);
  });

  it('keeps what it learned, so a later avatar asks nothing', async () => {
    const resolve = jest.fn().mockResolvedValue(tiers);
    const loader = createEstablishedTierLoader(resolve);

    await loader.load('1');
    expect(loader.peek('1')).toBe('gold');

    expect(await loader.load('1')).toBe('gold');
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  it('reads a member left out of the answer as none, and keeps that too', async () => {
    const resolve = jest.fn().mockResolvedValue({});
    const loader = createEstablishedTierLoader(resolve);

    expect(await loader.load('7')).toBe('none');
    expect(await loader.load('7')).toBe('none');
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  it('starts a new request for a member that asks in a later tick', async () => {
    const resolve = jest.fn().mockResolvedValue(tiers);
    const loader = createEstablishedTierLoader(resolve);

    await loader.load('1');
    await loader.load('2');

    expect(resolve).toHaveBeenNthCalledWith(1, ['1']);
    expect(resolve).toHaveBeenNthCalledWith(2, ['2']);
  });

  it('gives none when the lookup fails, and asks again next time', async () => {
    const resolve = jest.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(tiers);
    const loader = createEstablishedTierLoader(resolve);

    expect(await loader.load('1')).toBe('none');
    expect(loader.peek('1')).toBeUndefined();

    expect(await loader.load('1')).toBe('gold');
    expect(resolve).toHaveBeenCalledTimes(2);
  });

  it('knows nothing before it is asked', () => {
    const loader = createEstablishedTierLoader(jest.fn());

    expect(loader.peek('1')).toBeUndefined();
  });
});
