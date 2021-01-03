'use strict';
'require view';
'require fs';
'require form';
'require ui';
'require uci';

function init_view(saved_gateways) {
	var view = document.createElement("div");

	var gateway_config_title = document.createElement("h2");
	gateway_config_title.innerText = _("Gateway Selection");

	var gateway_config = document.createElement("div");
	gateway_config.setAttribute("class", "table");
	gateway_config.setAttribute("id", "gatewayconfig");

	var gateway_config_data = {
		"Host": "gatewayhost",
		"Port": "gatewayport",
		"Interface": "yggdrasilinterface"
	}

	Object.keys(gateway_config_data).forEach(function(k) {
		var tr = document.createElement("div");
		tr.setAttribute("class", "tr");
		var td1 = document.createElement("div");
		td1.setAttribute("Class", "td left");
		td1.textContent = k;
		var td3 = document.createElement("div");
		td3.setAttribute("class", "td left");
		td3.id = gateway_config_data[k];

		var config_value = uci.get('autoygg', 'autoygg', gateway_config_data[k]);
		td3.textContent = config_value;

		tr.appendChild(td1);
		tr.appendChild(td3);
		gateway_config.appendChild(tr);
	});
	
	view.appendChild(gateway_config_title);
	view.appendChild(gateway_config);

	var gateway_list_title = document.createElement("h2");
	gateway_list_title.innerText = _("Saved Gateways");

	var gateway_list = document.createElement("div");
	gateway_list.setAttribute("class", "table");

	saved_gateways.forEach(function(gateway) {
		var tr = document.createElement("div");
		tr.setAttribute("class", "tr");

		Object.keys(gateway).forEach(function(k) {
			var td = document.createElement("div");
			td.setAttribute("class", "td left");
			td.setAttribute("id", k);
			if (k === 'status') {
				if (gateway[k].code === 0) {
					td.textContent = _("Online");
					td.setAttribute("class", "td left success");
				}
				else {
					td.textContent = _("Unreachable");
					td.setAttribute("class", "td left danger");
				}
			}
			else {
				td.textContent = gateway[k];
			}
			tr.appendChild(td);
		});

		var td2 = document.createElement("div");
		td2.setAttribute("class", "td right");
		var info_btn = document.createElement("button");
		info_btn.setAttribute("class", "btn info");
		info_btn.innerText = _("Info");
		info_btn.addEventListener('click', async() => {
			const info = JSON.parse(gateway.status.stdout);
			console.log(`${JSON.stringify(info)}`);
			if (info != undefined)
				var modalContent = document.createElement("div");
				var modalTitle = document.createElement("h2");
				modalTitle.textContent = _("Gateway Information");
				modalContent.appendChild(modalTitle);

				var modalDescription = document.createElement("h4");
				modalDescription.setAttribute("class", "cbi-value-description");
				modalDescription.textContent = _(gateway.yggdrasilip);
				modalContent.appendChild(modalDescription);
				
				var infoTableContainer = document.createElement("div");
				infoTableContainer.setAttribute("class", "cbi-map");
				
				var infoTable = document.createElement("div");
				infoTable.setAttribute("class", "table");
				Object.keys(info).forEach((k) => {
					var tr = document.createElement("div");
					tr.setAttribute("class", "tr");
					var td1 = document.createElement("div");
					td1.setAttribute("class", "td left");
					td1.textContent = _(k)
					var td2 = document.createElement("div");
					td2.setAttribute("class", "td left");
					td2.textContent = _(info[k]);
					tr.appendChild(td1);
					tr.appendChild(td2);
					infoTable.appendChild(tr);
				});

				infoTableContainer.appendChild(infoTable);
				modalContent.appendChild(infoTableContainer);
				
				var modalFooter = document.createElement("div");
				modalFooter.setAttribute("class", "footer right");
				modalFooter.setAttribute("style", "margin-top:1em");
				var cancel_btn = document.createElement("button");
				cancel_btn.setAttribute("class", "btn info");
				cancel_btn.innerText = _("Cancel");
				cancel_btn.addEventListener('click', () => {
					ui.hideModal();
				});
				modalFooter.appendChild(cancel_btn);
				modalContent.appendChild(modalFooter);

				ui.showModal(modalContent);
		});
		td2.appendChild(info_btn);
		tr.appendChild(td2);
		
		var td3 = document.createElement("div");
		td3.setAttribute("class", "td right");
		var select_btn = document.createElement("button");
		select_btn.setAttribute("class", "btn primary");
		select_btn.innerText = _("Select");
		select_btn.addEventListener('click', async () => {
			if (gateway.yggdrasilip !== uci.get('autoygg', 'autoygg', 'gatewayhost')) {
				uci.set('autoygg', 'autoygg', 'gatewayhost', gateway.yggdrasilip);
				uci.set('autoygg', 'autoygg', 'gatewayport', gateway.port);
				uci.save();
				ui.addNotification("Gateway Changed", `To begin using the new gateway, click 'Save & Apply' first. (New gateway: ${gateway.yggdrasilip})`, "warning");
				var host = document.getElementById('gatewayhost').innerText;
				document.getElementById('gatewayhost').innerText = host + ` ➡️ ${gateway.yggdrasilip}`;

				var port = document.getElementById('gatewayport').innerText;
				document.getElementById('gatewayport').innerText = port + ` ➡️ ${gateway.port}`;
				
				document.getElementById('gatewayconfig').setAttribute('class', 'warning');
			}
			else {
				ui.addNotification("Oops!", "You are already using that gateway. Nothing to do.");
			}
		});
		td3.appendChild(select_btn);
		tr.appendChild(td3);

		gateway_list.appendChild(tr);
	});

	view.appendChild(gateway_list_title);
	view.appendChild(gateway_list);
	return view;
}

var gateway_statuses = new Promise((resolve, reject) => {

	let saved_gateways = [
		{
			"yggdrasilip": "201:506e:60d6:bd66:e35c:606:4883:ea9a",
			"port": 8080
		},
		{
			"yggdrasilip": "201:8c48:42ef:21d6:beff:6cff:499c:2b99",
			"port": 8080
		},
		{
			"yggdrasilip": "200:647d:66b6:7fca:b5a:56ea:9c1c:30c7",
			"port": 8080
		}
	];

	saved_gateways.forEach(function(gateway) {
		var info_url = "[" + gateway["yggdrasilip"] + "]:" + gateway["port"] + "/info"
		L.resolveDefault(fs.exec("/usr/bin/curl",  [info_url]), null).then(function(status) {
			gateway.status = status;
		});
	});

	return setTimeout(resolve, 100, saved_gateways);
});

return view.extend({
	load: function() {
		return Promise.all([
			L.uci.load('autoygg'),
			L.resolveDefault(gateway_statuses, null)
		]);
	},
	render: function(info) {
		console.log(info);
		var view = init_view(info[1]);
		return view;
	}
});
