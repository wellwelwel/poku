import type { ValueSerializer } from '../@types/serializer.js';
import { serializerRegistry } from '../configs/serializers.js';

export const registerSerializer = (
  serializer: ValueSerializer
): (() => void) => {
  if (typeof serializer.name !== 'string' || !serializer.name.trim())
    throw new TypeError('A serializer must have a nonempty name.');
  if (typeof serializer.test !== 'function')
    throw new TypeError('A serializer must provide a test function.');
  if (typeof serializer.serialize !== 'function')
    throw new TypeError('A serializer must provide a serialize function.');

  const entry = { ...serializer };
  serializerRegistry.set(entry.name, entry);

  return () => {
    if (serializerRegistry.get(entry.name) === entry)
      serializerRegistry.delete(entry.name);
  };
};
