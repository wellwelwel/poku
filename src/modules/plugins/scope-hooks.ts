import type {
  ScopeHookComposedHolder,
  ScopeHookHolder,
  ScopeHookProvider,
  ScopeHooks,
  ScopeHooksGlobal,
  ScopeHooksWithProviders,
} from '../../@types/plugin.js';

const SCOPE_HOOKS_KEY = Symbol.for('@pokujs/poku.test-scope-hooks');
const SCOPE_HOOKS_PROVIDERS_KEY = Symbol.for(
  '@pokujs/poku.test-scope-hooks.providers'
);

const scopeHooksGlobal = globalThis as ScopeHooksGlobal;

export const getScopeHooks = (): ScopeHooks | undefined =>
  scopeHooksGlobal[SCOPE_HOOKS_KEY];

const getGlobalHooks = (): ScopeHooksWithProviders | undefined =>
  scopeHooksGlobal[SCOPE_HOOKS_KEY];

const setGlobalHooks = (hooks: ScopeHooksWithProviders) => {
  scopeHooksGlobal[SCOPE_HOOKS_KEY] = hooks;
};

const normalizeProviders = (
  hooks: ScopeHooksWithProviders | undefined
): ScopeHookProvider[] => {
  if (!hooks) return [];

  const existingProviders = hooks[SCOPE_HOOKS_PROVIDERS_KEY] as
    | ScopeHookProvider[]
    | undefined;
  if (existingProviders?.length) return [...existingProviders];

  return [
    {
      name: '@pokujs/poku.legacy-scope-provider',
      createHolder: hooks.createHolder,
      runScoped: hooks.runScoped,
    },
  ];
};

const createComposedHooks = (
  providers: ScopeHookProvider[]
): ScopeHooksWithProviders => {
  const hooks: ScopeHooksWithProviders = {
    createHolder: (): ScopeHookHolder => {
      const holder: ScopeHookComposedHolder = {
        scope: undefined,
        __pokuProviders: providers.map((provider) => provider.createHolder()),
      };

      return holder;
    },

    runScoped: async (holder, fn) => {
      const composedHolder = holder as ScopeHookComposedHolder;
      const providerHolders =
        composedHolder.__pokuProviders ??
        providers.map((provider) => provider.createHolder());

      const invoke = async (index: number): Promise<void> => {
        if (index >= providers.length) {
          const result = fn();
          if (result instanceof Promise) await result;
          return;
        }

        const provider = providers[index];
        const providerHolder = providerHolders[index];

        if (!provider || !providerHolder) {
          throw new Error('Invalid scope hook composition state');
        }

        await provider.runScoped(providerHolder, () => invoke(index + 1));
      };

      await invoke(0);
    },
  };

  hooks[SCOPE_HOOKS_PROVIDERS_KEY] = providers;
  return hooks;
};

/**
 * Compose a scope hook provider into the active runtime scope hook chain.
 *
 * This is the supported way for plugin runtimes to attach per-test scope
 * lifecycle behavior to poku execution.
 */
export const composeScopeHooks = (provider: ScopeHookProvider): ScopeHooks => {
  if (!provider.name?.trim()) {
    throw new Error('composeScopeHooks: provider.name is required');
  }

  const currentHooks = getGlobalHooks();
  const providers = normalizeProviders(currentHooks);

  if (providers.some((existing) => existing.name === provider.name)) {
    return currentHooks!;
  }

  const next = createComposedHooks([...providers, provider]);
  setGlobalHooks(next);
  return next;
};
