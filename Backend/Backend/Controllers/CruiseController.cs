using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CruiseController : ControllerBase
    {

        private readonly DataContext _context;
        public CruiseController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Cruise>>> Get()
        {
            return Ok(await _context.Cruises.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Cruise>>> CreateCruise(Cruise cruise)
        {
            _context.Cruises.Add(cruise);
            await _context.SaveChangesAsync();
            return Ok(await _context.Cruises.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<Cruise>> UpdateCruise(Cruise request)
        {
            //_context.ChangeTracker.Clear();
            var cruise = await _context.Cruises.FindAsync(request.cruiseID);
            if(cruise == null)
            {
                return BadRequest("Cruise was not found");
            }
            cruise.cruiseName = request.cruiseName;
            cruise.cruisePrice = request.cruisePrice;
            cruise.setOffLocation = request.setOffLocation;
            cruise.arriveLocation = request.arriveLocation;
            cruise.setOffTime = request.setOffTime;
            cruise.arriveTime = request.arriveTime;
            cruise.captainName = request.captainName;
            cruise.normalClassTickets = request.normalClassTickets;
            cruise.normalClassPrice = request.normalClassPrice;
            cruise.businessClassTickets = request.businessClassTickets;
            cruise.businessClassPrice = request.businessClassPrice;
            await _context.SaveChangesAsync();

            return Ok(cruise);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<ActionResult<Cruise>> DeleteCruise(int cruiseID)
        {
            //_context.ChangeTracker.Clear();
            var dbcruise = await _context.Cruises.FindAsync(cruiseID);
            if(dbcruise == null)
            {
                return BadRequest("There is no cruise with this ID");
            }
            _context.Cruises.Remove(dbcruise);
            await _context.SaveChangesAsync();
            return Ok("deleted");
        }
    }
}
