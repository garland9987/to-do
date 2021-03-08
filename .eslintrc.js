module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		project: './tsconfig.json'
	},
	env: { browser: true },
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/semi': ['error', 'always'],
		'@typescript-eslint/prefer-for-of': ['error'],
		'@typescript-eslint/prefer-enum-initializers': ['error'],
		'@typescript-eslint/no-throw-literal': ['error'],
		'@typescript-eslint/no-loss-of-precision': ['error'],
		'@typescript-eslint/no-empty-interface': ['error'],
		'@typescript-eslint/no-duplicate-imports': ['error'],
		'@typescript-eslint/no-use-before-define': ['error'],
		'@typescript-eslint/default-param-last': ['error'],
		'@typescript-eslint/restrict-plus-operands': ['error'],
		'@typescript-eslint/unified-signatures': ['error'],
		'@typescript-eslint/adjacent-overload-signatures': ['error'],
		'@typescript-eslint/method-signature-style': ['error', 'property'],
		'@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
		'@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
		'@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
		'@typescript-eslint/naming-convention': ['error',
			{ selector: 'default', format: ['camelCase'] },
			{ selector: 'function', format: ['camelCase', 'PascalCase'] },
			{ selector: 'typeParameter', custom: { regex: '^[A-Z]$', match: true }, format: ['PascalCase'] },
			{ selector: ['variable', 'property'], format: ['camelCase', 'UPPER_CASE'] },
			{ selector: ['class', 'typeAlias', 'enum', 'enumMember'], format: ['PascalCase'] },
			{ selector: 'interface', custom: { regex: '^I[A-Z]', match: false }, format: ['PascalCase'] }
		],
		'@typescript-eslint/indent': ['error', 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 'first',
			outerIIFEBody: 1,
			MemberExpression: 'off',
			FunctionDeclaration: { parameters: 'off', body: 1 },
			FunctionExpression: { parameters: 'off', body: 1 },
			CallExpression: { arguments: 'first' },
			ArrayExpression: 'first',
			ObjectExpression: 'first',
			ImportDeclaration: 'first',
			flatTernaryExpressions: true,
			offsetTernaryExpressions: true,
			ignoredNodes: [],
			ignoreComments: false
		}]
	}
}
