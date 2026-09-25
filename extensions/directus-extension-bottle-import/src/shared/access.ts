/**
 * Who may use the bottle import: admins, plus any role that has every permission the
 * import needs. Grant these under Settings → Roles & Permissions to give a role access.
 *
 * Shared by the module (sidebar visibility) and the endpoint (request check).
 */

type Permission = { collection: string; action: string };

export const REQUIRED_PERMISSIONS: Permission[] = [
	{ collection: 'bottles', action: 'read' },
	{ collection: 'bottles', action: 'create' },
	{ collection: 'bottles', action: 'update' },
	{ collection: 'bottles', action: 'delete' },
	{ collection: 'bottle_categories', action: 'read' },
	{ collection: 'bottle_categories', action: 'create' },
	{ collection: 'bottle_lists', action: 'read' },
];

export const canUseBottleImport = (isAdmin: boolean, permissions: Permission[] | null | undefined): boolean =>
	isAdmin ||
	REQUIRED_PERMISSIONS.every((required) =>
		(permissions ?? []).some((p) => p.collection === required.collection && p.action === required.action),
	);
