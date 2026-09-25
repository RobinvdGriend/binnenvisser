import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';
import { canUseBottleImport } from '../shared/access';

export default defineModule({
	id: 'bottle-import',
	name: 'Bottle Import',
	icon: 'upload_file',
	preRegisterCheck(user: any, permissions: any) {
		return canUseBottleImport(user?.role?.admin_access === true, permissions);
	},
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
	],
});
