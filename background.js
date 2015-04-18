// Relevant documentation:
// https://developer.chrome.com/extensions/tabs
// https://developer.chrome.com/extensions/commands

function moveTab(dir) {
	chrome.tabs.getAllInWindow(null, function(tabs) {

		var active = null;

		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].active === true) {
				active = i;
				break;
			}
		}

		if (active === null) return;

		var newIndex = active + dir;

		if (newIndex >= 0 && newIndex < tabs.length) {
			chrome.tabs.move(tabs[active].id, {index: newIndex});
		}

	});
}

chrome.commands.onCommand.addListener(function(command) {
	console.log(command);

	switch (command) {
		case 'move-tab-left': moveTab(-1); break;
		case 'move-tab-right': moveTab(1); break;
	}

});