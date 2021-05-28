import { always, ifElse } from 'ramda';
import { Maybe, prop } from 'fp-tools';

export function safeGet<T>(obj: Maybe) {
  return (property: keyof T) => {
    return obj.isJust ? obj.chain(prop(property)) : '';
  };
}

export const handleMaybe = (obj: Maybe) => (fn: any, def: any = null) =>
  ifElse(prop('isJust'), always(obj.chain(fn)), always(def(obj)))(obj);

export const value = (val: any) => (typeof val === 'function' ? val() : val);
