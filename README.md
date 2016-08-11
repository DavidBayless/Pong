```bash
gem install bosh_cli --no-ri --no-rdoc
```
install vagrant
install virtualbox
```bash
git clone https://github.com/cloudfoundry/bosh-lite.git
cd bosh-lite
vagrant up --provider=virtualbox
bosh target 192.168.50.4
bosh login
```
user: admin
pass: admin
```bash
bin/add-route
git clone https://github.com/cloudfoundry/cf-release.git
cd cf-release
git checkout tag/v238 -b version-238
./scripts/update
```
Open .ruby-version and set its contents to "2.3.0"
```bash
./scripts/generate-bosh-lite-dev-manifest
```
Download the current "Ubuntu Trusty" > "Bosh Lite Warden" stemcell
```bash
bosh upload stemcell <PATH TO DOWNLOADED STEMCELL>
bosh create release
```
