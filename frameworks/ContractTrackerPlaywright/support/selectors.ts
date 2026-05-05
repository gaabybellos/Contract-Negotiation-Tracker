export const Selectors = {
  // Contract creation
  createContractBtn: 'button:has-text("Create New Contract")',
  modalCreateContractBtn: 'button:has-text("Create Contract")',
  nameInput: 'input#name',
  counterpartyInput: 'input#counterparty',
  descriptionInput: 'textarea#description',
  ourPaperRadio: 'text="Our Paper"',
  theirPaperRadio: 'text="Their Paper"',
  clauseItemsHeader: 'text="Clause Items"',

  // Clause creation
  addClauseBtn: 'button:has-text("Add Clause")',
  clauseNumberInput: 'input[name="clauseNumber"], input[placeholder*="1.1"], input[id*="clause"]',
  topicInput: 'input[name="topic"], input[placeholder*="topic"], input[id*="topic"]',
  issueInput: 'input[name="issue"], textarea[name="issue"], input[placeholder*="issue"]',
  baselineTextArea: 'textarea[name="baselineText"], textarea[id*="baseline"]',
  theirPositionArea: 'textarea[name="theirPosition"], textarea[id*="their"]',
  ourPositionArea: 'textarea[name="ourPosition"], textarea[id*="our"]',
  saveClauseBtn: 'button:has-text("Save"), button:has-text("Add Clause")',

  // Comparison modal
  compareBtn: 'button[aria-label*="Compare"], button[title*="Compare"], button:has-text("Compare")',
  baselineVsTheirsOption: 'text="Baseline vs Theirs", text="Baseline ↔ Theirs"',
  sideBySideBtn: 'button:has-text("Side by Side")',
  inlineDiffBtn: 'button:has-text("Inline")',
};
