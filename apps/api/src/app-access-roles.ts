import { RolesBuilder } from 'nest-access-control';
import { tuple } from './sub-features/shared/helpers/tuple';

/**
 * This is roles tuple to use for validation purposes.
 */
export const allAppAccessRoles = tuple(
  /**
   * System God, can do everything.
   */
  '_PLATFORM_OWNER',
  /**
   * Can do everything in clinic.
   */
  '_CLINIC_OWNER',
  /**
   * Allows work with employee records.
   */
  '_HR',
  /**
   * Allows work with inventory balance data.
   */
  '_INVENTORY_BALANCE_KEEPER',
  /**
   * Allows any actions to inventory.
   */
  '_INVENTORY_MASTER',
  /**
   * This role contains basic permissions which are granted to users all users (even with no roles).
   */
  '_BASIC_PERMISSIONS',
);
/**
 * Each role contains effective set of permissions to a resource.
 * Underscore at the role name beginning indicates
 * that it is system role (always available out of the box)
 * Later dynamic (user-defined) roles can be added.
 *
 * !For now restriction is applied not to all resources/resource actions, but only to several ones
 * !(when functionality required restriction to that particular resources).
 * !Thus resource decorators are not applied to most GET (read) controllers endpoints at all,
 * !so that no role is needed to read such resources.
 */
export type AppAccessRoles = typeof allAppAccessRoles[number];

export const appRoles = new RolesBuilder();

appRoles.grant('_BASIC_PERMISSIONS');

appRoles
  .grant('_HR')
  .createAny('employee')
  .updateAny('employee');

appRoles
  .grant('_INVENTORY_BALANCE_KEEPER')
  .createAny('inventory-balance-change')
  .updateAny('inventory-balance-change');

appRoles
  .grant('_INVENTORY_MASTER')
  .extend('_INVENTORY_BALANCE_KEEPER')
  .createAny('inventory-item')
  .updateAny('inventory-item');

appRoles.grant('_CLINIC_OWNER').extend(['_HR', '_INVENTORY_MASTER']);

appRoles
  .grant('_PLATFORM_OWNER')
  .extend(['_CLINIC_OWNER'])
  .createAny('tenant')
  .updateAny('tenant')
  .createAny('clinic')
  .updateAny('clinic');

appRoles.lock();
