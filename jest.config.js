// Sync object
const config = {
	testEnvironment: "node",
	verbose: true,
	transform: {
		"^.+\\.tsx?$": [
			"esbuild-jest",
			{
				sourcemap: true,
				loaders: {
					".test.ts": "tsx",
				},
			},
		],
	},
};

module.exports = config;
