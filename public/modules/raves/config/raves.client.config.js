'use strict';

// Configuring the Articles module
angular.module('raves').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Raves', 'raves', 'dropdown', '/raves(/create)?');
		Menus.addSubMenuItem('topbar', 'raves', 'List Rave', 'raves');
		Menus.addSubMenuItem('topbar', 'raves', 'New Rave', 'raves/create');
	}
]);