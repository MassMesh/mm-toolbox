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
	return view;
}

function autoygg_toggle(id) {
  console.log(id);

	var view = document.getElementById("view");
  var action, newButtonLabel;

  console.log(view.querySelector('#state').innerText);
  if (view.querySelector('#state').innerText != "connected") {
    action = "--action=register";
    id.srcElement.innerText = "Connecting...";
  } else {
    action = "--action=release";
    id.srcElement.innerText = "Disconnecting...";
  }
	fs.exec("/usr/sbin/autoygg-client", ["--useUCI",action]).then(function(res){
    if (res && res.code === 0) {
      reload_view(view);
    }
  });
  return;
}

function update_view(view,obj) {
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

function reload_view(view) {
	fs.exec("/usr/sbin/autoygg-client", ["--state"]).then(function(res){
		if (res && res.code === 0) {
			var obj = JSON.parse(res.stdout.trim());
			update_view(view,obj);
		}
	});
}

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(fs.stat("/usr/sbin/autoygg-client"), null),
			L.resolveDefault(fs.exec("/usr/sbin/autoygg-client", ["--state"]), null)
		]);
	},
	render: function(info) {
		var view = init_view();

		if (info[0] && info[1] && info[1].code === 0) {
			var obj = JSON.parse(info[1].stdout.trim());
			update_view(view,obj);
			setInterval(reload_view, 5000, view);
		} else {
			view.innerHTML = "<h2>Unable to read autoygg client state</h2>";
		}
		return view;
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
