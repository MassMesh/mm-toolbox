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

		var ipv6_expression = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
		saved_gateways.validate = function(self, input) {
			if(input.match(ipv6_expression))
				return true;
			else
				return "Must be a valid IPv6!";
		}

		return m.render();
	}
});
