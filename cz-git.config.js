/** @type {import('cz-git').UserConfig} */
module.exports = {
  alias: {
    feat: 'feature',
    fix: 'bugfix',
    docs: 'documentation',
    style: 'formatting',
    refactor: 'refactor',
    perf: 'performance',
    test: 'test',
    chore: 'chore',
    revert: 'revert',
  },
  scopes: [
    'backend',
    'frontend',
    'interfaces',
    'utils',
    'config',
    'deps',
    'ci',
    'docs',
  ],
  messages: {
    type: '📦 Type de modification :',
    scope: '🎯 Portée (ex: backend, ui, lib):',
    customScope: 'Entrez une portée personnalisée :',
    subject: '📝 Courte description :',
    body: '✍️ Description détaillée (optionnel). Utilisez \'|\' pour des retours à la ligne :',
    breaking: '💥 Breaking change (optionnel) :',
    footer: '📎 Issues concernées, ex: #123 (optionnel) :',
    confirmCommit: 'Confirmez-vous ce commit ?',
  },
}
