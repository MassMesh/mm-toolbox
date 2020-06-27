-- "mm-cli" here refers to the name of the file in /etc/config
--
m = Map("system", translate("Internet Gateway Configuration"),
         translate("Configure a gateway connection to establish a secure tunnel to the Internet through the encrypted Yggdrasil network. You will have to coordinate with a Gateway Operator to obtain their public key and a pair of CKR (crypto-key routing) addresses."))

-- this refers to a section in the config file.
--
s = m:section( TypedSection, "gateway", translate("Gateway Settings"), translate("These live in the /etc/config/system config file."))

s.template = "cbi/tblsection"

-- and then the options in that section
--
o = s:option( Value, "key", translate( "Gateway Pub. Key" ))
o = s:option( Value, "cl_ip", translate( "Client CKR IP" ))
o = s:option( Value, "gw_ip", translate( "Gateway CKR IP" ))

-- we're done!
--
return m
