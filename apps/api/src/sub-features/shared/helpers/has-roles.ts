import { AppAccessRoles } from 'src/app-access-roles';

/**
 * Checks that passed target (employee model or DTO) contains all passed roles.
 */
export function hasRoles<T extends { roles?: Array<AppAccessRoles> }>(params: {
  target: T;
  roles: Array<AppAccessRoles>;
}): boolean {
  const { target: targetObj, roles: rolesToCheck } = params;

  return (
    !!targetObj &&
    !!Array.isArray(targetObj.roles) &&
    rolesToCheck.every(roleToCheck =>
      targetObj.roles.some(targetRole => targetRole === roleToCheck),
    )
  );
}
