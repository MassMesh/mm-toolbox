'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m, s, o, saved_gateways_section;

		m = new form.Map('autoygg', 'Internet Gateway Settings');

		s = m.section(form.TypedSection, 'autoygg', _('General settings'));
		s.anonymous = true;

		s.option(form.Value, "gatewayhost", _("the yggdrasil ipv6 address of your autoygg gateway"));
		s.option(form.Value, "gatewayport", _("the port of your autoygg gateway"));
		s.option(form.Value, "yggdrasilinterface", _("Yggdrasil's network interface name"));

		s.option(form.Value, "clientname", _("Your name (optional)"));
		s.option(form.Value, "clientemail", _("Your e-mail address (optional)"));
		s.option(form.Value, "clientphone", _("Your phone number (optional)"));

		saved_gateways_section = m.section(form.TypedSection, 'autoygg', _('Saved Gateways'));
		saved_gateways_section.anonymous = true;

		var saved_gateways = saved_gateways_section.option(form.DynamicList, "gateway", _("Saved gateways"));

		const ipv6_expression = /^(([a-f0-9:]+:+)+[a-f0-9]+|)$/;
		saved_gateways.validate = function(self, input) {
			if (! input.match(ipv6_expression)) {
				return "Must be a valid IPv6!";
			} else {
				return true;
			}
		}

		return m.render();
	}
});
