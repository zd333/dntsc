import { AppAccessRoles } from 'src/app-access-roles';

/**
 * Checks that passed target (employee model or DTO) contains all passed roles.
 */
export function hasRoles<
  T extends { readonly roles?: Array<AppAccessRoles> }
>(params: {
  readonly target: T;
  readonly roles: Array<AppAccessRoles>;
}): boolean {
  const { target: targetObj, roles: rolesToCheck } = params;
  const targetObjRoles =
    !!targetObj && Array.isArray(targetObj.roles) ? targetObj.roles : [];

  return rolesToCheck.every(roleToCheck =>
    targetObjRoles.some(targetRole => targetRole === roleToCheck),
  );
}
