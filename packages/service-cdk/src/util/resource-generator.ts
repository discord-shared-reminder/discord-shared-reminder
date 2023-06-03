import { ID_PREFIX, RESOURCE_PREFIX } from './contants'

export function generateId(id: string): string {
  return `${ID_PREFIX}-${id}`
}

export function generateName(name: string): string {
  return `${RESOURCE_PREFIX}${name}`
}
