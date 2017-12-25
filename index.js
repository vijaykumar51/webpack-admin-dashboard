const fs = require("fs");
const circularJSON = require("circular-json");

class WebpackAdminDashboard {
	apply(compiler) {
		// let writeStream = fs.createWriteStream("./output.txt");
		// console.log(compiler);
		compiler.plugin("watch-run", (compiler, callback) => {
			console.log("==> watch-run");
			callback();
		})
		compiler.plugin("done", (stats) => {
			// writeStream.write("==> done");
			// writeStream.write("last");
			console.log("==> done");
			const pkg = require("./package.json");
			const notifier = require("node-notifier");
			const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

			notifier.notify({
				title: pkg.name,
				message: `WebPack is done!\n${stats.compilation.errors.length} errors in ${time}s`,
				contentImage: "https://path/to/your/logo.png",
			});

			// console.log("==> chunk", stats);
			fs.writeFileSync("./output.txt", Object.keys(stats.compilation));
			var output = "";
			var keys = Object.keys(stats.compilation);
			// console.log(typeof stats.compilation["chunks"])
			// stats.forEach((chunk) => {
			// 	console.log(chunk["id"]);
			// })
			// for (var chunk in stats.compilation["chunks"]) {
			// 	console.log(chunk["id"]);
			// 	console.log(chunk["name"]);
			// }
			console.log(stats.hasErrors());
			console.log(stats.hasWarnings());
			// console.log(stats.compilation.preparedChunks);
			// console.log(stats.compilation.modules);
			// console.log(Object.keys(stats.compilation.modules));
			// console.log(stats.compilation.performance.maxAssetSize);
			// console.log(stats.compilation.errors);
			// console.log(stats.compilation["chunks"][0]["id"]);
			// console.log(stats.compilation["chunks"][0]["name"]);
			// console.log(stats.compilation["chunks"][0]["entrypoints"]);
			var chunks = stats.compilation["chunks"];
			var entryPoints = stats.compilation["chunks"][0]["entrypoints"][0];
			// entryPoints.chunks.forEach((chunk) => {
			// 	console.log(chunk["name"]);
			// })
			// chunks.forEach(chunk => {
			// 	console.log("=========");
			// 	console.log(chunk["name"]);
			// 	// console.log(chunk.files);
			// 	var chunkKeys = Object.keys(chunk);
			// 	console.log(chunkKeys);
			// 	console.log(chunk["id"]);
			// 	console.log(chunk["ids"]);
			// 	console.log(chunk["debugId"]);
			// 	console.log(chunk["entrypoints"]);
			// 	// console.log(chunk["chunks"]);
			// 	// console.log(chunk["parents"]);
			// 	// console.log(chunk["blocks"]);
			// 	// console.log(chunk["origins"]);
			// 	console.log(chunk["files"]);
			// 	console.log(chunk["rendered"]);
			// 	// console.log(chunk["entryModule"]);

			// })

			// console.log(stats.compilation.outputOptions);
			// console.log(stats.compilation.profile);
			// console.log(stats.compilation.entries);
			// console.log(stats.compilation.entrypoints);
			// console.log(stats.compilation.records);
			var assets = stats.compilation.assets;
			// console.log(assets);
			console.log(Object.keys(assets));
			(Object.keys(assets)).forEach(asset => {
				console.log("---------");
				console.log(assets[asset]["_cachedSize"]);
				console.log(assets[asset]["emitted"]);
				console.log(assets[asset]["existsAt"]);
			})
			// console.log(Object.keys(assets["app.js"]));
			// console.log(assets["app.js"]["_cachedSize"]);
			// console.log(assets["app.js"]["source"]);
			// console.log(assets["app.js"]["existsAt"]);
			// console.log(assets["app.js"]["emitted"]);
			console.log(stats.compilation.errors);
			// console.log(stats.compilation.warnings);
			console.log(stats.compilation.name);


			// console.log(stats.compilation["chunks"]);
			// output += circularJSON.stringify(stats.compilation["chunks"]);

			// output += "entries - ";
			// output += Object.keys(stats.compilation["entries"]);
			// output += "\nentrypoints - ";
			// output += Object.keys(stats.compilation["entrypoints"]);
			// output += "\nerrors - ";
			// output += Object.keys(stats.compilation["errors"]);
			// output += "\nwarnings - ";
			// output += Object.keys(stats.compilation["warnings"]);
			// output += "\nassets - ";
			// output += Object.keys(stats.compilation["assets"]);

			// console.log("==> Keys ", keys.length);
			// for (var keyIndex = 0; keyIndex++; keyIndex < keys.length) {
			// 	console.log(keys[keyIndex]);
			// 	console.log(stats.compilation[keys[keyIndex]]);
			// 	output += stats.compilation[keys[keyIndex]].toString();
			// }
			fs.writeFileSync("./output.txt", output);
			// stats - compilation,hash,startTime,endTime
			// stats.compilation - _plugins,compiler,resolvers,inputFileSystem,options,
			// outputOptions,bail,profile,performance,mainTemplate,chunkTemplate,
			// hotUpdateChunkTemplate,moduleTemplate,entries,preparedChunks,entrypoints,
			// chunks,namedChunks,modules,_modules,cache,records,nextFreeModuleIndex,
			// nextFreeModuleIndex2,additionalChunkAssets,assets,errors,warnings,
			// children,dependencyFactories,dependencyTemplates,childrenCounters,
			// fileTimestamps,contextTimestamps,name,compilationDependencies,
			// /home/vijay/DevArea/angular2Apps/Hacker-News-Reader-Angular2/node_modules/webpack/lib/optimize/CommonsChunkPlugin.js0,
			// fullHash,hash,fileDependencies,contextDependencies,missingDependencies

			// writeStream.on("finish", () => {
			// 	console.log("==> WriteStream - finish");
			// })
			// writeStream.end();
		});
	}
}

module.exports = WebpackAdminDashboard;