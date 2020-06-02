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

TITLE:=mm-cli
PKG_NAME:=mm-cli
PKG_VERSION:=0.0.3
PKG_RELEASE:=1

PYPI_NAME:=$(PKG_NAME)
PYPI_SOURCE_NAME:=mm-cli
PKG_HASH:=3c430eeb1ec487819dd3333c3c18ba0765dc1b7d0030697925c795536f372873

PKG_MAINTAINER:= William Fleurant <info@massmesh.org>
PKG_LICENSE:=GNU-3
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DIR:=$(BUILD_DIR)/pypi/$(PKG_NAME)-$(BUILD_VARIANT)/$(PKG_NAME)-$(PKG_VERSION)
PKG_UNPACK=$(HOST_TAR) -C $(PKG_BUILD_DIR) --strip-components=1 -xzf $(DL_DIR)/$(PKG_SOURCE)

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/python/python3-package.mk
include $(TOPDIR)/feeds/packages/lang/python/pypi.mk

define Package/python3-mm-cli
  SECTION:=lang
  CATEGORY:=Languages
  SUBMENU:=Python
  TITLE:=python3-mm-cli
  URL:=https://pypi.org/project/mm-cli/
  DEPENDS:=+python3-light +netaddr +argh
  VARIANT:=python3
endef

define Package/python3-mm-cli/description
  A CLI application for connecting to the mesh.
endef

$(eval $(call Py3Package,python3-mm-cli))
$(eval $(call BuildPackage,python3-mm-cli))
