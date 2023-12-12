export function exclude<
  Input extends { [k: string]: unknown },
  Key extends keyof Input,
>(object: Input, keys: Key[]): Omit<Input, Key> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<Input, Key>;
}
