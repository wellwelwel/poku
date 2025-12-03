export class ResourceRegistry<T> {
  private registry: Record<string, T> = {};
  private isRegistering = false;

  register(name: string, entry: T) {
    this.registry[name] = entry;
  }

  get(name: string) {
    return this.registry[name];
  }

  has(name: string) {
    return name in this.registry;
  }

  clear() {
    for (const key in this.registry) {
      if (Object.prototype.hasOwnProperty.call(this.registry, key)) {
        delete this.registry[key];
      }
    }
  }

  getIsRegistering() {
    return this.isRegistering;
  }

  setIsRegistering(value: boolean) {
    this.isRegistering = value;
  }

  getRegistry() {
    return this.registry;
  }
}
