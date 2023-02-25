// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fivempjautomation" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('fivempjautomation.createFolders', function () {

		var files = [];

		const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;

		const clientPath = workspaceFolder + '/client';
		const serverPath = workspaceFolder + '/server';
		const uiPath = workspaceFolder + '/ui';

		files.push(
			{type: 'client', path: vscode.Uri.file(clientPath + '/main.lua'), content: null},
			{type: 'server', path: vscode.Uri.file(serverPath + '/main.lua'), content: null},
			{type: 'html', path: vscode.Uri.file(uiPath + '/index.html'), content: null},
			{type: 'css', path: vscode.Uri.file(uiPath + '/style.css'), content: null},
			{type: 'js', path: vscode.Uri.file(uiPath + '/script.js'), content: null},
			{type: 'config', path: vscode.Uri.file(workspaceFolder + '/config.lua'), content: 'Config = {}'},
			{type: 'fxmanifest', path: vscode.Uri.file(workspaceFolder + '/fxmanifest.lua'), 
			content: "fx_version 'cerulean'\ngame 'gta5'\nlua54 'yes'\n\nauthor 'user'\ndescription 'Description'\nversion '1.0.0'\n\nclient_scripts {\n\t'client/*.lua'\n}\n\nserver_scripts {\n\t'server/*.lua'\n}\n\nui_page 'ui/*.html'\n\nfiles {\n\t'ui/*.html'\n\t'ui/style.css\n\t'ui/*.js'\n}"},
		);

		const wsedit = new vscode.WorkspaceEdit();

		files.forEach(element => {
			const path = element.path;
			wsedit.createFile(path ,{ ignoreIfExists: true });

			if(element.content != null){
				fs.writeFileSync(element.path.fsPath, element.content);
			}else{
				vscode.workspace.applyEdit(wsedit);
			}
		});
		
		vscode.window.showInformationMessage('Files created');
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
