export const testData = {
  contract: {
    name: 'MSA - Acme Corp',
    counterparty: 'Acme Corp',
  },
  clause: {
    number: '5.1',
    topic: 'Limitation of Liability',
    issue: 'Counterparty requests uncapped liability',
    baselineText: 'Each party\'s total liability is limited to fees paid in the twelve months before the claim.',
    theirPosition: 'Supplier\'s liability is uncapped for all claims.',
    ourPosition: 'Liability remains capped except for confidentiality and willful misconduct.',
  },
  comparison: {
    baselineText: 'Payment is due within thirty days of invoice receipt.',
    theirPosition: 'Payment is due within sixty days of invoice receipt.',
  },
};
