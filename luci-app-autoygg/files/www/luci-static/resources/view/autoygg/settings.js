'use strict';
'require view';
'require fs';
'require form';
'require ui';
'require uci';

function init_view() {
  var view = document.createElement("div");

  var gatewaysDiv = document.createElement("div");
  gatewaysDiv.id = "custom-gateways"
  var title = document.createElement("h2");
  title.innerText = "Gateways";
  gatewaysDiv.appendChild(title);
  var gateways = document.createElement("table");
  gateways.setAttribute("class", "table"); gateways.id = "autoygg-gateways";
  var tr = document.createElement("tr");
  tr.setAttribute("class", "tr table-titles");
  ["Address", "Description", "Port", "Status", "", ""].forEach(function(t) {
    var th = document.createElement("th"); th.setAttribute("class", "th nowrap left");
    th.innerText = t;
    tr.appendChild(th);
  });
  gateways.appendChild(tr);
  gatewaysDiv.appendChild(gateways);
  view.appendChild(gatewaysDiv);

  return view;
}

var gateway_statuses = new Promise((resolve, reject) => {
  let savedGateways;
  return resolve(L.resolveDefault(fs.read("/etc/autoygg-gateways.json"), '{ "gateways": [] }').then(function(savedGatewaysRaw) {
    if (savedGatewaysRaw === '{ "gateways": [] }') {
      ui.addNotification("Gateways file not found", `The /etc/autoygg-gateways.json file was not found, please install a package that supplies that file (e.g. 'massmesh-gateways')`, "warning");
    }

    const savedGatewaysJSON = JSON.parse(savedGatewaysRaw);
    savedGateways = savedGatewaysJSON["gateways"];

    let promiseArr = savedGateways.map(function(gateway) {
      var info_url = "[" + gateway["yggdrasilip"] + "]:" + gateway["port"] + "/info"
      return L.resolveDefault(fs.exec("/usr/bin/curl",  [info_url]), null).then(function(status) {
        gateway.status = status;
      });
    });

    return Promise.all(promiseArr).then( function() { return savedGateways });
  }));
});

return view.extend({
  load: function() {
    return Promise.all([
      L.uci.load('autoygg'),
      L.resolveDefault(gateway_statuses, null)
    ]);
  },
  render: function(info) {
    var view = init_view();
    var saved_gateways = info[1];

    if (info[0] && info[1]) {
      var m, s, o;

      m = new form.Map('autoygg', 'Gateway Selection');

      s = m.section(form.TypedSection, 'autoygg', null);
      s.anonymous = true;

      s.option(form.Value, "gatewayhost", _("Host"), _("the yggdrasil ipv6 address of your autoygg gateway"));
      s.option(form.Value, "gatewayport", _("Port"), _("the port of your autoygg gateway"));
      s.option(form.Value, "yggdrasilinterface", _("Interface"), _("Yggdrasil's network interface name"));

      s.option(form.Value, "clientname", _("Your name (optional)"));
      s.option(form.Value, "clientemail", _("Your e-mail address (optional)"));
      s.option(form.Value, "clientphone", _("Your phone number (optional)"));

      m.render().then(function(result) { view.appendChild(result); });

      var table = view.querySelector('#autoygg-gateways');
      Object.keys(saved_gateways).forEach(function(i) {
        var gateway = saved_gateways[i];
        var row = table.insertRow(-1);
        row.insertCell(-1).textContent = gateway.yggdrasilip;
        row.insertCell(-1).textContent = gateway.comment;
        row.insertCell(-1).textContent = gateway.port;
        var td = row.insertCell(-1)
        if (saved_gateways[i] && gateway.status.code === 0) {
          td.textContent = _("Online");
          td.setAttribute("class", "td left success");
          var td2 = row.insertCell(-1)
          var info_btn = document.createElement("button");
          info_btn.setAttribute("class", "btn info");
          info_btn.innerText = _("Info");
          info_btn.addEventListener('click', async() => {
            const info = JSON.parse(gateway.status.stdout);
              //console.log(`${JSON.stringify(info)}`);
              if (info != undefined) {
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
              }
            });
            td2.appendChild(info_btn);

            var td3 = row.insertCell(-1)
            td3.setAttribute("class", "td right");
            var select_btn = document.createElement("button");
            select_btn.setAttribute("class", "btn primary");
            select_btn.innerText = _("Select");
            select_btn.addEventListener('click', async () => {
              if (gateway.yggdrasilip !== uci.get('autoygg', 'autoygg', 'gatewayhost')) {
                uci.set('autoygg', 'autoygg', 'gatewayhost', gateway.yggdrasilip);
                uci.set('autoygg', 'autoygg', 'gatewayport', gateway.port);

                var host = document.getElementById('widget.cbid.autoygg.autoygg.gatewayhost').value;
                document.getElementById('widget.cbid.autoygg.autoygg.gatewayhost').value = gateway.yggdrasilip;

                var port = document.getElementById('widget.cbid.autoygg.autoygg.gatewayport').value;
                document.getElementById('widget.cbid.autoygg.autoygg.gatewayport').value = gateway.port;

                ui.addNotification("Gateway Changed", `The following changes have been made under 'Gateway Selection':<br/>&nbsp;&nbsp;Host: ${host} ➡️ ${gateway.yggdrasilip}<br/>&nbsp;&nbsp;Port: ${port}➡️ ${gateway.port}<p/>To begin using the new gateway, click 'Save & Apply' first.`, "warning");
              }
              else {
                ui.addNotification("Oops!", "You are already using that gateway. Nothing to do.");
              }
            });
            td3.appendChild(select_btn);

          } else {
            td.textContent = _("Unreachable");
            td.setAttribute("class", "td left danger");
            row.insertCell(-1).textContent = "";
            row.insertCell(-1).textContent = "";
          }
      });
      return view;
    } else {
      view.innerHTML = "<h2>ERROR!!!!</h2>";
      return view;
    }
  },
});
