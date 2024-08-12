"use strict";

var db = require("../models/db");

var _require = require("@prisma/client"),
    Status = _require.Status;

exports.getrainer = function _callee(req, res, next) {
  var getusertrainer;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.user.findMany({
            where: {
              role: "TRAINER",
              Resume: {
                some: {
                  status: "Approve"
                }
              }
            }
          }));

        case 3:
          getusertrainer = _context.sent;
          res.json(getusertrainer);
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

exports.admingettrainer = function _callee2(req, res, next) {
  var getusertrainer;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.user.findMany({
            where: {
              role: "TRAINER"
            },
            include: {
              Resume: true
            }
          }));

        case 3:
          getusertrainer = _context2.sent;
          res.json(getusertrainer);
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

exports.getUsersByTrainer = function _callee3(req, res, next) {
  var id, getusertrainer, bookings;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(db.user.findUnique({
            where: {
              id: +id,
              role: "TRAINER"
            }
          }));

        case 4:
          getusertrainer = _context3.sent;

          if (getusertrainer) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(500).json({
            message: "Trainer not found"
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(db.booking.findMany({
            where: {
              name: getusertrainer.name
            },
            include: {
              user: true
            }
          }));

        case 9:
          bookings = _context3.sent;
          res.json(bookings);
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};