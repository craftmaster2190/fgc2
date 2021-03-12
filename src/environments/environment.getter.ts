import { generalEnvironment } from './general.environment';
import { environment } from './environment';
import * as assignDeep from 'assign-deep';

export function env(): typeof generalEnvironment {
  const envObj: typeof generalEnvironment = Object.assign(
    {},
    generalEnvironment
  );
  assignDeep(envObj, environment);
  return envObj;
}
