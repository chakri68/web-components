// import dirTree from 'directory-tree';
import * as fs from 'fs';

function getSitemapXML(domain: string, routes: string[]) {
	let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
	routes.forEach((route) => {
		sitemap += getSitemapUrl(domain + route);
	});
	sitemap += '\n</urlset>';
	return sitemap;
}

function getSitemapUrl(location: string) {
	const url = '<url>\n' + `<loc>${location}</loc>\n` + `<lastmod>${date}</lastmod>\n` + '</url>';
	return url;
}

// function getEndpoints(tree: dirTree.DirectoryTree, route: string) {
// 	const routes: string[] = [];
// 	tree.children!.forEach((child) => {
// 		if (child.children != undefined && child.children.length != 0) {
// 			const childRoute = route + child.name;
// 			if (child.children.some((e) => e.name === '+page.svelte')) {
// 				routes.push(childRoute);
// 			}
// 			getEndpoints(child, childRoute + '/');
// 		}
// 	});
// 	return routes;
// }

function getWebComponents() {
	const webComponents: string[] = [];
	const components = fs.readdirSync('./src/lib/web-components') as string[];
	components.forEach((component) => {
		webComponents.push(component);
	});
	return webComponents;
}

// const tree = dirTree('./src/routes');

const baseRoute = '/';
const routes = [baseRoute, ...getWebComponents().map((component) => `/component/${component}`)];
const date = new Date().toISOString().split('T')[0];

const PUBLIC_URL = process.env.PUBLIC_URL ?? 'http://localhost:3000';

// YOUR_DOMAIN should be like https://example.com
const sitemap = getSitemapXML(PUBLIC_URL, routes);

// If you use the script in postbuild mode use
// For vercel deployment use:
fs.writeFileSync('.vercel/output/static/sitemap.xml', sitemap);
fs.writeFileSync('.svelte-kit/output/client/sitemap.xml', sitemap);

// If you use the script in prebuild mode use
// fs.writeFileSync('static/sitemap.xml', sitemap);
