# About

BooPlagiarismBad was a semester-length project for Foundations of Software Engineering (CS5600) at Northeastern Univerity in Fall 2020. Further explanation of project aproach and implementation can be found in the report found [here](https://github.com/turecarlson/BooPlagiarismBad/blob/master/docs/CS5500%20Term%20Project%20Report.pdf).

This project repo exists primarily for the sake of visibility of employers, internship/co-op coordinators, and other professionals who may find this useful.

The project repo **does not** exist for use of current/prospective students of CS5500. Please refer to your course materials, and consult your fellow classmates and teaching staff for resources to complete this project. Khoury College of Computer Sciences academic integrity policy has been reiterated below, and should be referenced, should you find yourself in this category of individual viewing this repo.

# ACADEMIC INTEGRITY

Should any current/prospective students for CS5500 come across this project repo, please keep in mind Khoury College's academic integrity policy:

Being found guilty of plagiarism on a project designed to detect plagiarism would be... ironic at best, and shameful in all cases.

### ACADEMIC INTEGRITY

**Individual assignments are just that - work that you do on your own.** For example, when you are asked to write a program for an individual homework assignment, you should not discuss your solution with other students. If something is unclear, please ask a TA for clarification.

No illicit collaboration! **If unsure, ask the professor!**

You must submit only your own work. If you steal someone else's work, you fail the class. If you are in doubt whether using others' work is allowed, you should assume that it is NOT allowed unless the instructors confirm otherwise.

You are responsible for protecting your work. If someone uses your work, you fail the class.

### Using Third Party Materials

You are encouraged to use resources from the internet when it is explicitly allowed. All materials used from other resources must be acknowledged and the sources/author must be properly credited. Otherwise, you are stealing. Failure to do so shall be considered plagiarism, which has severe repercussion to your grade and your academic standing in the University. As a student in the University you are expected to be familiar with and abide by Northeastern University rules of academic honesty and integrity, including plagiarism.

### Academic Integrity Policy

The University views academic dishonesty as one of the most serious offenses that a student can commit while in college, and it imposes appropriate punitive sanctions on violators. Here are some examples of academic dishonesty. While this is not an all-inclusive list, we hope this will help you to understand some of the things instructors look for. The following is excerpted from the [University’s policy on academic integrity](http://www.northeastern.edu/osccr/academic-integrity-policy/):


| Cheating | Intentionally using or attempting to use unauthorized materials, information or study aids in an academic exercise |
| - | - |
| Fabrication | Intentional and unauthorized falsification, misrepresentation, or invention of any data, or citation in an academic exercise |
| Plagiarism | Intentionally representing the words, ideas, or data of another as one’s own in any academic exercise without providing proper citation |
| Unauthorized Collaboration | Instances when students submit individual academic works that are substantially similar to one another; while several students may have the same source material, the analysis, interpretation, and reporting of the data must be each individual’s independent work |
| Participation in Academically<br/>Dishonest Activities | Any action taken by a student with the intent of gaining an unfair advantage |
| Facilitating Academic<br/>Dishonesty | Intentionally or knowingly helping or attempting to violate any provision of this policy |

# Team 25 -- CS5500 Foundations of Software Engineering Fall 2020

Ture Carlson

Will Cohen

Chris Martin

Mikayla Werzanski

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
* Export the following environment variables:
  `APIPORT`
  `DBCONNECTIONSTRING`
  `MAXFILEUPLOADSIZE`
  `COMPARISONTHRESHOLD`
  `REACT_APP_BPB_SRVADDR` (*Note*: See below for recommended default values for each variable)
* Navigate to `bpb-back/`, run `npm run start`
* Navigate to `bpb-front/`, run `npm run start`

# Required Environment Variables

Note: all environment variables must be specified as strings

*REACT_APP_BPB_SRVADDR*

Specifies the location of the back-end server. Must point to where the back-end is hosted.

Example Value: http://127.0.0.1:8080/

*APIPORT*

Specifies the port that bpb-back will serve API requests on.

Must match the port value specified in REACT_APP_BPB_SRVADDR (above)

Example Value: 8080

*DBCONNECTIONSTRING*

Specifies the location of the bpb MongoDB database. Must point to where the database is hosted.

Example Value: "mongodb://127.0.0.1:27017/bpb"

*MAXFILEUPLOADSIZE*

Indicates the maximum allowable size for a single submission file upload (in bytes)

Example Value: 5000000

*COMPARISONTHRESHOLD*

Determines similarity sensitivity for individual subtree element comparisons.

Determines whether BPB considers submission subelements to be similar (or not)

Example Value: 120 (default)
