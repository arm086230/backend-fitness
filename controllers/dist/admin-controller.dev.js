"use strict";

var db = require("../models/db");

exports.getadminbooking = function _callee(req, res, next) {
  var getadminbooking;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.booking.findMany({
            include: {
              user: true
            }
          }));

        case 3:
          getadminbooking = _context.sent;
          res.json(getadminbooking);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getadminuser = function _callee2(req, res, next) {
  var getadminbooking;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.user.findMany({//   where : { userId : req.user.id}
          }));

        case 3:
          getadminbooking = _context2.sent;
          res.json(getadminbooking);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getuserById = function _callee3(req, res, next) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(db.user.findFirst({
            where: {
              id: +id
            },
            include: {
              Resume: true
            }
          }));

        case 4:
          user = _context3.sent;
          res.json(user);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          next(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.workout = function _callee4(req, res, next) {
  var _req$body, workoutType, WorkoutDate, img, advice, userId, workout;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, workoutType = _req$body.workoutType, WorkoutDate = _req$body.WorkoutDate, img = _req$body.img, advice = _req$body.advice;
          console.log(req.body);
          userId = req.user.id;
          _context4.next = 6;
          return regeneratorRuntime.awrap(db.workout.create({
            data: {
              workoutType: workoutType,
              WorkoutDate: WorkoutDate,
              img: img,
              advice: advice,
              userId: userId
            }
          }));

        case 6:
          workout = _context4.sent;
          res.json({
            message: "successful",
            workout: workout
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.deleteuser = function _callee5(req, res, next) {
  var id, rs;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(db.user["delete"]({
            where: {
              id: +id
            }
          }));

        case 4:
          rs = _context5.sent;
          res.json({
            message: "Deleted user",
            result: rs
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          next(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.updateuser = function _callee6(req, res, next) {
  var id, role, rs;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          role = req.body.role;
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(db.user.update({
            where: {
              id: +id
            },
            data: {
              role: role
            }
          }));

        case 5:
          rs = _context6.sent;
          res.json({
            message: "Updated ok",
            result: rs
          });
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](2);
          next(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

exports.updatestatustrainer = function _callee7(req, res, next) {
  var id, status, updatedResume;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          status = req.body.status;
          console.log(status);
          _context7.prev = 3;
          _context7.next = 6;
          return regeneratorRuntime.awrap(db.resume.update({
            where: {
              id: +id
            },
            // ใช้ id เป็น primary key ที่ต้องการใช้ในการค้นหา
            data: {
              status: status
            }
          }));

        case 6:
          updatedResume = _context7.sent;
          res.json({
            message: 'Updated status',
            result: updatedResume
          });
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](3);
          next(_context7.t0);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.getresume = function _callee8(req, res, next) {
  var resume;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(db.resume.findMany({// where: { userId: req.user.id },
          }));

        case 3:
          resume = _context8.sent;
          res.json(resume);
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};