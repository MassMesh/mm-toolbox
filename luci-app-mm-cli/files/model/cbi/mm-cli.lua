-- "mm-cli" here refers to the name of the file in /etc/config
--
m = Map("system", translate("Yggdrasil --> Internet Gateway Configuration"),
         translate("Configure your gateway connection. This gets you to the Internet..."))

-- this refers to a section in the config file.
--
s = m:section( NamedSection, "configuration", "gateway", 
translate("Settings"))

-- and then the options in that section
--
o = s:option( Value, "key", translate( "Gateway Pub. Key" ))
o = s:option( Value, "cl_ip", translate( "Client CKR IP" ))
o = s:option( Value, "gw_ip", translate( "Gateway CKR IP" ))

-- we're done!
--
return m
