include $(TOPDIR)/rules.mk

PKG_NAME:=autoygg-go
PKG_VERSION:=1.0.42
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://github.com/cure/autoygg.git
# PKG_HASH:=c82ba4020276f85f53ecd8ccb08db4c79ac0a1a23c1011140ca8585721ae9008
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-go-$(PKG_VERSION)

PKG_MAINTAINER:=William Fleurant <meshnet@protonmail.com>
PKG_LICENSE:=GPL-3.0
# PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_USE_MIPS16:=0

GO_PKG:=github.com/cure/autoygg
GO_PKG_BUILD_PKG:=github.com/cure/autoygg/cmd/...
# github.com/yggdrasil-network/yggdrasil-go/cmd/...

# GO_PKG_LDFLAGS_X:= \
#   github.com/yggdrasil-network/yggdrasil-go/src/version.buildName=yggdrasil-openwrt \
#   github.com/yggdrasil-network/yggdrasil-go/src/version.buildVersion=$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk
include ../../lang/golang/golang-package.mk

define Package/yggdrasil
	SECTION:=net
	CATEGORY:=Network
	SUBMENU:=Routing and Redirection
	TITLE:=Automatically configure egress through a yggdrasil network
	URL:=https://github.com/cure/autoygg
	DEPENDS:=$(GO_ARCH_DEPENDS) yggdrasil
endef

define Package/yggdrasil/description
 Autoygg is a tool to automatically configure an internet egress node on an yggdrasil network.
 There is a server component (autoygg-server) which acts as egress gatekeeper on an yggdrasil
 node with internet access (e.g. a VPS in the cloud). It has a REST api that is consumed by
 the client component (autoygg-client). The client can register with the server for internet
 egress access. When it gets a successful response from the server, it will configure the local
 yggdrasil node to send all internet-bound traffic out via the node that runs autoygg-server.
 Because the traffic between the client and server runs over the yggdrasil network, it is
 end-to-end encrypted until the point of egress to the internet.
endef

# define Package/yggdrasil/conffiles
#  /etc/config/yggdrasil
# endef

define Package/yggdrasil/install
	$(INSTALL_DIR) \
		$(1)/usr/sbin

 	$(INSTALL_BIN) \
 		$(GO_PKG_BUILD_BIN_DIR)/cmd/autoygg-client \
 		$(1)/usr/sbin

 	$(INSTALL_BIN) \
 		$(GO_PKG_BUILD_BIN_DIR)/cmd/autoygg-server \
 		$(1)/usr/sbin
endef

$(eval $(call GoBinPackage,autoygg))
$(eval $(call BuildPackage,autoygg))
