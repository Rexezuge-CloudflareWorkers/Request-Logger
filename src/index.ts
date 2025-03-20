/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Get headers
		const contentType = request.headers.get("Content-Type");
		const userAgent = request.headers.get("User-Agent");

		let body: any;

		// Parse body based on Content-Type
		if (contentType?.includes("application/json")) {
			body = await request.json(); // Parse JSON body
		} else if (contentType?.includes("text/plain")) {
			body = await request.text(); // Parse text body
		} else if (contentType?.includes("application/x-www-form-urlencoded")) {
			body = await request.formData(); // Parse form data
		} else {
			body = await request.arrayBuffer(); // Default to raw bytes
		}

		console.log(`Received Request: ${JSON.stringify({ headers: Object.fromEntries(request.headers), body }, null, 2)}`);

		return new Response(JSON.stringify({ headers: Object.fromEntries(request.headers), body }), {
			headers: { "Content-Type": "application/json" },
		});
	},
} satisfies ExportedHandler<Env>;
