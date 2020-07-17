'use strict';
'require view';
'require fs';
'require form';
'require ui';

function init_view() {
	var view = document.createElement("div");
	var self_info = document.createElement("div"); self_info.setAttribute("class", "table");

	var table_data = {
		"State": "state",
		"Desired State": "desiredstate",
		"Error": "error",
		"Autoygg Gateway IPv6 address": "gatewayhost",
		"Autoygg Gateway Port": "gatewayport",
		"Autoygg Gateway Public key": "gatewaypubkey",
		"Yggdrasil interface": "yggdrasilinterface",
		"Client IP": "clientip",
		"Client Netmask": "clientnetmask",
		"Client Gateway": "clientgateway",
		"Lease expires": "leaseexpires"
	};

	Object.keys(table_data).forEach(function(k) {
		var tr = document.createElement("div");
		tr.setAttribute("class", "tr");
		var td1 = document.createElement("div"); td1.setAttribute("class", "td left");
		td1.textContent = k;
		var td2 = document.createElement("div"); td2.setAttribute("class", "td left");
		td2.id = table_data[k];

		tr.appendChild(td1); tr.appendChild(td2); self_info.appendChild(tr);
	});

	var info_title = document.createElement("h2"); info_title.innerText = _("Autoygg client status");

  var isConnected = (view.querySelector('#state') && view.querySelector('#state').innerText == "connected");
  var btns;
  btns = [
          E('button', {
            'class': 'cbi-button cbi-button-neutral enable-disable',
            'id': 'autoyggButton',
            'title': isConnected ? _('Disconnect from the autoygg gateway') : _('Connect to the autoygg gateway'),
            'click': ui.createHandlerFn(this, autoygg_toggle)
          },isConnected ? _('Disconnect') : _('Connect'))
  ];

  var button_div = E('div', { 'class': 'td middle cbi-section-actions' }, E('div', btns));

	view.appendChild(info_title);
  view.appendChild(button_div);
	view.appendChild(self_info);

	var gateway_info_title = document.createElement("h2"); gateway_info_title.innerText = _("Autoygg gateway info");
	var gateway_info = document.createElement("div"); gateway_info.setAttribute("class", "table");
	var gateway_data = {
		"Owner": "gatewayowner",
		"Description": "description",
		"Gateway information URL": "gatewayinfourl",
		"Software version": "softwareversion",
		"Network": "network",
		"Location": "location",
		"Registration required": "requireregistration",
		"Approval required": "requireapproval",
		"Access List Enabled": "accesslistenabled"
	};

	Object.keys(gateway_data).forEach(function(k) {
		var tr = document.createElement("div");
		tr.setAttribute("class", "tr");
		var td1 = document.createElement("div"); td1.setAttribute("class", "td left");
		td1.textContent = k;
		var td2 = document.createElement("div"); td2.setAttribute("class", "td left");
		td2.id = gateway_data[k];

		tr.appendChild(td1); tr.appendChild(td2); gateway_info.appendChild(tr);
	});

	view.appendChild(gateway_info_title);
	view.appendChild(gateway_info);

	return view;
}

function autoygg_toggle(id) {
	var view = document.getElementById("view");
  var action, newButtonLabel;

  if (view.querySelector('#state').innerText != "connected") {
    action = "--action=register";
    id.srcElement.innerText = "Connecting...";
  } else {
    action = "--action=release";
    id.srcElement.innerText = "Disconnecting...";
  }
	fs.exec("/usr/sbin/autoygg-client", ["--useUCI",action]).then(function(res){
    if (res && res.code === 0) {
      reload_client_status(view);
    }
  });
  return;
}

function update_client_status(view,obj) {
	view.querySelector('#state').innerText = obj.state;
	view.querySelector('#desiredstate').innerText = obj.desiredstate;
	view.querySelector('#error').innerText = obj.error;
	view.querySelector('#error').innerText = obj.error;
	view.querySelector('#gatewayhost').innerText = obj.gatewayhost;
	view.querySelector('#gatewayport').innerText = obj.gatewayport;
	view.querySelector('#gatewaypubkey').innerText = obj.gatewaypublickey;
	view.querySelector('#yggdrasilinterface').innerText = obj.yggdrasilinterface;
	view.querySelector('#clientip').innerText = obj.clientip;
	view.querySelector('#clientnetmask').innerText = obj.clientnetmask;
	view.querySelector('#clientgateway').innerText = obj.clientgateway;
	view.querySelector('#leaseexpires').innerText = obj.leaseexpires;

  var button = view.querySelector('#autoyggButton');
  if (obj.state == "connected") {
    button.innerText = "Disconnect"
  } else {
    button.innerText = "Connect"
  }
}

function show(v1, v2) {
  if (v1 !== undefined) {
    return v2
  } else {
    return ""
  }
}


function update_gateway_info(view,obj) {
	view.querySelector('#gatewayowner').innerText = show(obj.GatewayOwner,obj.GatewayOwner);
	view.querySelector('#description').innerText = show(obj.Description,obj.Description);
	view.querySelector('#gatewayinfourl').innerHTML = show(obj.GatewayInfoURL,"<a href=\"" + obj.GatewayInfoURL + "\">" + obj.GatewayInfoURL + "</a>");
	view.querySelector('#softwareversion').innerText = show(obj.SoftwareVersion,obj.SoftwareVersion);
	view.querySelector('#network').innerText = show(obj.Network,obj.Network);
	view.querySelector('#location').innerText = show(obj.Location,obj.Location);
	view.querySelector('#requireregistration').innerText = show(obj.RequireRegistration,obj.RequireRegistration);
	view.querySelector('#requireapproval').innerText = show(obj.RequireApproval,obj.RequireApproval);
	view.querySelector('#accesslistenabled').innerText = show(obj.AccessListEnabled,obj.AccessListEnabled);
}

function reload_info(view) {
	// We do not reload the gateway information, there is little point as it should be quite static
	fs.exec("/usr/sbin/autoygg-client", ["--state"]).then(function(res){
		if (res && res.code === 0) {
			var obj = JSON.parse(res.stdout.trim());
			update_client_status(view,obj);
		}
	});
}

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(fs.stat("/usr/sbin/autoygg-client"), null),
			L.resolveDefault(fs.exec("/usr/sbin/autoygg-client", ["--state"]), null),
			L.resolveDefault(fs.exec("/usr/sbin/autoygg-client", ["--useUCI", "--action=info"]), null)
		]);
	},
	render: function(info) {
		var view = init_view();

		if (info[0] && info[1] && info[1].code === 0) {
			var obj = JSON.parse(info[1].stdout.trim());
			update_client_status(view,obj);
			setInterval(reload_info, 5000, view);
		} else {
			view.innerHTML = "<h2>Unable to read autoygg client state</h2>";
		}
		if (info[0] && info[2] && info[2].code === 0) {
			var obj = JSON.parse(info[2].stdout.trim());
			update_gateway_info(view,obj);
		}
		return view;
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
