include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-autoygg
PKG_VERSION:=0.0.2
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-autoygg
	SECTION:=luci
	CATEGORY:=LuCI
	SUBMENU:=3. Applications
	TITLE:=GUI for autoygg-client
	PKGARCH:=all
	DEPENDS:=+autoygg-go
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/luci-app-autoygg/install
	$(INSTALL_DIR) \
		$(1)/usr/share/luci/menu.d \
		$(1)/usr/share/rpcd/acl.d \
		$(1)/www/luci-static/resources/view/autoygg \
		$(1)/etc/uci-defaults \
		$(1)/usr/sbin

	$(INSTALL_BIN) \
		./files/autoygguci \
		$(1)/usr/sbin

	$(CP) ./files/uci-defaults/autoygg.defaults $(1)/etc/uci-defaults

	$(CP) ./files/usr/share/luci/menu.d/luci-app-autoygg.json \
			 $(1)/usr/share/luci/menu.d/luci-app-autoygg.json

	$(CP) ./files/usr/share/rpcd/acl.d/luci-app-autoygg.json \
			 $(1)/usr/share/rpcd/acl.d/luci-app-autoygg.json

	$(CP) ./files/www/luci-static/resources/view/autoygg/settings.js \
			 $(1)/www/luci-static/resources/view/autoygg/settings.js

	$(CP) ./files/www/luci-static/resources/view/autoygg/status.js \
			 $(1)/www/luci-static/resources/view/autoygg/status.js
endef

define Package/luci-app-autoygg/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	if [ -f /etc/uci-defaults/autoygg.defaults ]; then
		( . /etc/uci-defaults/autoygg.defaults ) && rm -f /etc/uci-defaults/autoygg.defaults || :
	fi
}
endef

$(eval $(call BuildPackage,luci-app-autoygg))
