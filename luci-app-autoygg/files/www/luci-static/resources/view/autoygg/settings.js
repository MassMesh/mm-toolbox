'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('autoygg', 'Autoygg-client');

		s = m.section(form.TypedSection, 'autoygg', _('Gateway Selection'));
		s.anonymous = true;

		s.option(form.Value, "gatewayhost", _("Gateway Yggdrasil IPv6"));
		s.option(form.Value, "gatewayport", _("Gateway Port (default 8080)"));

		s = m.section(form.TypedSection, 'autoygg', _('Personal Settings'));
		s.anonymous = true;

		s.option(form.Value, "clientname", _("Your name (optional)"));
		s.option(form.Value, "clientemail", _("Your e-mail address (optional)"));
		s.option(form.Value, "clientphone", _("Your phone number (optional)"));
		s.option(form.Value, "yggdrasilinterface", _("Yggdrasil Network Interface"));

		s = m.section(form.TableSection, 'saved_gateway', _('Saved Gateways'));
		s.option(form.Value, "host", _("Host"));
		s.option(form.Value, "port", _("Port (default 8080)"));
		s.anonymous = true;
		s.addremove = true;

		return m.render();
	}
});
