import { AssertionError } from "node:assert";
import process from "node:process";
import { each } from "../../../configs/each.js";
import { indentation } from "../../../configs/indentation.js";
import { errorHoist, GLOBAL } from "../../../configs/poku.js";
import { hasOnly } from "../../../parsers/get-arg.js";
import { onlyIt, skip, todo } from "../modifiers.js";

// ---------------------------------------------------------------------------
// Generic per-test scope hook.
// Poku core is agnostic: any plugin/runtime may register a scope provider
// under this symbol. If absent, poku runs exactly as before.
// ---------------------------------------------------------------------------
const SCOPE_HOOKS_KEY = Symbol.for("@pokujs/poku.test-scope-hooks");
type ScopeHooks = {
	createHolder: () => { scope: unknown };
	runScoped: (
		holder: { scope: unknown },
		fn: () => Promise<unknown> | unknown,
	) => Promise<void>;
};
const getScopeHooks = (): ScopeHooks | undefined =>
	(globalThis as Record<symbol, ScopeHooks | undefined>)[SCOPE_HOOKS_KEY];

export const getTitle = (input: unknown): string | undefined =>
	typeof input === "string" ? input : undefined;

export const getCallback = (
	input: unknown,
): (() => unknown) | (() => Promise<unknown>) | undefined =>
	typeof input === "function"
		? (input as (() => unknown) | (() => Promise<unknown>))
		: undefined;

export const itBase = async (
	titleOrCb: string | (() => unknown | Promise<unknown>),
	callback?: () => unknown | Promise<unknown>,
): Promise<void> => {
	try {
		const title = getTitle(titleOrCb);
		const hasTitle = typeof title === "string";
		const cb = hasTitle ? getCallback(callback) : getCallback(titleOrCb);

		let success = true;
		let start: [number, number];
		let end: [number, number];

		GLOBAL.reporter.onItStart({ title });

		if (hasTitle) indentation.itDepth++;

		if (typeof each.before.cb === "function") {
			const beforeResult = each.before.cb();

			if (beforeResult instanceof Promise) await beforeResult;
		}

		const insideDescribe = errorHoist.depth > 0;

		let onError: ((error: unknown) => void) | undefined;

		if (!insideDescribe) {
			onError = (error: unknown): void => {
				process.exitCode = 1;
				success = false;
				if (!(error instanceof AssertionError)) console.error(error);
			};

			process.once("uncaughtException", onError);
			process.once("unhandledRejection", onError);
		} else errorHoist.failed = false;

		start = process.hrtime();

		try {
			const hooks = getScopeHooks();
			if (hooks) {
				const holder = hooks.createHolder();
				await hooks.runScoped(holder, () => cb!());
			} else {
				const resultCb = cb!();
				if (resultCb instanceof Promise) await resultCb;
			}
		} catch (error) {
			process.exitCode = 1;
			success = false;
			if (!(error instanceof AssertionError)) console.error(error);
		} finally {
			end = process.hrtime(start);

			if (onError) {
				process.removeListener("uncaughtException", onError);
				process.removeListener("unhandledRejection", onError);
			} else if (errorHoist.failed) {
				success = false;
				errorHoist.failed = false;
			}
		}

		if (typeof each.after.cb === "function") {
			const afterResult = each.after.cb();

			if (afterResult instanceof Promise) await afterResult;
		}

		if (!title) return;

		const duration = end[0] * 1e3 + end[1] / 1e6;

		indentation.itDepth--;
		GLOBAL.reporter.onItEnd({ title, duration, success });
	} catch (error) {
		if (indentation.itDepth > 0) indentation.itDepth--;

		if (typeof each.after.cb === "function") {
			const afterResult = each.after.cb();

			if (afterResult instanceof Promise) await afterResult;
		}

		throw error;
	}
};

async function itCore(title: string, cb: () => Promise<unknown>): Promise<void>;
function itCore(title: string, cb: () => unknown): void;
async function itCore(cb: () => Promise<unknown>): Promise<void>;
function itCore(cb: () => unknown): void;
async function itCore(
	titleOrCb: string | (() => unknown) | (() => Promise<unknown>),
	cb?: (() => unknown) | (() => Promise<unknown>),
): Promise<void> {
	if (GLOBAL.configs.testNamePattern && typeof titleOrCb === "string") {
		if (!GLOBAL.configs.testNamePattern.test(titleOrCb)) return;
	}

	if (GLOBAL.configs.testSkipPattern && typeof titleOrCb === "string") {
		if (GLOBAL.configs.testSkipPattern.test(titleOrCb)) return;
	}

	if (hasOnly) {
		if (!GLOBAL.runAsOnly) return;

		if (typeof titleOrCb === "string" && typeof cb === "function")
			return itBase(titleOrCb, cb);

		if (typeof titleOrCb === "function") return itBase(titleOrCb);
	}

	if (typeof titleOrCb === "string" && cb) return itBase(titleOrCb, cb);
	if (typeof titleOrCb === "function") return itBase(titleOrCb);
}

export const it = Object.assign(itCore, {
	todo,
	skip,
	only: onlyIt,
});
