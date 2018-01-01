const webpack = require("webpack");

class WebpackAdminDashboard {
	apply(compiler) {

		compiler.plugin("watch-run", (compiler, callback) => {
			console.log("\n===> watching");
			if (callback) {
				callback();
			}
		});

		compiler.plugin("emit", (compilation, callback) => {
			console.log("\n===> emitting files");
			if (callback) {
				callback();
			}
		});

		compiler.plugin("done", (stats, callback) => {
			console.log("\n===> complete");

			var assets = stats.compilation.assets;
			console.log(Object.keys(assets));
			(Object.keys(assets)).forEach(asset => {
				console.log("---------");
				console.log(assets[asset]["_cachedSize"]);
				console.log(assets[asset]["emitted"]);
				console.log(assets[asset]["existsAt"]);
			})

			if (callback) {
				callback();
			}
		});

		compiler.apply(
			new webpack.ProgressPlugin((percent, msg) => {
				console.log("\npercent = ", percent * 100, "msg = ", msg);
			})
		);
	}
}

module.exports = WebpackAdminDashboard;