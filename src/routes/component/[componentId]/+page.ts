/** @type {import('./$types').PageLoad} */ export function load({ params }) {
	return {
		componentName: params.componentId
	};
}
