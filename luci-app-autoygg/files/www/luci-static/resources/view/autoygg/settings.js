'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('autoygg', 'Autoygg-client');

		s = m.section(form.TypedSection, 'autoygg', _('General settings'));
		s.anonymous = true;

		s.option(form.value, "gatewayhost", _("the yggdrasil ipv6 address of your autoygg gateway"));
		s.option(form.value, "gatewayport", _("the port of your autoygg gateway"));
		s.option(form.value, "yggdrasilinterface", _("Yggdrasil's network interface name"));

		return m.render();
	}
});
