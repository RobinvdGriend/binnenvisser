import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';

export default defineModule({
	id: 'bottle-import',
	name: 'Bottle Import',
	icon: 'upload_file',
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
	],
});
