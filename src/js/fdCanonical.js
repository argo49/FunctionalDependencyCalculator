define([
  'app/fd',
  'app/setOperations',
  'app/fdClosure',
  'app/setOperations',
  'app/fdSet'
  ],
  function (fd, setOperations, closure, sets, FdSet) {

  return function canonical(fdSet) {

    console.log('original fdset');
    var fdClone = cloneFdSet(fdSet);
    fdClone.print();

    removeEmpty(fdClone);

    singletonRHS(fdClone);

    console.log('singletonRHS');
    fdClone.print();

    reduceLHS(fdClone);

    console.log('reduceLHS');
    fdClone.print();

    removeUnnecessary(fdClone);

    console.log('removeUnnecessary');
    fdClone.print();

    combineLHS(fdClone);

    console.log('combineLHS');
    fdClone.print();

    return fdClone;

  }

  function cloneFdSet (fdSet) {
    var fdSetClone = FdSet();
    var fds = fdSet.getFds();
    for (var i = 0; i < fds.length; i++) {
      fdSetClone.addFd(fds[i].getIndependent(), fds[i].getDependent());
    };

    return fdSetClone;
  }

  function removeEmpty (fdSet) {
    var fds = fdSet.getFds();
    for (var i = 0; i < fds.length; i++) {
      if (!fds[i].getDependent().length && !fds[i].getIndependent().length) {
        fdSet.removeFd(fds[i].getId());
        i--;
      }
    };
  }

  // Convert to singleton on RHS
  function singletonRHS (fdSet) {
    var fds      = fdSet.getFds();
    var numOfFds = fds.length;
    var beta;

    for (var i = 0; i < numOfFds; i++) {
      beta = fds[i].getDependent();

      if (beta.length > 1) {
        for (var j = 0; j < beta.length; j++) {
          fdSet.addFd(fds[i].getIndependent(), [beta[j]]);
          numOfFds++;
        }

        // Remove the fd with all the attrs
        fdSet.removeFd(fds[i].getId());
        numOfFds--;
        i--;
      }
    }

  }

  // Convert to singleton on LHS
  // This is done by taking all LHS with more than one attribute and
  // testing to see if any of the attributes are extraneous. This is done
  // by comparing the closure of the independent attributes with the
  // closure of the independent attributes minues the attribute we're
  // testing.
  // http://www.sztaki.hu/~fodroczi/dbs/canon_cover_gyak.pdf (Slide 3)
  // https://stackoverflow.com/questions/10845987/what-is-canonical-cover-closure-and-extraneous-attribute
  function reduceLHS (fdSet) {
    var fds = fdSet.getFds();
    var alpha, ogClosure, tester, ngClosure;

    for (var i = 0; i < fds.length; i++) {
      alpha = fds[i].getIndependent();

      if (alpha.length > 1) {

        // record the original closure
        ogClosure = closure(fdSet, alpha);

        for (var j = 0; j < alpha.length; j++) {

          tester = alpha[j];
          alpha.splice(j, 1);

          // New closure without the attr we're testing for
          ngClosure = closure(fdSet, alpha);

          if (!sets.areEqual(ogClosure, ngClosure)) {
            alpha.splice(j, 0, tester);
          } else {
            fds[i].removeIndependent(j);
            // Item has already been removed from alpha
            // so it matches whats in the fdSet
          }
        }
      }

    }
  }

  function removeUnnecessary (fdSet) {
    var fds = fdSet.getFds();
    var alpha, beta, ogClosure, tester, ngClosure;

    for (var i = 0; i < fds.length; i++) {
      alpha = fds[i].getIndependent();
      beta  = fds[i].getDependent();

      ogClosure = closure(fdSet, alpha);

      // At this point all rhs should be of length 1 so using 0 is ok
      var tester = fds[i].removeDependent(0);

      ngClosure = closure(fdSet, alpha);

      if (!sets.areEqual(ogClosure, ngClosure)) {
        fds[i].addDependent(tester);
      } else {
        fdSet.removeFd(fds[i].getId());

      }

    }

  }

  function combineLHS (fdSet) {
    var fds = fdSet.getFds();

    for (var i = 0; i < fds.length; i++) {
      for (var j = 0; j < fds.length; j++) {
        if (fds[i].getId() != fds[j].getId()) {
          if (sets.areEqual(fds[i].getIndependent(), fds[j].getIndependent())) {
            // same LHS on both fds
            fds[i].setDependent(fds[i].getDependent().concat(fds[j].getDependent()));
            fdSet.removeFd(fds[j].getId());
            j--;
          }
        }
      }
    }
  }


});