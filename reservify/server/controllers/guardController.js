const Booking = require("../models/bookingModel")
// const User = require("../models/userModel")
// const Invite = require("../models/inviteModel")
const Log = require("../models/logModel")
// const bcrypt = require("bcryptjs")

const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv")
dotenv.config()
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

//* confirm guard
const confirmGuard = asyncHandler(async (req, res) => {
  res.status(200).json({ guard: true })
})

//* get today's bookings
const getBookings = asyncHandler(async (req, res) => {
  // console.log('Attendee get bookings')


  const now = new Date();

  const localTime = {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // getMonth() is zero-based
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes()

  };

  const bookings = await Booking.find({ year: localTime.year, month: localTime.month, day: localTime.day, status: 'confirmed' })
    .populate({
      path: "user",
      select: { name_first: 1, name_last: 1, address: 1 },
    }).sort({ date: 1 })
  res.status(200).json({ bookings: bookings })
})

//* confirm a booking
const confirmBooking = asyncHandler(async (req, res) => {
  console.log(req.body)
  const booking = await Booking.findById(req.body.id).populate('user')
  console.log(booking)
  const updateBooking = await booking.update({ status: 'completed' })
  const newLog = await Log.create({
    created_by: req.user._id,
    reference_user: booking.user._id,
    user_address: booking.user.address,
    user_email: booking.user.email,
    type: "check-in",
    text: `Attendee (${req.user.name_first} ${req.user.name_last
      }) checked-in ${booking.user.name_first} ${booking.user.name_last} (${booking.user.address}) for booking on ${booking.day}/${booking.month}/${booking.year} with time slots: ${booking.slots_full.map((slot) => {
        return slot.time
      })}`,
  })

  let info = {
    from: process.env.EMAIL,
    to: [booking.user.email],
    subject: `Venue booking check-in`,
    text: `
            Hi ${booking.user.name_first}, 
            
            ${req.user.name_first} have checked-in for your booking of time slots ${booking.slots_full.map((slot) => {
      return slot.time
    })} (${booking.slots.length / 2} hour/s) on ${booking.day}/${booking.month
      }/${booking.year}.
            
            Confirmation #: ${newLog._id.toString()}
    
            This is an auto-generated email.
            `,


  };
  const sendMail = async () => {
    try {
      await transporter.sendMail(info)
      console.log("Mail sent successfully");

    }
    catch (error) {
      console.log(error);
    }

  }


  sendMail(transporter, info);



  res.status(200).json({ guard: true })
})




module.exports = {
  confirmBooking, confirmGuard, getBookings
}