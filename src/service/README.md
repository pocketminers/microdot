# Services Module Documentation

The `services` module contains the core classes and objects required to run the microdot architecture. This module provides a set of reusable components that define the structure and behavior of the various services within the system.

## Classes and Interfaces

### Identity Management

Identifiers are stored with the reference

### Process & Command

The `Process` class represents a process that can be executed by a peer. 

The `Process` class is an abstract class that provides a template for creating new processes. It contains methods for starting, stopping, executing commands, and status checking.

The `Command` class represents a command that can be executed by a process.  Execution metrics are collected


### Service & Job

The `Service` class represents a service that can be run by a peer. 

The `Job` class represents a job that can be executed by a service. 

* Each peer runs a single service.
* Each service can have multiple processes.
* A Job is used to manage the execution of commands on a process or processes.



### Communicator & Messages

The `Communicator` class represents a communicator that can be used to send messages between peers. 

The `Messages` class represents a message that can be sent between peers. 
