export function isCertainLevelUpgrades<T>(value: T | CertainLevelUpgrades<T> | EachLevelUpgrades): value is CertainLevelUpgrades<T> {
  return (typeof value === 'object') && value !== null && !('eachLevelInc' in value);
}
export function isEachLevelUpgrades(value: string | CertainLevelUpgrades<any> | EachLevelUpgrades): value is EachLevelUpgrades {
  return (typeof value !== 'string') && ('eachLevelInc' in value) && ('postfix' in value);
}
