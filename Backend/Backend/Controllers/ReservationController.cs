using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly DataContext _context;
        public ReservationController(DataContext context)
        {
            _context = context;
        }

        /*[HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetReservations()
        {
            return Ok(await _context.Reservations.ToListAsync());
        }*/

        [HttpPost]
        [Route("GetPrice")]
        public async Task<ActionResult<Reservation>> GetCruisePrice(Reservation reservation)
        {
            var dbcruise = await _context.Cruises.FirstOrDefaultAsync(x => x.cruiseID == reservation.cruiseId);
            if (dbcruise == null) { return NotFound("cruise not found"); }
            if (reservation == null) { return BadRequest("request is null"); }
            if (reservation.ticketClass == "Normal class")
            {
                return Ok(dbcruise.normalClassPrice);
            }
            else if(reservation.ticketClass == "Business class")
            {
                return Ok(dbcruise.businessClassPrice);
            }
            return BadRequest("Something went wrong");
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> AddReservation(Reservation request)
        {
            if (request == null) { return NotFound(); }
            var dbcruise = await _context.Cruises.FirstOrDefaultAsync(x => x.cruiseID == request.cruiseId);
            if (dbcruise == null)
            {
                return NotFound("cruise not found");
            }
            if((request.ticketClass == "Normal class" && dbcruise.normalClassTickets <= 0) || (request.ticketClass == "Business class" && dbcruise.businessClassTickets <= 0) || (request.ticketClass != "Normal class" && request.ticketClass != "Business class"))
            {
                return BadRequest("No more tickets of this class are available");
            }
            if(request.ticketClass == "Business Class")
            {
                dbcruise.businessClassTickets -= 1;
            }
            else
            {
                dbcruise.normalClassTickets -= 1;
            }
            _context.Reservations.Add(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("GetReservations")]
        public async Task<ActionResult<List<Cruise>>> GetUsersReservations(User user)
        {
            if (user == null) { return BadRequest("user is null"); }
            List<Cruise> cruises = new List<Cruise>();
            var reservations = await _context.Reservations.ToListAsync();
            foreach(var res in reservations)
            {
                if(res.email == user.Email)
                {
                    cruises.Add(await _context.Cruises.FirstOrDefaultAsync(x => x.cruiseID == res.cruiseId));
                }
            }
            return Ok(cruises);
        }

        [HttpPost]
        [Route("CancelReservation")]
        public async Task<ActionResult<Reservation>> CancelReservation(User user, [FromQuery] int id)
        {
            var reservations = await _context.Reservations.ToListAsync();
            foreach (var res in reservations)
            {
                if (res.email == user.Email && res.cruiseId == id)
                {
                    var dbcruise = await _context.Cruises.FindAsync(res.cruiseId);
                    _context.Reservations.Remove(res);
                    if(res.ticketClass == "Normal class")
                    {
                        dbcruise.normalClassTickets += 1;
                    }
                    else
                    {
                        dbcruise.businessClassTickets += 1;
                    }
                }
            }
            await _context.SaveChangesAsync();
            return Ok("Success");
        }
    }
}
