'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('autoygg', 'Autoygg-client');

		s = m.section(form.TypedSection, 'autoygg', _('General settings'));
		s.anonymous = true;

		s.option(form.Value, "gatewayHost", _("The yggdrasil IPv6 address of your Autoygg gateway"));
		s.option(form.Value, "gatewayPort", _("The port of your Autoygg gateway"));
		s.option(form.Value, "yggdrasilInterface", _("Yggdrasil's network interface name"));

		return m.render();
	}
});
