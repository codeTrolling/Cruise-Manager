using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (user == null)
            {
                return BadRequest("what the user doing");
            }
            if(await _context.Users.FindAsync(user.Email) == null && await _context.Users.FirstOrDefaultAsync(x => x.Username == user.Username) == null)
            {
                user.IsAdmin = false;
                if (!user.Email.Contains("@"))
                {
                    return BadRequest("Invalid email");
                }
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok("Successfully entered the database");
            }
            return Ok("Email or username is taken");
        }

        [HttpPost]
        [Route("signin")]
        public async Task<ActionResult<User>> SignIn(User user)
        {
            if (user == null)
            {
                return BadRequest("User is null");
            }
            var dbUser = await _context.Users.FindAsync(user.Email);
            var dbUser2 = await _context.Users.FirstOrDefaultAsync(x => x.Username == user.Username);
            if(dbUser == null && dbUser2 == null)
            {
                return BadRequest("invalid credentials");
            }
            if (dbUser == null) { dbUser = dbUser2; }
            if((dbUser.Username == user.Username || dbUser.Email == user.Email) && dbUser.Password == user.Password)
            {
                return Ok(dbUser.Email);
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }

        [HttpPost]
        [Route("Authorization")]
        public async Task<ActionResult<User>> Authenticate(User user)
        {
            if (user == null) { return BadRequest("user = null"); }
            var dbUser = await _context.Users.FindAsync(user.Email);
            if(dbUser == null) { return NotFound("User not found."); }
            if(dbUser.IsAdmin == true)
            {
                return Ok("Access to editing granted.");
            }
            return BadRequest("User is not authenticated");
        }
    }
}
