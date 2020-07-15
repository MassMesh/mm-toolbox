include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-mm-cli
PKG_VERSION:=0.0.1
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-mm-cli
	SECTION:=luci
	CATEGORY:=LuCI
	SUBMENU:=3. Applications
	TITLE:=GUI for mm-cli package
	PKGARCH:=all
	DEPENDS:=+python3-mm-cli-src
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/luci-app-mm-cli/install
	$(INSTALL_DIR) \
		$(1)/usr/lib/lua/luci/controller \
		$(1)/usr/lib/lua/luci/model/cbi \
		$(1)/etc/uci-defaults
	$(CP) ./files/controller/mm-cli.lua $(1)/usr/lib/lua/luci/controller
	$(CP) ./files/model/cbi/mm-cli.lua  $(1)/usr/lib/lua/luci/model/cbi
	$(CP) ./files/uci-defaults/luci-app-mm-cli $(1)/etc/uci-defaults
endef

define Package/luci-app-mm-cli/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	if [ -f /etc/uci-defaults/luci-app-mm-cli ]; then
		( . /etc/uci-defaults/luci-app-mm-cli ) && rm -f /etc/uci-defaults/luci-app-mm-cli || :
	fi
}
endef

$(eval $(call BuildPackage,luci-app-mm-cli))
