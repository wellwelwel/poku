import type { ValueSerializer } from '../@types/serializer.js';

const registryKey = Symbol.for('@pokujs/poku.serializers.v1');
const globals = globalThis as Record<symbol, unknown>;

globals[registryKey] ??= new Map();

export const serializerRegistry = globals[registryKey] as Map<
  string,
  ValueSerializer
>;
