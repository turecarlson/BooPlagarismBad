#!/bin/bash
vagrant ssh -c 'rm -f /vagrant/bpb-back/uploads/README.md'
echo "Executing integration test for POST /upload ....."
echo ""
curl -X POST -F 'submissionFile=@README.md' http://192.168.33.10:8080/submissions/sub1/files
echo ""
echo "File uploaded (hopefully!): Echoing contents:"
echo ""
vagrant ssh -c 'cat /vagrant/bpb-back/uploads/README.md'
