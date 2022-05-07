import { strict as assert } from "assert";

export { assert };

export function assertEqual<T>(actual: T, expected: T, reason?: string) {
	assert.deepEqual(
		actual,
		expected,
		reason || `Values ${actual} was not equal to ${expected}`
	);
}
