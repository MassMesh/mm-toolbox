#
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

include $(TOPDIR)/rules.mk

PKG_NAME:=mm-cli
PKG_VERSION:=0.0.1
PKG_RELEASE:=1

# PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.bz2
# PKG_SOURCE_URL:=https://www.massmesh.org/pub/

PKG_LICENSE:=GPL-3.0
PKG_LICENSE_FILES:=LICENSE

PKG_INSTALL:=1

include $(INCLUDE_DIR)/package.mk


define Package/mm-toolbox
	CATEGORY:=Administration
	MAINTAINER:=William Fleurant <igel@bostonmesh.net>
	SECTION:=admin
	TITLE:=Massachusetts Meshnet toolbox package
	URL:=https://github.com/MassMesh/mm-toolbox
endef


define Package/mm-toolbox/description
	Description of the Massachusetts Meshnet toolbox package
endef


define Build/Compile
endef


define Package/mm-toolbox/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/$(PKG_NAME) $(1)/usr/bin/
endef


$(eval $(call BuildPackage,mm-toolbox))

