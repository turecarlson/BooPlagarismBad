# BPB

BPB is a web-based application intended to allow users to compare submissions of Java programming assignments to determine whether a given submission was likely plagiarized from another submission.

# Getting Started (Vagrant)
* Install [Vagrant](https://www.vagrantup.com/docs/installation) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
Note: On Windows, ensure [Hyper-V is disabled](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)
* Navigate to the BPB repository directory
* Run `vagrant up`
* After a delay, the application should be available at `http://192.168.33.10:3000` in your web browser of choice.

# Scripts (Vagrant)
When using the Vagrant deployment, the following *.sh scripts can be executed from the repository directory (e.g. `sh scripts/reload.sh` while in `bpb/`)
* Run `scripts/reload.sh` to resync files and restart app components in Vagrant
* Run `scripts/test.sh` to execute all tests in the Vagrant environment
* Run `scripts/test_back.sh` to run back-end tests only
* Run `scripts/test_front.sh` to run front-end tests only
* Run `scripts/test_integration.sh` to run integration tests
* Run `scripts/test_all.sh` to run all tests
* Run `scripts/monitor.sh` to monitor running apps and view log

# Getting Started (Manually)
* [Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* Create an empty MongoDB database called 'bpb' (without quotes)
* Modify environment variables if necessary in `bpb-back/.env-cmdrc.json` and `bpb-front/.env-cmdrc.json`
  *  Note: If APIPORT is changed in `bpb-back/.env-cmdrc.json`, the port must be updated in REACT_APP_BPB_SRVADDR in  `bpb-front/.env-cmdrc.json`, or the front-end will not connect to the back-end
* Navigate to `bpb-back/`
  * run `npm install`
  * run `npm run start_manual`
* Navigate to `bpb-front/`
  * run `npm install`
  * run `npm run start_manual`
