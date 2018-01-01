class WebpackAdminDashboard {
	apply(compiler) {
		compiler.plugin("watch-run", (compiler, callback) => {
			console.log("===> watch");
			if (callback) {
				callback();
			}
		});
		compiler.plugin("done", (stats, callback) => {
			console.log("===> done");
			if (callback) {
				callback();
			}
		});
		compiler.plugin("emit", (compilation, callback) => {
			console.log("===> emit");
			if (callback) {
				callback();
			}
		});
	}
}

module.exports = WebpackAdminDashboard;