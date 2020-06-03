# Copyright (C) 2018 William Fleurant
#
# You may redistribute this program and/or modify it under the terms of
# the GNU General Public License as published by the Free Software Foundation,
# either version 3 of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#

include $(TOPDIR)/rules.mk
TITLE:=netaddr
PKG_NAME:=netaddr
PKG_VERSION:=0.7.19
PKG_RELEASE:=1

PYPI_NAME:=$(PKG_NAME)
PYPI_SOURCE_NAME:=netaddr
PKG_HASH:=38aeec7cdd035081d3a4c306394b19d677623bf76fa0913f6695127c7753aefd

PKG_MAINTAINER:=William Fleurant <info@massmesh.org>
PKG_LICENSE:=BSD-3
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DIR:=$(BUILD_DIR)/pypi/$(PKG_NAME)-$(BUILD_VARIANT)/$(PKG_NAME)-$(PKG_VERSION)
PKG_UNPACK=$(HOST_TAR) -C $(PKG_BUILD_DIR) --strip-components=1 -xzf $(DL_DIR)/$(PKG_SOURCE)

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/python/python3-package.mk
include $(TOPDIR)/feeds/packages/lang/python/pypi.mk

define Package/python3-netaddr
	SECTION:=lang
	CATEGORY:=Languages
	SUBMENU:=Python
	TITLE:=python3-netaddr
	URL:=https://pypi.org/project/netaddr/
	DEPENDS:=+python3-light
	VARIANT:=python3
endef

define Package/python3-netaddr/description
	A network address manipulation library for Python
endef

$(eval $(call Py3Package,python3-netaddr))
$(eval $(call BuildPackage,python3-netaddr))
