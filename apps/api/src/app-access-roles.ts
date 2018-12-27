import { RolesBuilder } from 'nest-access-control';

// TODO: move this to dedicated sub feature module

/**
 * Each role contains effective set of permissions to a resource.
 * Underscore at the role name beginning indicates
 * that it is system role (always available out of the box)
 * Later dynamic (user-defined) roles can be added.
 */
export enum AppAccessRoles {
  /**
   * System God, can do everything.
   */
  _PLATFORM_OWNER = '_PLATFORM_OWNER',
  /**
   * Can do everything in clinic.
   */
  _CLINIC_OWNER = '_CLINIC_OWNER',
  /**
   * Allows work with employee records.
   */
  _HR = '_HR',
  /**
   * Allows work with inventory balance data.
   */
  _INVENTORY_BALANCE_KEEPER = '_INVENTORY_KEEPER',
  /**
   * Allows any actions to inventory.
   */
  _INVENTORY_MASTER = '_INVENTORY_MASTER',
  /**
   * This role contains basic permissions which are granted to users all users (even with no roles).
   */
  _BASIC_PERMISSIONS = '_BASIC_PERMISSIONS',
}

export const appRoles = new RolesBuilder();

appRoles.grant(AppAccessRoles._BASIC_PERMISSIONS);

appRoles
  .grant(AppAccessRoles._HR)
  .createAny('employee')
  .updateAny('employee');

appRoles.grant(AppAccessRoles._INVENTORY_BALANCE_KEEPER);

appRoles
  .grant(AppAccessRoles._INVENTORY_MASTER)
  .extend(AppAccessRoles._INVENTORY_BALANCE_KEEPER)
  .createAny('inventory-item')
  .updateAny('inventory-item');

appRoles
  .grant(AppAccessRoles._CLINIC_OWNER)
  .extend([AppAccessRoles._HR, AppAccessRoles._INVENTORY_MASTER]);

appRoles
  .grant(AppAccessRoles._PLATFORM_OWNER)
  .extend([AppAccessRoles._CLINIC_OWNER])
  .createAny('tenant')
  .updateAny('tenant')
  .createAny('clinic')
  .updateAny('clinic');
