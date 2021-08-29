include $(TOPDIR)/rules.mk

PKG_NAME:=massmesh-gateways
PKG_VERSION:=0.0.2
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/massmesh-gateways
  SECTION:=net
  CATEGORY:=Network
  SUBMENU:=Routing and Redirection
  TITLE:=Massmesh autoygg gateways
  PKGARCH:=all
  DEPENDS:=+autoygg-go
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/massmesh-gateways/install
	$(INSTALL_DIR) \
		$(1)/etc
	$(CP) ./files/autoygg-gateways.json $(1)/etc/autoygg-gateways.json
endef

$(eval $(call BuildPackage,massmesh-gateways))
