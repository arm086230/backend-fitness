"use strict";

var db = require("../models/db");

exports.deletebooking = function _callee(req, res, next) {
  var delebooks, delebook;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          delebooks = req.params.delebooks;
          console.log(delebooks);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(db.booking["delete"]({
            where: {
              id: Number(delebooks)
            }
          }));

        case 5:
          delebook = _context.sent;
          res.json(delebook);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

exports.createbooking = function _callee2(req, res, next) {
  var input, bookingDateTime, bookingDate, expiryDate, booking;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          input = req.body; // Validate input fields

          if (!(!input.userId || !input.name || !input.bookingDateTime || !input.bookingDate || !input.expiryDate)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: "Missing required fields"
          }));

        case 4:
          // Check and parse dates
          bookingDateTime = new Date(input.bookingDateTime);
          bookingDate = new Date(input.bookingDate);
          expiryDate = new Date(input.expiryDate); // Validate date objects

          if (!(isNaN(bookingDateTime.getTime()) || isNaN(bookingDate.getTime()) || isNaN(expiryDate.getTime()))) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: "Invalid date format provided"
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(db.booking.create({
            data: {
              userId: input.userId,
              name: input.name,
              sex: input.sex,
              age: input.age,
              phone: input.phone,
              bookingDateTime: bookingDateTime,
              bookingDate: bookingDate,
              expiryDate: expiryDate,
              status: "Pending"
            }
          }));

        case 11:
          booking = _context2.sent;
          // Respond with success message and booking details
          res.json({
            message: "Booking created successfully",
            booking: booking
          });
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          // Handle errors
          next(_context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.getbooking = function _callee3(req, res, next) {
  var getbooking;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.booking.findMany({
            where: {
              userId: req.user.id
            }
          }));

        case 3:
          getbooking = _context3.sent;
          res.json({
            message: "get bookings",
            getbooking: getbooking
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updatebooking = function _callee4(req, res, next) {
  var id, status, rs;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          status = req.body.status;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(db.booking.update({
            where: {
              id: +id
            },
            data: {
              status: status
            }
          }));

        case 5:
          rs = _context4.sent;
          res.json({
            msg: "Update ok",
            result: rs
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          next(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 9]]);
};