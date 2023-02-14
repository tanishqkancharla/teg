/**
 * This file shows a really simple, not-very-type-safe cli parser.
 * See the tests for usage.
 * This is not a very good cli parser. Here's some faults:
 * - Everything is optional
 * - The parsed cli options are not very type-safe
 * - It doesn't handle subcommands and subcommand options
 * - Doesn't deal with repeated options
 *
 * CLI Args can be
 * - flags: "--verbose" or "-v"
 * - key-value: "--verbose=false"
 */

import * as teg from "teg-parser"

type CliKeyValueConfig = {
	key: string
	options: string[]
}

type CliConfig = {
	flags: string[]
	keyValue: CliKeyValueConfig[]
}

class CliConfigBuilder {
	constructor(public config: CliConfig) {}

	flag(flagKey: string): CliConfigBuilder {
		return new CliConfigBuilder({
			...this.config,
			flags: [...this.config.flags, flagKey],
		})
	}

	keyValue(key: string, value: string): CliConfigBuilder {
		const { keyValue, flags } = this.config
		const matchingKeyIndex = keyValue.findIndex(
			(keyValueOptions) => keyValueOptions.key === key
		)

		if (matchingKeyIndex < 0) {
			// No matching key in keyValue options
			return new CliConfigBuilder({
				flags,
				keyValue: [...keyValue, { key, options: [value] }],
			})
		} else {
			const newKeyValue = [...keyValue]
			const newOptions = [...keyValue[matchingKeyIndex].options, value]
			newKeyValue[matchingKeyIndex] = {
				key,
				options: newOptions,
			}

			return new CliConfigBuilder({
				flags,
				keyValue: newKeyValue,
			})
		}
	}

	build() {
		return this.config
	}
}

/** Cli Config builder */
export function cliConfig(): CliConfigBuilder {
	return new CliConfigBuilder({ flags: [], keyValue: [] })
}

const whitespace = teg.oneOrMore(
	teg.oneOf([teg.text(" "), teg.text("\t"), teg.text("\n")])
)

type ParsedCliOptions = {
	[key: string]: string | boolean
}

export function cliParser(config: CliConfig): teg.Parser<ParsedCliOptions> {
	const flagParsers = config.flags.map((flag) =>
		teg
			.oneOf([
				teg.template`--${teg.text(flag)}`,
				teg.template`-${teg.text(flag)}`,
			])
			.map(() => ({ type: "flag" as const, flag }))
	)

	const keyValueParsers = config.keyValue.map(({ key, options }) => {
		const keyParser = teg.text(key)
		const optionsParser = teg.oneOf(options.map(teg.text))
		return teg.template`--${keyParser}=${optionsParser}`.map(([key, value]) => {
			return { type: "keyValue" as const, key, value }
		})
	})

	return teg
		.oneOrMore(
			teg.oneOf([...flagParsers, ...keyValueParsers, teg.word]),
			whitespace
		)
		.map((flagsAndKeyValues) => {
			const options: ParsedCliOptions = {}
			for (const flagOrKeyValue of flagsAndKeyValues) {
				if (typeof flagOrKeyValue === "string") continue

				if (flagOrKeyValue.type === "flag") {
					options[flagOrKeyValue.flag] = true
				} else {
					options[flagOrKeyValue.key] = flagOrKeyValue.value
				}
			}
			return options
		})
}
