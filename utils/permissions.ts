import { AccountType } from '../store/auth/auth-store';

/**
 * Permission mapping for different account types
 */
export const PERMISSIONS = {
  // Personal account permissions
  [AccountType.PERSONAL]: [
    'view:products',
    'order:create',
    'profile:edit',
    'tracking:view',
    'favorites:manage',
    'sustainability:view',
    'delivery:notifications',
  ],
  
  // Business account - Boat Owner permissions
  [AccountType.BUSINESS_BOAT_OWNER]: [
    'view:products',
    'order:create',
    'profile:edit',
    'tracking:view',
    'favorites:manage',
    'vessel:manage',
    'catch:log',
    'inventory:manage',
    'sales:view',
    'pricing:analytics',
    'delivery:schedule',
    'reports:generate',
    'distributors:communicate',
  ],
  
  // Business account - Distributor permissions
  [AccountType.BUSINESS_DISTRIBUTOR]: [
    'view:products',
    'order:create',
    'profile:edit',
    'tracking:view',
    'favorites:manage',
    'shipments:manage',
    'inventory:manage',
    'orders:process',
    'fulfillment:manage',
    'quality:control',
    'coldchain:monitor',
    'reports:generate',
  ],
  
  // Admin account permissions - has all permissions
  [AccountType.ADMIN]: [
    'admin:access',
    'users:manage',
    'system:configure',
    'transactions:view',
    'reports:all',
    'audit:logs',
    'disputes:resolve',
    'maintenance:perform',
  ],
};

/**
 * Check if a user with the given account type has a specific permission
 * 
 * @param accountType The user's account type
 * @param permission The permission to check
 * @returns boolean indicating if the user has the permission
 */
export function hasPermission(accountType: AccountType | undefined, permission: string): boolean {
  if (!accountType) {
    return false;
  }
  
  // Admin has all permissions
  if (accountType === AccountType.ADMIN) {
    return true;
  }
  
  // Check if the account type has the specific permission
  return PERMISSIONS[accountType]?.includes(permission) || false;
}

/**
 * Get all permissions for a specific account type
 * 
 * @param accountType The user's account type
 * @returns Array of permission strings
 */
export function getPermissionsForAccountType(accountType: AccountType): string[] {
  return PERMISSIONS[accountType] || [];
}

/**
 * Check if a user with the given account type has access to a specific screen
 * 
 * @param accountType The user's account type
 * @param screenPermission The permission required for the screen
 * @returns boolean indicating if the user has access to the screen
 */
export function hasScreenAccess(accountType: AccountType | undefined, screenPermission: string): boolean {
  return hasPermission(accountType, screenPermission);
}
