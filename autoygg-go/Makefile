include $(TOPDIR)/rules.mk

PKG_NAME:=autoygg
PKG_VERSION:=0.2.1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/massmesh/autoygg/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=23d7e5d986ceb86cde5b23ce09734fc0c8169cae29fb7b335314c07ae663c58c
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

PKG_MAINTAINER:=William Fleurant <meshnet@protonmail.com>
PKG_LICENSE:=GPL-3.0
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_USE_MIPS16:=0

GO_PKG:=github.com/massmesh/autoygg
GO_PKG_BUILD_PKG:=github.com/massmesh/autoygg/cmd/.../...
GO_PKG_LDFLAGS_X:=github.com/massmesh/autoygg/internal.version=v$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk

define Package/autoygg-go
	SECTION:=net
	CATEGORY:=Network
	SUBMENU:=Routing and Redirection
	TITLE:=Automatically configure egress through a yggdrasil network
	URL:=https://github.com/massmesh/autoygg
	DEPENDS:=$(GO_ARCH_DEPENDS) yggdrasil
endef

define Package/autoygg-go/description
Autoygg is a tool to automatically configure an internet egress node on an yggdrasil network.
 There is a server component (autoygg-server) which acts as egress gatekeeper on an yggdrasil
 node with internet access (e.g. a VPS in the cloud). It has a REST api that is consumed by
 the client component (autoygg-client). The client can register with the server for internet
 egress access. When it gets a successful response from the server, it will configure the local
 yggdrasil node to send all internet-bound traffic out via the node that runs autoygg-server.
 Because the traffic between the client and server runs over the yggdrasil network, it is
 end-to-end encrypted until the point of egress to the internet.
endef

define Package/autoygg-go/conffiles
	/etc/autoygg.db
endef

define Package/autoygg-go/install
	$(INSTALL_DIR) \
		$(1)/usr/sbin

	$(INSTALL_DIR) \
		$(1)/etc/hotplug.d/iface/

	$(INSTALL_BIN) \
		$(GO_PKG_BUILD_BIN_DIR)/autoygg-client \
		$(1)/usr/sbin

	$(INSTALL_BIN) \
		$(GO_PKG_BUILD_BIN_DIR)/autoygg-server \
		$(1)/usr/sbin

	$(INSTALL_BIN) \
		./files/hotplug_iface \
		$(1)/etc/hotplug.d/iface/05-autoygg-client
endef

$(eval $(call GoBinPackage,autoygg-go))
$(eval $(call BuildPackage,autoygg-go))
