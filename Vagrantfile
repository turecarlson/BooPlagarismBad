# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "generic/ubuntu1804"

  config.vm.network "private_network", ip: "192.168.33.10"
  
  config.vm.synced_folder ".", "/vagrant/", type: "nfs"

  config.vm.provision :shell, path: "bootstrap.sh"

  config.vm.provider "virtualbox" do |v|
	    v.memory = 2048
  		v.cpus = 2
	end
end
