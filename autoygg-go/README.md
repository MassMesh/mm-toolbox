
## Prerequisites

Install a few dependencies

```
  apt-get install gawk libncurses-dev
```

Build this from the OpenWRT source snapshot for your target. E.g. for x86_64:

```
  wget https://downloads.openwrt.org/snapshots/targets/x86/64/openwrt-sdk-x86-64_gcc-8.4.0_musl.Linux-x86_64.tar.xz
```

For the raspberry pi4:

```
  wget https://downloads.openwrt.org/snapshots/targets/brcm2708/bcm2711/openwrt-sdk-brcm2708-bcm2711_gcc-8.3.0_musl.Linux-x86_64.tar.xz
```

## Build

Unpack the OpenWRT SDK

```
  tar xjf openwrt-sdk-x86-64_gcc-8.4.0_musl.Linux-x86_64.tar.xz
  cd openwrt-sdk-x86-64_gcc-8.4.0_musl.Linux-x86_64
```

Add the massmessh source to the feeds file:

```
  echo "src-git massmesh https://github.com/massmesh/mm-toolbox.git" >> feeds.conf.default
```

If you want to track another branch, add `;branchname` to the url, e.g. for the 'dev' branch:

```
   echo "src-git massmesh https://github.com/massmesh/mm-toolbox.git;dev" >> feeds.conf.default
```

Update the feeds

```
  ./script/feeds update
```

Install the yggdrasil and autoygg-go feeds

```
  ./script/feeds install yggdrasil autoygg-go
```

Generate a basic .config file. Open menuconfig and then select 'Global build settings' and disable 'Cryptographically sign package lists'. Exit and save config.

```
  make menuconfig
```

Finally, build (adjust the number of cores to something reasonable for your build box):

```
  make -j4
```
