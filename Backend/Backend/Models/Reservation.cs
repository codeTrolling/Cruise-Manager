namespace Backend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string firstName { get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string PIN { get; set; } = string.Empty;
        public string nationality { get; set; } = string.Empty;
        public string phone { get; set; } = string.Empty;
        public string ticketClass { get; set; } = string.Empty;
        public int cruiseId { get; set; }

    }
}
