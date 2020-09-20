"# HiddenWall\n<img align=\"center\" src=\"https://github.com/CoolerVoid/HiddenWall/blob/master/doc/hiddenwallCMD.png?raw=true\">\n\nHiddenWall is a Linux kernel module generator for custom rules with netfilter. (block ports, Hidden mode, rootkit functions etc).\n<img align=\"right\" width=\"240\" height=\"220\" src=\"https://github.com/CoolerVoid/HiddenWall/blob/master/doc/wall.png\">\nThe motivation: on bad situation, attacker can put your iptables/ufw to fall... but if you have HiddenWall, \nthe attacker will not find the hidden kernel module that block external access, because have a hook to netfilter on \nkernel land(think like a second layer for firewall).\n\nMy beginning purpose at this project is protect my personal server, now is protect the machines of my friends.\nWhen i talk \"friends\", i say peoples that don't know how to write low level code. Using the HiddenWall you can \ngenerate your custom kernel module for your firewall configuration. \n\nThe low level programmer can write new templates for modules etc...\n\n\nFirst step, understand before run\n--\n\nVerify if the kernel version is 3.x, 4.x or 5.x:\n```\nuname -r\n```\n\nClone the repository\n```\ngit clone https://github.com/CoolerVoid/HiddenWall\n```\n\nEnter the folder\n```\ncd HiddenWall/module_generator\n```\n\nEdit your firewall rules in directory  rules/server.yaml, the python scripts use that file to generate a new firewall module.\n\n```\n$ cat rules/server.yaml\nmodule_name: SandWall\npublic_ports: 80,443,53\nunhide_key: AbraKadabra\nhide_key: Shazam\nfake_device_name: usb14\nliberate_in_2_out: True\nwhitelist: \n- machine: \n   ip: 192.168.100.181\n   open_ports: 22,21\n- machine:\n   ip: 192.168.100.22\n   open_ports: 22\n\n```\n\nIf you want study the static code to generate, look the content at directory \"templates\".\n\n\n\n\nSecond step, generate your module\n--\n\nIf you want generate a kernel module following your YAML file of rules, follow that command:\n\n```\n$ python3 WallGen.py --template template/hiddenwall.c -r rules/server.yaml\n```\nThis generate a generic module with rules of server.yaml, if you want to use another template you can use \"wall.c\", so template module \"hiddenwall\" have option to run on hidden mode(is not visible to \"# lsmod\" for example).\n\n\n\nThird step, install your module\n--\n\nTo test module:\n```\n# cd output; make clean; make\n# insmod SandWall.ko\n```\n\nThe rule of YAML to generate module is simple, drop all out to in packets, accept ports 80,443 and 53. The machine 192*.181 can connect at ports 22 and 21...\n\nif you use nmap at localhost/127.0.0.1 you can view the ports open... because rule liberate_in_2_out is true.\n\nPassword to turn Firewall visible is \"AbraKadabra\".\n\nPassword to turn Firewall invisible is \"Shazam\".\n\nYou need to send password for your fake device \"usb14\".\n\nTo exit module, you need turn visible at \"lsmod\" command ...\n\n```\n# echo \"AbraKadabra\" > /dev/usb14\n# lsmod | grep SandWall\n# rmmod SandWall\n```\n\n\nRandom notes\n--\n\nTested on ubuntu 16 and fedora 29 at kernels \"3.x\",\"4.x\" and \"5.x\".\n\n\nTODO\n--\n\nSuport to IPV6.\nMacro to select the interface(to use multiple modes for each interface).\nOption to remove last logs when turn hide mode.\nOption to search and remove others toolkits...\nCode generator to BFP...\n\n\nReferences\n--\n\n*Wikipedia Netfilter* \nhttps://en.wikipedia.org/wiki/Netfilter\n\n*Linux Device Drivers* \nhttp://lwn.net/Kernel/LDD3/\n\n*M0nad's Diamorphine* \nhttps://github.com/m0nad/Diamorphine/\n"