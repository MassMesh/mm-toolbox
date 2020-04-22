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
PKG_SOURCE_URL:=https://github.com/MassMesh/mm-cli

PKG_LICENSE:=GPL-3.0
PKG_LICENSE_FILES:=LICENSE

# PKG_INSTALL:=1

include $(INCLUDE_DIR)/package.mk

define Package/mm-cli/Default
  SUBMENU:=Python
  SECTION:=lang
  CATEGORY:=Languages
  URL:=https://github.com/MassMesh/mm-cli
endef

define Package/mm-cli
	CATEGORY:=Administration
	MAINTAINER:=William Fleurant <igel@bostonmesh.net>
	SECTION:=admin
	TITLE:=mm-cli
	URL:=
	DEPENDS:=python
endef


define Package/mm-toolbox/description
	A CLI application for connecting to the mesh. Written in Python.
endef


$(eval $(call PyPackage,mm-cli))
$(eval $(call BuildPackage,mm-cli))

