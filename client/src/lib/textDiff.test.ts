import { describe, it, expect } from 'vitest';
import { computeDiff, getDiffStats } from './textDiff';

describe('textDiff logic (Case ID: CNT-CMP-001)', () => {
  it('should verify unchanged words', () => {
    const baseline = "This is a standard contract.";
    const modified = "This is a standard contract.";
    const diff = computeDiff(baseline, modified);
    
    // "This", "is", "a", "standard", "contract."
    expect(diff).toHaveLength(5);
    expect(diff.every(w => w.type === 'unchanged')).toBe(true);
  });

  it('should verify added words', () => {
    const baseline = "This is a contract.";
    const modified = "This is a standard contract.";
    const diff = computeDiff(baseline, modified);
    
    const addedWords = diff.filter(w => w.type === 'added');
    expect(addedWords).toHaveLength(1);
    expect(addedWords[0].text).toBe('standard');
  });

  it('should verify removed words', () => {
    const baseline = "This is a standard contract.";
    const modified = "This is a contract.";
    const diff = computeDiff(baseline, modified);
    
    const removedWords = diff.filter(w => w.type === 'removed');
    expect(removedWords).toHaveLength(1);
    expect(removedWords[0].text).toBe('standard');
  });

  it('should verify getDiffStats output', () => {
    const baseline = "The quick brown fox.";
    const modified = "The fast brown wolf.";
    const diff = computeDiff(baseline, modified);
    const stats = getDiffStats(diff);
    
    // baseline: "The" "quick" "brown" "fox."
    // modified: "The" "fast" "brown" "wolf."
    // "The", "brown" are unchanged (2)
    // "quick", "fox." are removed (2)
    // "fast", "wolf." are added (2)
    
    expect(stats).toEqual({
      added: 2,
      removed: 2,
      unchanged: 2
    });
  });
});
